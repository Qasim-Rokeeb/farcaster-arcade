
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const WORDS = ["react", "nextjs", "tailwind", "farcaster", "arcade", "game", "typescript"];
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split('');
const MAX_INCORRECT_GUESSES = 6;

interface HangmanGameProps {
  setScore: (updater: (prevScore: number) => number) => void;
}

export default function HangmanGame({ setScore }: HangmanGameProps) {
  const [wordToGuess, setWordToGuess] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  
  const incorrectGuesses = useMemo(() => {
    return guessedLetters.filter(letter => !wordToGuess.includes(letter));
  }, [guessedLetters, wordToGuess]);

  const isGameWon = useMemo(() => {
    if (!wordToGuess) return false;
    return wordToGuess.split('').every(letter => guessedLetters.includes(letter));
  }, [guessedLetters, wordToGuess]);

  const isGameLost = useMemo(() => {
    return incorrectGuesses.length >= MAX_INCORRECT_GUESSES;
  }, [incorrectGuesses]);
  
  const startGame = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWordToGuess(randomWord);
    setGuessedLetters([]);
    setScore(() => 0);
  }, [setScore]);
  
  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (isGameWon) {
      setScore(s => s + 100 + (MAX_INCORRECT_GUESSES - incorrectGuesses.length) * 10);
    }
  }, [isGameWon, setScore, incorrectGuesses.length]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || isGameWon || isGameLost) return;
    setGuessedLetters(prev => [...prev, letter]);
  };
  
  const HangmanDrawing = () => (
    <div className="w-24 h-28 relative">
      {/* Gallow */}
      <div className="absolute bottom-0 left-0 w-20 h-1 bg-foreground"></div>
      <div className="absolute bottom-0 left-4 w-1 h-24 bg-foreground"></div>
      <div className="absolute top-0 left-4 w-12 h-1 bg-foreground"></div>
      <div className="absolute top-0 right-8 w-1 h-4 bg-foreground"></div>

      {/* Body parts */}
      {incorrectGuesses.length > 0 && <div className="absolute top-4 right-[28px] w-5 h-5 border-2 border-foreground rounded-full"></div>}
      {incorrectGuesses.length > 1 && <div className="absolute top-9 right-8 w-1 h-8 bg-foreground"></div>}
      {incorrectGuesses.length > 2 && <div className="absolute top-10 right-10 w-4 h-1 bg-foreground rotate-45 origin-left"></div>}
      {incorrectGuesses.length > 3 && <div className="absolute top-10 right-6 w-4 h-1 bg-foreground -rotate-45 origin-right"></div>}
      {incorrectGuesses.length > 4 && <div className="absolute top-[66px] right-10 w-4 h-1 bg-foreground rotate-45 origin-left"></div>}
      {incorrectGuesses.length > 5 && <div className="absolute top-[66px] right-6 w-4 h-1 bg-foreground -rotate-45 origin-right"></div>}
    </div>
  );

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-around select-none">
      <div className="flex flex-col items-center gap-4">
        <HangmanDrawing />
        <div className="flex gap-2 text-2xl md:text-3xl font-bold tracking-widest">
          {wordToGuess.split('').map((letter, index) => (
            <span key={index} className="w-8 h-10 border-b-4 flex items-center justify-center">
              {guessedLetters.includes(letter) || isGameLost ? letter.toUpperCase() : '_'}
            </span>
          ))}
        </div>
      </div>
      
      {(isGameWon || isGameLost) ? (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">{isGameWon ? 'YOU WIN!' : 'GAME OVER'}</p>
          {!isGameWon && <p className="mb-2">The word was: <span className="font-bold">{wordToGuess.toUpperCase()}</span></p>}
          <Button onClick={startGame}>Play Again</Button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 max-w-sm">
          {ALPHABET.map(letter => (
            <Button
              key={letter}
              variant="outline"
              size="icon"
              className="w-8 h-8 md:w-10 md:h-10 text-lg"
              disabled={guessedLetters.includes(letter)}
              onClick={() => handleGuess(letter)}
            >
              {letter.toUpperCase()}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
