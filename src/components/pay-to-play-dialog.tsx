'use client';

import React, { useState, type ReactNode } from 'react';
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

// IMPORTANT: This is the Ethereum Mainnet USDC contract address.
const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
// IMPORTANT: Replace this with the wallet address that should receive the payments.
const PAYMENT_RECIPIENT_ADDRESS = '0x0000000000000000000000000000000000000000';
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

  const { isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash,
      onSuccess: () => {
        toast({
          title: 'Payment Successful!',
          description: `You have unlocked ${game.name}. Enjoy!`,
        });
        localStorage.setItem(`unlocked_${game.id}`, 'true');
        onUnlock();
        setOpen(false);
      }
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

    if (chain?.id !== 1) { // Ethereum Mainnet chain ID
        toast({
            variant: 'destructive',
            title: 'Wrong Network',
            description: 'Please switch to the Ethereum Mainnet to make a payment.',
        });
        return;
    }

    if (!PAYMENT_RECIPIENT_ADDRESS || PAYMENT_RECIPIENT_ADDRESS === '0x0000000000000000000000000000000000000000') {
        console.error("Developer error: Please set PAYMENT_RECIPIENT_ADDRESS in pay-to-play-dialog.tsx");
        toast({
            variant: 'destructive',
            title: 'Configuration Error',
            description: 'The payment recipient has not been configured.',
        });
        return;
    }

    writeContract({
      address: USDC_CONTRACT_ADDRESS,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [PAYMENT_RECIPIENT_ADDRESS, parseUnits(PRICE_IN_USDC, 6)], // USDC has 6 decimals
    });
  };

  React.useEffect(() => {
    if (error) {
        toast({
            variant: 'destructive',
            title: 'Transaction Failed',
            description: "Transaction was rejected or failed.",
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
                You are about to send {PRICE_IN_USDC} USDC to the game developer. This transaction will be processed on the Ethereum Mainnet.
            </p>
        </div>
        <DialogFooter>
          <Button onClick={handlePayment} disabled={isPending || isConfirming}>
            {(isPending || isConfirming) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isConfirming ? 'Confirming...' : isPending ? 'Check Wallet' : `Pay ${PRICE_IN_USDC} USDC`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
