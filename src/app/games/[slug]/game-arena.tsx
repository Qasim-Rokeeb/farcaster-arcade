
'use client';

import { useState, useMemo } from 'react';
import type { Game } from '@/lib/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Dynamically import game components
import SnakeGame from '@/components/games/snake-game';
import MemoryMatchGame from '@/components/games/memory-match-game';
import WhackAMoleGame from '@/components/games/whack-a-mole-game';
import TetrisGame from '@/components/games/tetris-game';
import PlaceholderGame from '@/components/games/placeholder-game';


interface GameArenaProps {
  game: Game;
}

export default function GameArena({ game }: GameArenaProps) {
  const [score, setScore] = useState(0);
  const [gameKey, setGameKey] = useState(Date.now()); // Used to force re-render on replay

  const handleReplay = () => {
    setScore(0);
    setGameKey(Date.now()); // Change key to remount the game component
  };

  const GameComponent = useMemo(() => {
    switch (game.id) {
      case 'snake':
        return SnakeGame;
      case 'memory-match':
        return MemoryMatchGame;
      case 'whack-a-mole':
        return WhackAMoleGame;
      case 'tetris':
        return TetrisGame;
      case 'clicker-hero':
      case '2048':
      case 'word-find':
      case 'sokoban':
      case 'pac-man':
      case 'flappy-bird':
      case 'asteroids':
      case 'pong':
      case 'lights-out':
        return () => <PlaceholderGame gameName={game.name} />;
      default:
        return () => <PlaceholderGame gameName="Unknown Game" />;
    }
  }, [game.id, game.name]);


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
          <div className="aspect-video bg-muted/20 border rounded-lg flex items-center justify-center text-muted-foreground relative overflow-hidden">
            <GameComponent key={gameKey} setScore={setScore} />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-muted-foreground">SCORE</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl font-bold text-primary">{score}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            <Button size="lg" variant="outline" onClick={handleReplay}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Replay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
