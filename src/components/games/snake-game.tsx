'use client';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GRID_SIZE = 20;
const TILE_SIZE = 100 / GRID_SIZE; // Percentage
const GAME_SPEED = 150; // ms

interface SnakeGameProps {
  setScore: (score: number | ((prevScore: number) => number)) => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame({ setScore }: SnakeGameProps) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const generateFood = useCallback(() => {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    setFood(newFoodPosition);
  }, [snake]);

  const changeDirection = (newDirection: Direction) => {
    const validMoves: Record<Direction, Direction> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
    if (direction !== validMoves[newDirection]) {
      setDirection(newDirection);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        switch (e.key) {
          case 'ArrowUp': changeDirection('UP'); break;
          case 'ArrowDown': changeDirection('DOWN'); break;
          case 'ArrowLeft': changeDirection('LEFT'); break;
          case 'ArrowRight': changeDirection('RIGHT'); break;
          case ' ': setIsRunning(p => !p); break;
        }
      };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const gameInterval = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setIsGameOver(true);
          return newSnake;
        }
        
        for (let i = 1; i < newSnake.length; i++) {
          if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
            setIsGameOver(true);
            return newSnake;
          }
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          generateFood();
        } else {
          newSnake.pop();
        }
        
        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameInterval);
  }, [snake, direction, isGameOver, isRunning, generateFood, setScore]);

  useEffect(() => {
    generateFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGameOver) {
    return (
      <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-destructive-foreground bg-destructive/80">
        Game Over!
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background relative focus:outline-none" tabIndex={0}>
        <div className="w-full h-full absolute top-0 left-0">
            {snake.map((segment, index) => (
            <div
                key={index}
                className="absolute bg-primary rounded-sm"
                style={{
                left: `${segment.x * TILE_SIZE}%`,
                top: `${segment.y * TILE_SIZE}%`,
                width: `${TILE_SIZE}%`,
                height: `${TILE_SIZE}%`,
                }}
            />
            ))}
            <div
            className="absolute bg-accent rounded-full"
            style={{
                left: `${food.x * TILE_SIZE}%`,
                top: `${food.y * TILE_SIZE}%`,
                width: `${TILE_SIZE}%`,
                height: `${TILE_SIZE}%`,
            }}
            />
        </div>
        <div className="absolute bottom-4 right-4 lg:hidden flex flex-col items-center">
            <Button variant="outline" size="icon" className="touch-manipulation" onClick={() => changeDirection('UP')}><ArrowUp /></Button>
            <div className="flex gap-1 mt-1">
                <Button variant="outline" size="icon" className="touch-manipulation" onClick={() => changeDirection('LEFT')}><ArrowLeft /></Button>
                <Button variant="outline" size="icon" className="touch-manipulation" onClick={() => changeDirection('DOWN')}><ArrowDown /></Button>
                <Button variant="outline" size="icon" className="touch-manipulation" onClick={() => changeDirection('RIGHT')}><ArrowRight /></Button>
            </div>
        </div>
        {!isRunning && !isGameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold font-headline">
            PAUSED
          </div>
        )}
    </div>
  );
}
