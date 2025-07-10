
'use client';

import { useEffect, useState } from 'react';
import { redirect, notFound, usePathname } from 'next/navigation';
import { getGameBySlug, type Game } from '@/lib/games';
import GameArena from './game-arena';
import { Skeleton } from '@/components/ui/skeleton';

// This component is now fully client-side to avoid the params error.
export default function GamePage() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';

  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const gameData = getGameBySlug(slug);
      
      if (!gameData) {
        notFound();
        return;
      }
      
      setGame(gameData);

      const isPremiumUser = localStorage.getItem('isPremiumUser') === 'true';
      if (!gameData.isPremium || isPremiumUser) {
        // User is allowed to play
      } else {
        // If the game is locked, redirect them.
        redirect('/');
      }
      setIsLoading(false);
    }
  }, [slug]);

  // Render a skeleton while we confirm access on the client
  if (isLoading || !game) {
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
