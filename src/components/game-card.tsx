'use client';

import type { Game } from '@/lib/games';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { Badge } from './ui/badge';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import PayToPlayDialog from './pay-to-play-dialog';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { isConnected } = useAccount();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setIsUnlocked(localStorage.getItem(`unlocked_${game.id}`) === 'true');
    }
  }, [game.id]);
  
  const isEffectivelyLocked = game.isPremium && !isUnlocked;

  return (
    <Card className={`flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isEffectivelyLocked && isClient ? 'opacity-70' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-2xl">{game.name}</CardTitle>
            <CardDescription>{game.description}</CardDescription>
          </div>
          {game.isPremium && <Badge variant="destructive">Premium</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow relative">
        <div className="aspect-video overflow-hidden rounded-lg group">
          <Image
            src={game.imageUrl}
            alt={game.name}
            width={600}
            height={400}
            data-ai-hint={game.dataAiHint}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {isClient && isEffectivelyLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <Lock className="h-12 w-12 text-white" />
            </div>
        )}
      </CardContent>
      <CardFooter>
        {isClient && isEffectivelyLocked ? (
          <PayToPlayDialog game={game} onUnlock={() => setIsUnlocked(true)}>
            <Button className="w-full" variant="secondary">
              <Lock className="mr-2 h-4 w-4" />
              {isConnected ? 'Unlock for 0.1 USDC' : 'Connect Wallet to Unlock'}
            </Button>
          </PayToPlayDialog>
        ) : (
          <Button asChild className="w-full">
            <Link href={`/games/${game.id}`}>
              Play Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
