'use client';

import { useState, useEffect } from 'react';
import type { Game } from '@/lib/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import ShareScoreDialog from '@/components/share-score-dialog';

interface GameArenaProps {
  game: Game;
}

export default function GameArena({ game }: GameArenaProps) {
  const [score, setScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate score increase
    const interval = setInterval(() => {
      setScore((s) => s + Math.floor(Math.random() * 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleReplay = () => {
    setScore(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Arcade
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4 font-headline">{game.name}</h1>
          <div className="aspect-video bg-muted/50 border rounded-lg flex items-center justify-center text-muted-foreground">
            <p>Game Area Placeholder</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-muted-foreground">SCORE</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl font-bold text-primary">{isClient ? score : 0}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button size="lg" variant="outline" onClick={handleReplay}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Replay
            </Button>
            {isClient && <ShareScoreDialog gameName={game.name} score={score} />}
          </div>
        </div>
      </div>
    </div>
  );
}
