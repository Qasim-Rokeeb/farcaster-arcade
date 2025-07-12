
'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const COLORS = ['green', 'red', 'yellow', 'blue'];
const COLOR_CLASSES = {
  green: { base: 'bg-green-500', active: 'bg-green-300' },
  red: { base: 'bg-red-500', active: 'bg-red-300' },
  yellow: { base: 'bg-yellow-400', active: 'bg-yellow-200' },
  blue: { base: 'bg-blue-500', active: 'bg-blue-300' },
};

interface SimonSaysGameProps {
  setScore: (updater: (prevScore: number) => number) => void;
}

export default function SimonSaysGame({ setScore }: SimonSaysGameProps) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'start' | 'computer' | 'player' | 'gameover'>('start');

  const playSound = (color: string) => {
    // In a real app, you would play a sound here
    // For this demo, we'll just use a visual cue.
  };

  const flashColor = (color: string, duration: number = 400) => {
    setActiveColor(color);
    playSound(color);
    setTimeout(() => setActiveColor(null), duration);
  };
  
  const playSequence = useCallback(() => {
    setGameState('computer');
    let i = 0;
    const interval = setInterval(() => {
      flashColor(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setGameState('player');
        setPlayerSequence([]);
      }
    }, 600);
  }, [sequence]);
  
  const nextRound = useCallback(() => {
    const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newSequence = [...sequence, nextColor];
    setSequence(newSequence);
    setScore(() => newSequence.length -1);
  }, [sequence, setScore]);

  useEffect(() => {
    if (gameState === 'computer' && sequence.length > 0) {
      setTimeout(() => playSequence(), 500);
    }
  }, [gameState, sequence, playSequence]);

  useEffect(() => {
    if (gameState !== 'player' || playerSequence.length === 0) return;
    
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
      setGameState('gameover');
      return;
    }

    if (playerSequence.length === sequence.length) {
      setTimeout(() => nextRound(), 1000);
    }
  }, [playerSequence, sequence, gameState, nextRound]);
  
  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(() => 0);
    setGameState('computer');
    nextRound();
  }

  const handleColorClick = (color: string) => {
    if (gameState !== 'player') return;
    flashColor(color, 200);
    setPlayerSequence(prev => [...prev, color]);
  };
  
  if (gameState === 'start' || gameState === 'gameover') {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">{gameState === 'gameover' ? 'Game Over' : 'Simon Says'}</h2>
            {gameState === 'gameover' && <p className="mb-4">You made it to level {sequence.length}!</p>}
            <Button onClick={startGame}>
              {gameState === 'gameover' ? 'Play Again' : 'Start Game'}
            </Button>
        </div>
    );
  }

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-4 w-64 h-64 md:w-80 md:h-80 relative">
        {COLORS.map((color, i) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            disabled={gameState !== 'player'}
            className={cn(
              "w-full h-full transition-colors duration-150",
              COLOR_CLASSES[color as keyof typeof COLOR_CLASSES].base,
              activeColor === color && COLOR_CLASSES[color as keyof typeof COLOR_CLASSES].active,
              i === 0 && 'rounded-tl-full',
              i === 1 && 'rounded-tr-full',
              i === 2 && 'rounded-bl-full',
              i === 3 && 'rounded-br-full',
              gameState !== 'player' && 'cursor-not-allowed'
            )}
          />
        ))}
         <div className="absolute inset-1/4 w-1/2 h-1/2 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-3xl select-none">
            {sequence.length}
        </div>
      </div>
       <p className="text-white mt-4 text-sm">
        {gameState === 'computer' ? 'Watch carefully...' : 'Your turn!'}
      </p>
    </div>
  );
}
