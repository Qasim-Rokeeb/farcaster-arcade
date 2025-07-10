'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import type { Game } from '@/lib/games';
import GameArena from './game-arena';
import { Skeleton } from '@/components/ui/skeleton';

interface GamePageClientProps {
  game: Game;
}

export default function GamePageClient({ game }: GamePageClientProps) {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isPremiumUser = localStorage.getItem('isPremiumUser') === 'true';
    if (!game.isPremium || isPremiumUser) {
      setIsAllowed(true);
    } else {
      // If the user is on the client, and the game is locked, redirect them.
      redirect('/');
    }
  }, [game]);

  // Render a skeleton while we confirm access on the client
  if (!isClient || !isAllowed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-1/2 mb-4" />
            <Skeleton className="aspect-video w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <div className="grid grid-cols-1 gap-4">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Once access is confirmed, render the game arena
  return <GameArena game={game} />;
}
