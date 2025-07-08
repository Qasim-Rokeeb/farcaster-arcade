'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useElementSize } from '@/hooks/use-element-size';

const PADDLE_WIDTH_RATIO = 0.2; // 20% of game width
const PADDLE_HEIGHT = 15;
const BALL_SIZE = 15;
const BRICK_COLS = 8;
const BRICK_ROWS = 5;

interface GameProps {
  setScore: (score: (prev: number) => number) => void;
}

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
}

export default function BrickBreakerGame({ setScore }: GameProps) {
  const [gameAreaRef, { width: gameAreaWidth, height: gameAreaHeight }] = useElementSize();

  const PADDLE_WIDTH = gameAreaWidth * PADDLE_WIDTH_RATIO;
  const [paddleX, setPaddleX] = useState(0);
  const [ball, setBall] = useState({ x: 0, y: 0, dx: 0, dy: 0 });
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const animationFrameId = useRef<number>();

  const resetGame = useCallback(() => {
    if (gameAreaWidth > 0 && gameAreaHeight > 0) {
      setPaddleX((gameAreaWidth - PADDLE_WIDTH) / 2);
      const ballSpeed = Math.max(4, gameAreaWidth / 150);
      setBall({
        x: gameAreaWidth / 2,
        y: gameAreaHeight - PADDLE_HEIGHT - BALL_SIZE - 5,
        dx: ballSpeed,
        dy: -ballSpeed,
      });

      const brickWidth = (gameAreaWidth - (BRICK_COLS + 1) * 2) / BRICK_COLS;
      const brickHeight = 20;
      const newBricks: Brick[] = [];
      for (let c = 0; c < BRICK_COLS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
          newBricks.push({
            x: c * (brickWidth + 2) + 2,
            y: r * (brickHeight + 2) + 30,
            width: brickWidth,
            height: brickHeight,
            alive: true,
          });
        }
      }
      setBricks(newBricks);
      setScore(() => 0);
      setGameOver(false);
      setIsPaused(true);
    }
  }, [gameAreaWidth, gameAreaHeight, PADDLE_WIDTH, setScore]);
  
  useEffect(() => {
    resetGame();
  }, [resetGame]);
  
  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!gameAreaRef.current) return;
    const bounds = gameAreaRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let newX = clientX - bounds.left - PADDLE_WIDTH / 2;
    if (newX < 0) newX = 0;
    if (newX > gameAreaWidth - PADDLE_WIDTH) newX = gameAreaWidth - PADDLE_WIDTH;
    setPaddleX(newX);
  }, [gameAreaWidth, PADDLE_WIDTH, gameAreaRef]);

  useEffect(() => {
    const currentRef = gameAreaRef.current;
    if (!currentRef) return;
    
    currentRef.addEventListener('mousemove', handleMouseMove as any);
    currentRef.addEventListener('touchmove', handleMouseMove as any);
    const handleClick = () => setIsPaused(p => !p);
    currentRef.addEventListener('click', handleClick);
    
    return () => {
      currentRef.removeEventListener('mousemove', handleMouseMove as any);
      currentRef.removeEventListener('touchmove', handleMouseMove as any);
      currentRef.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, gameAreaRef]);
  
  useEffect(() => {
    const gameLoop = () => {
        if (isPaused || gameOver) {
            animationFrameId.current = requestAnimationFrame(gameLoop);
            return;
        };

        setBall(b => {
          let newX = b.x + b.dx;
          let newY = b.y + b.dy;
          let newDx = b.dx;
          let newDy = b.dy;

          if (newX <= 0 || newX >= gameAreaWidth - BALL_SIZE) newDx = -newDx;
          if (newY <= 0) newDy = -newDy;
          
          if ( newY + BALL_SIZE >= gameAreaHeight - PADDLE_HEIGHT && newY + BALL_SIZE <= gameAreaHeight &&
            newX + BALL_SIZE > paddleX && newX < paddleX + PADDLE_WIDTH
          ) {
            newDy = -Math.abs(newDy);
          }

          setBricks(prevBricks => {
            const nextBricks = [...prevBricks];
            let hit = false;
            for(let i=0; i<nextBricks.length; i++) {
              const brick = nextBricks[i];
              if(brick.alive) {
                if( newX + BALL_SIZE > brick.x && newX < brick.x + brick.width &&
                  newY + BALL_SIZE > brick.y && newY < brick.y + brick.height
                ) {
                  newDy = -newDy;
                  brick.alive = false;
                  setScore(s => s + 10);
                  hit = true;
                }
              }
            }
            if (hit && nextBricks.every(br => !br.alive)) {
              setGameOver(true);
            }
            return nextBricks;
          });

          if (newY >= gameAreaHeight) {
            setGameOver(true);
          }

          return { x: newX, y: newY, dx: newDx, dy: newDy };
        });

        animationFrameId.current = requestAnimationFrame(gameLoop);
      };

    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    }
  }, [isPaused, gameOver, gameAreaWidth, gameAreaHeight, paddleX, PADDLE_WIDTH, setScore]);

  return (
    <div ref={gameAreaRef} className="w-full h-full bg-background relative overflow-hidden cursor-pointer touch-none">
      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-3xl font-bold font-headline z-20">
          {bricks.every(b => !b.alive) ? 'YOU WIN!' : 'GAME OVER'}
        </div>
      )}
      {isPaused && !gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-bold font-headline z-20">
          CLICK TO START / PAUSE
        </div>
      )}
      
      <div 
        className="absolute bg-primary rounded"
        style={{
          width: PADDLE_WIDTH,
          height: PADDLE_HEIGHT,
          left: paddleX,
          bottom: 0,
        }}
      />
      
      <div 
        className="absolute bg-accent rounded-full"
        style={{
          width: BALL_SIZE,
          height: BALL_SIZE,
          left: ball.x,
          top: ball.y,
        }}
      />
      
      {bricks.map((brick, i) => (
        brick.alive && <div
          key={i}
          className="absolute bg-secondary-foreground rounded"
          style={{
            left: brick.x,
            top: brick.y,
            width: brick.width,
            height: brick.height,
          }}
        />
      ))}
    </div>
  );
}
