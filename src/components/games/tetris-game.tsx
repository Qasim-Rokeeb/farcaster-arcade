'use client';

import { useState, useEffect, useCallback } from 'react';
import { useElementSize } from '@/hooks/use-element-size';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowDown, RotateCw } from 'lucide-react';

const COLS = 10;
const ROWS = 20;

const SHAPES: { [key: string]: { shape: number[][][]; color: string } } = {
  I: {
    shape: [
      [[1, 1, 1, 1]],
      [[1], [1], [1], [1]],
    ],
    color: 'cyan',
  },
  J: {
    shape: [
      [[0, 1], [0, 1], [1, 1]],
      [[1, 0, 0], [1, 1, 1]],
      [[1, 1], [1, 0], [1, 0]],
      [[1, 1, 1], [0, 0, 1]],
    ],
    color: 'blue',
  },
  L: {
    shape: [
      [[1, 0], [1, 0], [1, 1]],
      [[1, 1, 1], [1, 0, 0]],
      [[1, 1], [0, 1], [0, 1]],
      [[0, 0, 1], [1, 1, 1]],
    ],
    color: 'orange',
  },
  O: {
    shape: [[[1, 1], [1, 1]]],
    color: 'yellow',
  },
  S: {
    shape: [
      [[0, 1, 1], [1, 1, 0]],
      [[1, 0], [1, 1], [0, 1]],
    ],
    color: 'green',
  },
  T: {
    shape: [
      [[0, 1, 0], [1, 1, 1]],
      [[1, 0], [1, 1], [1, 0]],
      [[1, 1, 1], [0, 1, 0]],
      [[0, 1], [1, 1], [0, 1]],
    ],
    color: 'purple',
  },
  Z: {
    shape: [
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1], [1, 1], [1, 0]],
    ],
    color: 'red',
  },
};

const SHAPE_KEYS = Object.keys(SHAPES);

const createEmptyBoard = (): (string | number)[][] => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

interface GameProps {
  setScore: (score: (prev: number) => number) => void;
}

export default function TetrisGame({ setScore }: GameProps) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const [gameAreaRef, { width: gameAreaWidth, height: gameAreaHeight }] = useElementSize();
  const TILE_SIZE = Math.min(gameAreaWidth / COLS, gameAreaHeight / ROWS);

  function getRandomPiece() {
    const key = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
    return SHAPES[key];
  }

  const isValidMove = useCallback((pieceShape: number[][], newPosition: { x: number; y: number }, boardState: (string | number)[][]): boolean => {
    for (let y = 0; y < pieceShape.length; y++) {
      for (let x = 0; x < pieceShape[y].length; x++) {
        if (pieceShape[y][x]) {
          const newX = newPosition.x + x;
          const newY = newPosition.y + y;
          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && boardState[newY][newX] !== 0)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomPiece());
    setPosition({ x: 3, y: 0 });
    setRotation(0);
    setScore(() => 0);
    setGameOver(false);
    setIsPaused(true);
  }, [setScore]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const drop = useCallback(() => {
    if (isPaused || gameOver) return;
    const newPosition = { ...position, y: position.y + 1 };
    const pieceShape = currentPiece.shape[rotation];

    if (!isValidMove(pieceShape, newPosition, board)) {
      // Lock the piece
      let newBoard = board.map(row => [...row]);
      pieceShape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if(boardY >= 0) {
              newBoard[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });
      
      // Check for game over
      if (position.y < 0) {
        setGameOver(true);
        return;
      }

      // Clear lines
      let linesCleared = 0;
      newBoard = newBoard.filter(row => {
        if (row.every(cell => cell !== 0)) {
          linesCleared++;
          return false;
        }
        return true;
      });

      const newRows = Array.from({ length: linesCleared }, () => Array(COLS).fill(0));
      newBoard.unshift(...newRows);

      if (linesCleared > 0) {
        setScore(s => s + linesCleared * 100);
      }
      
      setBoard(newBoard);
      setCurrentPiece(getRandomPiece());
      setPosition({ x: 3, y: 0 });
      setRotation(0);

    } else {
      setPosition(newPosition);
    }
  }, [board, currentPiece, gameOver, isPaused, isValidMove, position, rotation, setScore]);

  useEffect(() => {
    const gameInterval = setInterval(drop, 1000);
    return () => clearInterval(gameInterval);
  }, [drop]);

  const move = (dx: number) => {
    if (isPaused || gameOver) return;
    const newPosition = { ...position, x: position.x + dx };
    const pieceShape = currentPiece.shape[rotation];
    if (isValidMove(pieceShape, newPosition, board)) {
      setPosition(newPosition);
    }
  };

  const rotate = () => {
    if (isPaused || gameOver) return;
    const newRotation = (rotation + 1) % currentPiece.shape.length;
    const newShape = currentPiece.shape[newRotation];
    if (isValidMove(newShape, position, board)) {
      setRotation(newRotation);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (gameOver) return;
    if (e.key === ' ') {
      setIsPaused(p => !p);
      return;
    }
    if (isPaused) return;

    switch (e.key) {
      case 'ArrowLeft':
        move(-1);
        break;
      case 'ArrowRight':
        move(1);
        break;
      case 'ArrowDown':
        drop();
        break;
      case 'ArrowUp':
        rotate();
        break;
    }
  }, [drop, gameOver, isPaused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderedBoard = board.map(row => [...row]);
  const currentShape = currentPiece.shape[rotation];
  currentShape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        const boardY = position.y + y;
        const boardX = position.x + x;
        if(boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            renderedBoard[boardY][boardX] = currentPiece.color;
        }
      }
    });
  });

  const getTileColor = (cellValue: string | number) => {
    switch(cellValue) {
        case 'cyan': return 'bg-cyan-500';
        case 'blue': return 'bg-blue-600';
        case 'orange': return 'bg-orange-500';
        case 'yellow': return 'bg-yellow-400';
        case 'green': return 'bg-green-500';
        case 'purple': return 'bg-purple-600';
        case 'red': return 'bg-red-600';
        default: return 'bg-muted/20';
    }
  }

  return (
    <div
      ref={gameAreaRef}
      className="w-full h-full bg-background relative flex flex-col items-center justify-center p-2"
      tabIndex={0}
      onClick={() => setIsPaused(p => !p)}
    >
      <div
        className="grid border-2 border-muted"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${TILE_SIZE}px)`,
          width: TILE_SIZE * COLS,
          height: TILE_SIZE * ROWS,
        }}
      >
        {renderedBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`border-[0.5px] border-muted/50 ${getTileColor(cell)}`}
            />
          ))
        )}
      </div>

      {(gameOver || isPaused) && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-3xl font-bold font-headline z-20 cursor-pointer">
          {gameOver ? 'GAME OVER' : 'PAUSED'}
        </div>
      )}

      <div className="lg:hidden absolute bottom-4 w-full px-4 flex justify-between items-center">
        <Button variant="outline" size="icon" onTouchStart={(e) => { e.preventDefault(); rotate(); }} onClick={(e) => { e.stopPropagation(); rotate(); }}><RotateCw /></Button>
        <div className="flex gap-2">
            <Button variant="outline" size="icon" onTouchStart={(e) => { e.preventDefault(); move(-1); }} onClick={(e) => { e.stopPropagation(); move(-1); }}><ArrowLeft /></Button>
            <Button variant="outline" size="icon" onTouchStart={(e) => { e.preventDefault(); drop(); }} onClick={(e) => { e.stopPropagation(); drop(); }}><ArrowDown /></Button>
            <Button variant="outline" size="icon" onTouchStart={(e) => { e.preventDefault(); move(1); }} onClick={(e) => { e.stopPropagation(); move(1); }}><ArrowRight /></Button>
        </div>
      </div>
    </div>
  );
}
