
'use client';

import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 4;
const TILE_COLORS: { [key: number]: string } = {
  2: 'bg-slate-200 text-slate-800',
  4: 'bg-slate-300 text-slate-800',
  8: 'bg-orange-300 text-white',
  16: 'bg-orange-400 text-white',
  32: 'bg-orange-500 text-white',
  64: 'bg-orange-600 text-white',
  128: 'bg-yellow-400 text-white',
  256: 'bg-yellow-500 text-white',
  512: 'bg-yellow-600 text-white',
  1024: 'bg-indigo-400 text-white',
  2048: 'bg-indigo-600 text-white',
};

interface Game2048Props {
  setScore: (updater: (prevScore: number) => number) => void;
}

export default function Game2048({ setScore }: Game2048Props) {
  const [board, setBoard] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState(false);

  const createEmptyBoard = (): number[][] => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));

  const addRandomTile = (currentBoard: number[][]): number[][] => {
    let newBoard = [...currentBoard];
    let emptyTiles: { r: number; c: number }[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newBoard[r][c] === 0) {
          emptyTiles.push({ r, c });
        }
      }
    }
    if (emptyTiles.length > 0) {
      const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
    return newBoard;
  };

  const isGameOver = useCallback((currentBoard: number[][]): boolean => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentBoard[r][c] === 0) return false;
        if (r < GRID_SIZE - 1 && currentBoard[r][c] === currentBoard[r + 1][c]) return false;
        if (c < GRID_SIZE - 1 && currentBoard[r][c] === currentBoard[r][c + 1]) return false;
      }
    }
    return true;
  }, []);

  const slide = (row: number[]): [number[], number] => {
    let arr = row.filter(val => val);
    let missing = GRID_SIZE - arr.length;
    let zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);

    let scoreToAdd = 0;
    for (let i = 0; i < GRID_SIZE - 1; i++) {
      if (arr[i] > 0 && arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        scoreToAdd += arr[i];
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter(val => val);
    missing = GRID_SIZE - arr.length;
    zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);

    return [arr, scoreToAdd];
  };

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let newBoard = board.map(row => [...row]);
    let moved = false;
    let scoreToAdd = 0;

    const rotateBoard = (b: number[][]) => {
      const rotated = createEmptyBoard();
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          rotated[r][c] = b[GRID_SIZE - 1 - c][r];
        }
      }
      return rotated;
    };

    if (direction === 'left' || direction === 'right') {
      for (let r = 0; r < GRID_SIZE; r++) {
        const row = direction === 'left' ? newBoard[r] : [...newBoard[r]].reverse();
        const [newRow, newScore] = slide(row);
        scoreToAdd += newScore;
        const finalRow = direction === 'left' ? newRow : newRow.reverse();
        if (JSON.stringify(newBoard[r]) !== JSON.stringify(finalRow)) moved = true;
        newBoard[r] = finalRow;
      }
    } else { // 'up' or 'down'
      let rotated = rotateBoard(newBoard);
      if (direction === 'down') rotated = rotateBoard(rotateBoard(rotated));

      for (let r = 0; r < GRID_SIZE; r++) {
        const row = direction === 'up' ? rotated[r] : [...rotated[r]].reverse();
        const [newRow, newScore] = slide(row);
        scoreToAdd += newScore;
        const finalRow = direction === 'up' ? newRow : newRow.reverse();
        if (JSON.stringify(rotated[r]) !== JSON.stringify(finalRow)) moved = true;
        rotated[r] = finalRow;
      }
      
      let finalBoard = rotated;
      if (direction === 'up') {
        finalBoard = rotateBoard(rotateBoard(rotateBoard(rotated)));
      } else { // 'down'
        finalBoard = rotateBoard(rotateBoard(finalBoard));
      }
      newBoard = finalBoard;
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(s => s + scoreToAdd);
      if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  }, [board, gameOver, isGameOver, setScore]);

  useEffect(() => {
    let initialBoard = addRandomTile(createEmptyBoard());
    initialBoard = addRandomTile(initialBoard);
    setBoard(initialBoard);
    setScore(() => 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowRight') move('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gray-800 rounded-lg select-none">
      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-3xl font-bold font-headline z-20">
          GAME OVER
        </div>
      )}
      <div className="grid grid-cols-4 gap-2 bg-gray-700 p-2 rounded-md">
        {board.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-md font-bold text-2xl sm:text-3xl transition-all duration-200 ${
                val > 0 ? TILE_COLORS[val] || 'bg-gray-500' : 'bg-gray-600'
              }`}
            >
              {val > 0 ? val : ''}
            </div>
          ))
        )}
      </div>
      <p className="text-white mt-4 text-sm hidden md:block">Use arrow keys to play</p>
    </div>
  );
}
