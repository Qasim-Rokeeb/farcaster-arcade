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
import type { Game } from '@/lib/games';
import { erc20Abi } from '@/lib/abi/erc20';
import { Loader2 } from 'lucide-react';

// ✅ Base USDC token contract address (Mainnet)
const USDC_CONTRACT_ADDRESS = '0xd9AaA9a3F88d4C6f0aC2c53F476Ee90A6eD77C04';

// ✅ Payment recipient address from environment variable
const PAYMENT_RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS;

const PRICE_IN_USDC = '0.1';

interface PayToPlayDialogProps {
  game: Game;
  onUnlock: () => void;
  children: ReactNode;
}

export default function PayToPlayDialog({ game, onUnlock, children }: PayToPlayDialogProps) {
  const [open, setOpen] = useState(false);
  const { address, chain } = useAccount();
  const { toast } = useToast();
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
    enabled: Boolean(hash),
    onSuccess: () => {
      toast({
        title: 'Payment Successful!',
        description: `You have unlocked ${game.name}. Enjoy!`,
      });
      localStorage.setItem(`unlocked_${game.id}`, 'true');
      onUnlock();
      setOpen(false);
    },
  });

  const handlePayment = async () => {
    if (!address) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to proceed.',
      });
      return;
    }

    if (!chain || chain.id !== 8453) {
      toast({
        variant: 'destructive',
        title: 'Wrong Network',
        description: 'Please switch to the Base Mainnet to make a payment.',
      });
      return;
    }

    if (!PAYMENT_RECIPIENT_ADDRESS || !PAYMENT_RECIPIENT_ADDRESS.startsWith('0x')) {
      console.error('Configuration Error: NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS is not set.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'The payment recipient is not configured correctly.',
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
          parseUnits(PRICE_IN_USDC, 6),
        ],
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'Something went wrong while initiating the transaction.',
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Transaction Failed',
        description: 'Transaction was rejected or failed.',
      });
    }
  }, [error, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unlock {game.name}</DialogTitle>
          <DialogDescription>
            This is a premium game. To play, please make a one-time payment of {PRICE_IN_USDC} USDC.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You are about to send {PRICE_IN_USDC} USDC to the game developer. This transaction will be processed on the Base Mainnet.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handlePayment} disabled={isPending || isConfirming}>
            {(isPending || isConfirming) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isConfirming ? 'Confirming...' : isPending ? 'Check Wallet' : `Pay ${PRICE_IN_USDC} USDC`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
