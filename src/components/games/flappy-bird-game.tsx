
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Bird } from 'lucide-react';

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const BIRD_SIZE = 25;
const GRAVITY = 0.5;
const JUMP_STRENGTH = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const PIPE_SPEED = 3;
const PIPE_INTERVAL = 1500; // ms

interface FlappyBirdGameProps {
  setScore: (updater: (prevScore: number) => number) => void;
}

export default function FlappyBirdGame({ setScore }: FlappyBirdGameProps) {
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<{ x: number; topHeight: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameLoopRef = useRef<number>();
  const pipeTimerRef = useRef<NodeJS.Timeout>();

  const startGame = useCallback(() => {
    setBirdPosition(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(() => 0);
    setGameOver(false);
    setGameStarted(true);

    const gameTick = () => {
      // Gravity
      setBirdVelocity(v => v + GRAVITY);
      setBirdPosition(p => p + birdVelocity);

      // Move pipes
      setPipes(currentPipes =>
        currentPipes
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter(pipe => pipe.x > -PIPE_WIDTH)
      );

      // Score
      pipes.forEach(pipe => {
        if (pipe.x + PIPE_WIDTH < GAME_WIDTH / 2 - BIRD_SIZE / 2 && pipe.x + PIPE_WIDTH + PIPE_SPEED >= GAME_WIDTH / 2 - BIRD_SIZE / 2) {
          setScore(s => s + 1);
        }
      });
      
      gameLoopRef.current = requestAnimationFrame(gameTick);
    };

    gameLoopRef.current = requestAnimationFrame(gameTick);

    pipeTimerRef.current = setInterval(() => {
      const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
      setPipes(p => [...p, { x: GAME_WIDTH, topHeight }]);
    }, PIPE_INTERVAL);

  }, [birdVelocity, pipes, setScore]);

  const jump = useCallback(() => {
    if (!gameOver && gameStarted) {
      setBirdVelocity(JUMP_STRENGTH);
    } else if (!gameStarted) {
      startGame();
    }
  }, [gameOver, gameStarted, startGame]);

  useEffect(() => {
    if (!gameStarted) return;
    
    // Collision detection
    const birdTop = birdPosition - BIRD_SIZE / 2;
    const birdBottom = birdPosition + BIRD_SIZE / 2;
    
    // Floor and ceiling collision
    if (birdBottom > GAME_HEIGHT || birdTop < 0) {
      setGameOver(true);
    }

    // Pipe collision
    pipes.forEach(pipe => {
      const birdLeft = GAME_WIDTH / 2 - BIRD_SIZE / 2;
      const birdRight = GAME_WIDTH / 2 + BIRD_SIZE / 2;

      if (
        birdRight > pipe.x &&
        birdLeft < pipe.x + PIPE_WIDTH &&
        (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP)
      ) {
        setGameOver(true);
      }
    });

  }, [birdPosition, pipes, gameStarted]);

  useEffect(() => {
    if (gameOver) {
      cancelAnimationFrame(gameLoopRef.current!);
      clearInterval(pipeTimerRef.current!);
    }
  }, [gameOver]);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };
    const handleTouch = (e: TouchEvent) => {
        e.preventDefault();
        jump();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouch);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(gameLoopRef.current!);
      clearInterval(pipeTimerRef.current!);
    };
  }, [jump]);


  return (
    <div className="w-full h-full bg-cyan-200 overflow-hidden relative" onClick={jump}>
      <div
        className="absolute transition-all duration-100 ease-linear text-yellow-500"
        style={{
          left: `${GAME_WIDTH / 2 - BIRD_SIZE / 2}px`,
          top: `${birdPosition - BIRD_SIZE / 2}px`,
          width: `${BIRD_SIZE}px`,
          height: `${BIRD_SIZE}px`,
        }}
      >
        <Bird className="w-full h-full fill-current" />
      </div>
      
      {pipes.map((pipe, i) => (
        <div key={i} className="absolute">
          <div
            className="absolute bg-green-600 border-2 border-green-800"
            style={{
              left: `${pipe.x}px`,
              top: 0,
              width: `${PIPE_WIDTH}px`,
              height: `${pipe.topHeight}px`,
            }}
          />
          <div
            className="absolute bg-green-600 border-2 border-green-800"
            style={{
              left: `${pipe.x}px`,
              top: `${pipe.topHeight + PIPE_GAP}px`,
              width: `${PIPE_WIDTH}px`,
              height: `${GAME_HEIGHT - pipe.topHeight - PIPE_GAP}px`,
            }}
          />
        </div>
      ))}
      
      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center text-black text-2xl font-bold font-headline z-20 pointer-events-none">
          Click to Start
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-3xl font-bold font-headline z-20">
          GAME OVER
        </div>
      )}
    </div>
  );
}
