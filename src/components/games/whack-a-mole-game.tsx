'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Hammer } from 'lucide-react';

const GRID_SIZE = 9;
const GAME_DURATION = 30000; // 30 seconds
const MOLE_UP_TIME_MIN = 400;
const MOLE_UP_TIME_MAX = 1000;

interface WhackAMoleGameProps {
  setScore: (score: (prevScore: number) => number) => void;
}

export default function WhackAMoleGame({ setScore }: WhackAMoleGameProps) {
  const [moles, setMoles] = useState(Array(GRID_SIZE).fill(false));
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [gameOver, setGameOver] = useState(false);

  const popUpMole = useCallback(() => {
    if (gameOver) return;
    const randomIndex = Math.floor(Math.random() * GRID_SIZE);
    setMoles(currentMoles => {
      const newMoles = [...currentMoles];
      newMoles[randomIndex] = true;
      return newMoles;
    });

    setTimeout(() => {
      setMoles(currentMoles => {
        const newMoles = [...currentMoles];
        newMoles[randomIndex] = false;
        return newMoles;
      });
    }, MOLE_UP_TIME_MIN + Math.random() * (MOLE_UP_TIME_MAX - MOLE_UP_TIME_MIN));
  }, [gameOver]);

  useEffect(() => {
    setScore(() => 0);
    const gameInterval = setInterval(popUpMole, 500);
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
  }, [popUpMole]);

  const handleWhack = (index: number) => {
    if (gameOver || !moles[index]) return;

    setScore(s => s + 10);
    setMoles(currentMoles => {
      const newMoles = [...currentMoles];
      newMoles[index] = false;
      return newMoles;
    });
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-green-200/20">
      <div className="absolute top-2 right-2 text-lg font-bold text-primary">
        Time Left: {timeLeft}s
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-3xl font-bold font-headline z-20">
          GAME OVER
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 w-full max-w-md aspect-square">
        {moles.map((isMoleUp, index) => (
          <div
            key={index}
            className="relative w-full h-full flex items-center justify-center rounded-full bg-yellow-800/80 border-4 border-yellow-900 overflow-hidden"
            onClick={() => handleWhack(index)}
          >
            <div
              className={cn(
                'absolute bottom-0 w-3/4 h-3/4 bg-gray-600 rounded-t-full transition-transform duration-150 ease-out',
                isMoleUp ? 'translate-y-0' : 'translate-y-full'
              )}
            >
              {/* Mole Face */}
              <div className="absolute top-1/4 w-full flex justify-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4 h-2 bg-pink-300 rounded-full border-2 border-gray-700"></div>
            </div>
            <div className="absolute inset-0 cursor-pointer">
              {isMoleUp && <Hammer className="w-1/2 h-1/2 text-white/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
