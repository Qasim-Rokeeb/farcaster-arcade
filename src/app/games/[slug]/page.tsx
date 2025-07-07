'use client'; // Needs to be a client component to use hooks

import { getGameBySlug } from '@/lib/games';
import { notFound, redirect } from 'next/navigation';
import GameArena from './game-arena';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = getGameBySlug(params.slug);
  const [isClient, setIsClient] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && game) {
      const isUnlocked = localStorage.getItem(`unlocked_${game.id}`) === 'true';
      if (!game.isPremium || isUnlocked) {
        setIsAllowed(true);
      } else {
        redirect('/');
      }
    }
  }, [isClient, game]);

  if (!game) {
    notFound();
  }

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
  
  return <GameArena game={game} />;
}
