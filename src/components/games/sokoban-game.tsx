
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TILE_TYPE = {
  EMPTY: 0,
  WALL: 1,
  PLAYER: 2,
  BOX: 3,
  GOAL: 4,
  BOX_ON_GOAL: 5,
  PLAYER_ON_GOAL: 6,
};

const LEVELS = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 4, 1],
    [1, 0, 3, 2, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 0, 0, 0],
    [1, 2, 0, 1, 1, 1, 1, 0],
    [1, 0, 3, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 4, 1, 1],
    [0, 1, 3, 0, 1, 4, 1, 0],
    [0, 1, 0, 0, 0, 4, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
  ]
];

interface SokobanGameProps {
  setScore: (updater: (prevScore: number) => number) => void;
}

export default function SokobanGame({ setScore }: SokobanGameProps) {
  const [level, setLevel] = useState(0);
  const [board, setBoard] = useState(LEVELS[0]);
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const findStartPos = (b: number[][]) => {
    for (let r = 0; r < b.length; r++) {
      for (let c = 0; c < b[r].length; c++) {
        if (b[r][c] === TILE_TYPE.PLAYER || b[r][c] === TILE_TYPE.PLAYER_ON_GOAL) {
          return { r, c };
        }
      }
    }
    return { r: 0, c: 0 };
  };

  const loadLevel = useCallback((levelIndex: number) => {
    const newBoard = LEVELS[levelIndex].map(row => [...row]);
    setBoard(newBoard);
    setPlayerPos(findStartPos(newBoard));
    setMoves(0);
    setIsComplete(false);
    setScore(() => levelIndex * 1000);
  }, [setScore]);

  useEffect(() => {
    loadLevel(level);
  }, [level, loadLevel]);

  const checkWinCondition = (b: number[][]) => {
    for (let r = 0; r < b.length; r++) {
      for (let c = 0; c < b[r].length; c++) {
        if (b[r][c] === TILE_TYPE.BOX) {
          return false;
        }
      }
    }
    return true;
  };

  const movePlayer = useCallback((dr: number, dc: number) => {
    if (isComplete) return;

    const { r, c } = playerPos;
    const newR = r + dr;
    const newC = c + dc;
    
    if (newR < 0 || newR >= board.length || newC < 0 || newC >= board[0].length) return;

    const newBoard = board.map(row => [...row]);
    const nextTile = newBoard[newR][newC];

    if (nextTile === TILE_TYPE.WALL) return;

    if (nextTile === TILE_TYPE.BOX || nextTile === TILE_TYPE.BOX_ON_GOAL) {
      const pushR = newR + dr;
      const pushC = newC + dc;

      if (pushR < 0 || pushR >= board.length || pushC < 0 || pushC >= board[0].length) return;
      
      const afterBoxTile = newBoard[pushR][pushC];
      if (afterBoxTile === TILE_TYPE.WALL || afterBoxTile === TILE_TYPE.BOX || afterBoxTile === TILE_TYPE.BOX_ON_GOAL) return;

      // Move box
      newBoard[pushR][pushC] = afterBoxTile === TILE_TYPE.GOAL ? TILE_TYPE.BOX_ON_GOAL : TILE_TYPE.BOX;
      // Clear box's old spot
      newBoard[newR][newC] = nextTile === TILE_TYPE.BOX_ON_GOAL ? TILE_TYPE.GOAL : TILE_TYPE.EMPTY;
    }

    // Move player
    newBoard[newR][newC] = newBoard[newR][newC] === TILE_TYPE.GOAL ? TILE_TYPE.PLAYER_ON_GOAL : TILE_TYPE.PLAYER;
    // Clear player's old spot
    newBoard[r][c] = board[r][c] === TILE_TYPE.PLAYER_ON_GOAL ? TILE_TYPE.GOAL : TILE_TYPE.EMPTY;

    setBoard(newBoard);
    setPlayerPos({ r: newR, c: newC });
    setMoves(m => m + 1);
    
    if (checkWinCondition(newBoard)) {
        setIsComplete(true);
        setScore(s => s + Math.max(0, 1000 - moves * 10));
    }
  }, [board, isComplete, moves, playerPos, setScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'ArrowUp') movePlayer(-1, 0);
      if (e.key === 'ArrowDown') movePlayer(1, 0);
      if (e.key === 'ArrowLeft') movePlayer(0, -1);
      if (e.key === 'ArrowRight') movePlayer(0, 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  const getTileComponent = (tile: number) => {
    const baseStyle = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200";
    switch (tile) {
      case TILE_TYPE.WALL:
        return <div className={`${baseStyle} bg-gray-700`}></div>;
      case TILE_TYPE.PLAYER:
        return <div className={`${baseStyle} bg-blue-400 rounded-full`}></div>;
      case TILE_TYPE.BOX:
        return <div className={`${baseStyle} bg-yellow-600 rounded-md`}></div>;
      case TILE_TYPE.GOAL:
        return <div className={`${baseStyle} bg-green-800/50 border-2 border-dashed border-green-400 rounded-md`}></div>;
      case TILE_TYPE.BOX_ON_GOAL:
        return <div className={`${baseStyle} bg-green-500 rounded-md`}></div>;
      case TILE_TYPE.PLAYER_ON_GOAL:
        return <div className={`${baseStyle} bg-green-800/50 border-2 border-dashed border-green-400 rounded-md`}><div className="w-full h-full bg-blue-400 rounded-full scale-90"></div></div>;
      default: // EMPTY
        return <div className={`${baseStyle} bg-gray-800`}></div>;
    }
  };

  const nextLevel = () => {
    if (level < LEVELS.length - 1) {
        setLevel(l => l + 1);
    }
  }

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gray-900 select-none">
      <div className="mb-4 text-white">
        Level: {level + 1} | Moves: {moves}
      </div>
      <div className="flex flex-col gap-1 bg-gray-900 p-2 rounded-md">
        {board.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((tile, c) => (
              <div key={c}>{getTileComponent(tile)}</div>
            ))}
          </div>
        ))}
      </div>
      {isComplete && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-3xl font-bold font-headline z-20">
            LEVEL COMPLETE!
            {level < LEVELS.length - 1 && (
                <Button onClick={nextLevel} className="mt-4">Next Level</Button>
            )}
            {level === LEVELS.length - 1 && (
                <p className="text-xl mt-4">You beat all levels!</p>
            )}
        </div>
      )}
      <div className="mt-4 text-white grid grid-cols-3 gap-2 md:hidden">
          <div></div>
          <Button variant="outline" onClick={() => movePlayer(-1, 0)}><ArrowUp /></Button>
          <div></div>
          <Button variant="outline" onClick={() => movePlayer(0, -1)}><ArrowLeft /></Button>
          <Button variant="outline" onClick={() => movePlayer(1, 0)}><ArrowDown /></Button>
          <Button variant="outline" onClick={() => movePlayer(0, 1)}><ArrowRight /></Button>
      </div>
    </div>
  );
}

