
'use client';

import { useEffect, useState } from 'react';
import { redirect, notFound } from 'next/navigation';
import { getGameBySlug, type Game } from '@/lib/games';
import GameArena from './game-arena';
import { Skeleton } from '@/components/ui/skeleton';

interface GamePageClientProps {
  slug: string;
}

export default function GamePageClient({ slug }: GamePageClientProps) {
  const [game, setGame] = useState<Game | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const gameData = getGameBySlug(slug);

    if (!gameData) {
      notFound();
      return;
    }
    
    setGame(gameData);

    const isPremiumUser = localStorage.getItem('isPremiumUser') === 'true';
    if (!gameData.isPremium || isPremiumUser) {
      setIsAllowed(true);
    } else {
      // If the user is on the client, and the game is locked, redirect them.
      redirect('/');
    }
    setIsLoading(false);
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
  if (isAllowed) {
    return <GameArena game={game} />;
  }
  
  // This should not be reached due to the redirect, but it's a safe fallback.
  return null;
}
