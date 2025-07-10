'use client';

import React, { useState, type ReactNode, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { useToast } from '@/hooks/use-toast';
import { erc20Abi } from '@/lib/abi/erc20';
import { Loader2, Sparkles } from 'lucide-react';

// Base USDC token contract address (Mainnet)
const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bda02913';

// Payment recipient address from environment variable
const PAYMENT_RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS;

const PRICE_IN_USDC = '5'; // New subscription price

interface PremiumSubscribeButtonProps {
  children?: ReactNode;
}

export default function PremiumSubscribeButton({ children }: PremiumSubscribeButtonProps) {
  const [open, setOpen] = useState(false);
  const { address, chain } = useAccount();
  const { toast } = useToast();
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    enabled: Boolean(hash),
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Subscription Successful!',
        description: `You now have access to all premium games. Enjoy!`,
      });
      localStorage.setItem('isPremiumUser', 'true');
      // Dispatch a custom event to notify other components on the same page
      window.dispatchEvent(new Event('subscriptionSuccess'));
      setOpen(false);
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Transaction Failed',
        description: error.message.includes('User rejected')
          ? 'You rejected the request in your wallet.'
          : 'The transaction failed. Please try again.',
      });
    }
  }, [error, toast]);

  const handlePayment = async () => {
    if (!PAYMENT_RECIPIENT_ADDRESS || !PAYMENT_RECIPIENT_ADDRESS.startsWith('0x')) {
      console.error('Configuration Error: NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS is not set correctly.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'The payment recipient is not configured. Please contact support.',
      });
      return;
    }

    if (!address) {
      toast({
        variant: 'destructive',
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to proceed.',
      });
      return;
    }

    if (!chain || chain.id !== 8453) { // Ensure user is on Base Mainnet
      toast({
        variant: 'destructive',
        title: 'Wrong Network',
        description: 'Please switch to the Base Mainnet to subscribe.',
      });
      return;
    }

    try {
      writeContract({
        address: USDC_CONTRACT_ADDRESS,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [
          PAYMENT_RECIPIENT_ADDRESS as `0x${string}`,
          parseUnits(PRICE_IN_USDC, 6), // USDC has 6 decimal places
        ],
      });
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'Something went wrong while initiating the transaction.',
      });
    }
  };

  const triggerButton = children ?? (
    <Button>
        <Sparkles className="mr-2 h-4 w-4" />
        Upgrade to Premium
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unlock All Premium Games</DialogTitle>
          <DialogDescription>
            For a one-time payment of ${PRICE_IN_USDC} USDC, you'll get lifetime access to all current and future premium games in the Warpcast Arcade.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You are about to send ${PRICE_IN_USDC} USDC to the game developer. This transaction will be processed on the Base Mainnet.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending || isConfirming}>Cancel</Button>
          <Button onClick={handlePayment} disabled={isPending || isConfirming}>
            {(isPending || isConfirming) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isConfirming ? 'Confirming...' : isPending ? 'Check Wallet' : `Pay $${PRICE_IN_USDC} USDC`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
