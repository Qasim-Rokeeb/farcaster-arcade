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
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import PremiumSubscribeButton from './premium-subscribe-button';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const checkPremium = () => setIsPremiumUser(localStorage.getItem('isPremiumUser') === 'true');
      checkPremium();
      
      // Listen for storage changes from other tabs/windows
      window.addEventListener('storage', checkPremium);
      
      // Custom event to listen for subscription success in the same tab
      window.addEventListener('subscriptionSuccess', checkPremium);

      return () => {
        window.removeEventListener('storage', checkPremium);
        window.removeEventListener('subscriptionSuccess', checkPremium);
      }
    }
  }, []);
  
  const isEffectivelyLocked = game.isPremium && !isPremiumUser;

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
                <div className="text-center text-white p-4">
                    <Lock className="h-12 w-12 mx-auto" />
                    <p className="font-bold mt-2">Premium Game</p>
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter>
        {isClient && isEffectivelyLocked ? (
          <PremiumSubscribeButton>
            <Button className="w-full" variant="secondary">
              <Sparkles className="mr-2 h-4 w-4" />
              Unlock All Premium
            </Button>
          </PremiumSubscribeButton>
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
