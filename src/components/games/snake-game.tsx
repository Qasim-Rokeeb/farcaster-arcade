
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useElementSize } from '@/hooks/use-element-size';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GRID_SIZE = 20;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeGameProps {
  setScore: (updater: (prevScore: number) => number) => void;
}

export default function SnakeGame({ setScore }: SnakeGameProps) {
  const [gameAreaRef, { width: gameAreaWidth }] = useElementSize();
  const TILE_SIZE = gameAreaWidth / GRID_SIZE;

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

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

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(() => 0);
    generateFood();
    setGameStarted(true);
  };
  
  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;
    
    setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
        }
        
        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setGameOver(true);
            return prevSnake;
        }

        // Self collision
        for (let i = 1; i < newSnake.length; i++) {
            if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                setGameOver(true);
                return prevSnake;
            }
        }
        
        newSnake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
            setScore(s => s + 10);
            generateFood();
        } else {
            newSnake.pop();
        }
        
        return newSnake;
    });
  }, [direction, food.x, food.y, gameOver, gameStarted, generateFood, setScore]);


  useEffect(() => {
    if (!gameStarted) return;
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameStarted]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setDirection(prevDirection => {
      switch (e.key) {
        case 'ArrowUp':
          if (prevDirection !== 'DOWN') return 'UP';
          break;
        case 'ArrowDown':
          if (prevDirection !== 'UP') return 'DOWN';
          break;
        case 'ArrowLeft':
          if (prevDirection !== 'RIGHT') return 'LEFT';
          break;
        case 'ArrowRight':
          if (prevDirection !== 'LEFT') return 'RIGHT';
          break;
      }
      return prevDirection;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  const changeDirection = (newDirection: Direction) => {
    setDirection(prevDirection => {
        if (newDirection === 'UP' && prevDirection !== 'DOWN') return 'UP';
        if (newDirection === 'DOWN' && prevDirection !== 'UP') return 'DOWN';
        if (newDirection === 'LEFT' && prevDirection !== 'RIGHT') return 'LEFT';
        if (newDirection === 'RIGHT' && prevDirection !== 'LEFT') return 'RIGHT';
        return prevDirection;
    });
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-2 select-none" ref={gameAreaRef}>
      {!gameStarted || gameOver ? (
         <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-3xl font-bold font-headline z-20">
            {gameOver ? 'GAME OVER' : 'Snake'}
            <Button onClick={startGame} className="mt-4">
              {gameOver ? 'Play Again' : 'Start Game'}
            </Button>
        </div>
      ) : null}
      
      <div className="bg-gray-800 relative" style={{ width: GRID_SIZE * TILE_SIZE, height: GRID_SIZE * TILE_SIZE }}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500"
            style={{
              left: segment.x * TILE_SIZE,
              top: segment.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
          />
        ))}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * TILE_SIZE,
            top: food.y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
          }}
        />
      </div>
       <div className="mt-4 text-white grid grid-cols-3 gap-2 md:hidden">
          <div></div>
          <Button variant="outline" onClick={() => changeDirection('UP')}><ArrowUp /></Button>
          <div></div>
          <Button variant="outline" onClick={() => changeDirection('LEFT')}><ArrowLeft /></Button>
          <Button variant="outline" onClick={() => changeDirection('DOWN')}><ArrowDown /></Button>
          <Button variant="outline" onClick={() => changeDirection('RIGHT')}><ArrowRight /></Button>
      </div>
    </div>
  );
}
