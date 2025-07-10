
'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { MousePointerClick } from 'lucide-react';

const GAME_DURATION = 15000; // 15 seconds
const MAX_TARGETS = 5;

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ClickerHeroGameProps {
  setScore: (score: (prevScore: number) => number) => void;
}

export default function ClickerHeroGame({ setScore }: ClickerHeroGameProps) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const addTarget = useCallback(() => {
    setTargets(prev => {
      if (prev.length >= MAX_TARGETS) return prev;
      const newTarget: Target = {
        id: Date.now(),
        x: Math.random() * 85 + 5, // 5% to 90%
        y: Math.random() * 85 + 5, // 5% to 90%
        size: Math.random() * 5 + 5, // 5% to 10% of container width
      };
      return [...prev, newTarget];
    });
  }, []);

  const startGame = () => {
    setScore(() => 0);
    setTargets([]);
    setTimeLeft(GAME_DURATION / 1000);
    setGameOver(false);
    setGameStarted(true);
    
    // Initial target
    setTimeout(addTarget, 200);
  };
  
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameInterval = setInterval(addTarget, 800);
    const timerInterval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(gameInterval);
          clearInterval(timerInterval);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, gameOver]);

  const handleTargetClick = (id: number) => {
    if (gameOver) return;
    setScore(s => s + 10);
    setTargets(prev => prev.filter(target => target.id !== id));
    setTimeout(addTarget, Math.random() * 300); // Add a new target quickly
  };

  if (!gameStarted) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Clicker Hero</h2>
            <p className="mb-6">Click the targets as fast as you can!</p>
            <button onClick={startGame} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold">Start Game</button>
        </div>
    );
  }

  return (
    <div className="w-full h-full p-4 relative bg-muted/20 cursor-crosshair">
      <div className="absolute top-2 right-2 text-lg font-bold text-primary z-10">
        Time: {timeLeft}s
      </div>
      
      {targets.map(target => (
        <div
          key={target.id}
          className="absolute rounded-full bg-accent hover:bg-red-500 transition-all duration-100 flex items-center justify-center"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            width: `${target.size}%`,
            paddingBottom: `${target.size}%`, // Maintain aspect ratio
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => handleTargetClick(target.id)}
        />
      ))}

      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-3xl font-bold font-headline z-20">
          GAME OVER
        </div>
      )}
    </div>
  );
}
