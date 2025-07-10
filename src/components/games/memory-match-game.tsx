'use client';

import { useState, useEffect, useMemo } from 'react';
import { Gamepad, BrainCircuit, Star, Zap, Gem, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MemoryMatchGameProps {
  setScore: (score: (prevScore: number) => number) => void;
}

const iconComponents = { Gamepad, BrainCircuit, Star, Zap, Gem, Rocket };

type Card = {
  id: number;
  icon: keyof typeof iconComponents;
  isFlipped: boolean;
  isMatched: boolean;
};

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const createInitialCards = () => {
    const iconKeys = Object.keys(iconComponents) as (keyof typeof iconComponents)[];
    const gameIcons = [...iconKeys, ...iconKeys];
    return shuffleArray(gameIcons).map((icon, index) => ({
      id: index,
      icon: icon,
      isFlipped: false,
      isMatched: false,
    }));
};

export default function MemoryMatchGame({ setScore }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<Card[]>(createInitialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    setScore(() => 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.icon === secondCard.icon) {
        setScore(s => s + 50);
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
      } else {
        setScore(s => Math.max(0, s - 10));
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, setScore]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, index]);
  };
  
  const allMatched = cards.every(c => c.isMatched);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
        {allMatched && cards.length > 0 ? (
             <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-primary">
                You Win!
            </div>
        ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md aspect-square">
            {cards.map((card, index) => {
                const IconComponent = card.icon ? iconComponents[card.icon] : null;
                return (
                <div
                    key={card.id}
                    className="aspect-square cursor-pointer [perspective:1000px]"
                    onClick={() => handleCardClick(index)}
                >
                    <div
                    className={cn(
                        'relative w-full h-full rounded-lg shadow-md transition-transform duration-500 [transform-style:preserve-3d]',
                        (card.isFlipped || card.isMatched) && '[transform:rotateY(180deg)]'
                    )}
                    >
                    <div className="absolute w-full h-full bg-secondary rounded-lg flex items-center justify-center [backface-visibility:hidden]">
                        <BrainCircuit className="w-1/2 h-1/2 text-secondary-foreground/50" />
                    </div>
                    <div className="absolute w-full h-full bg-primary/20 rounded-lg flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        {IconComponent && <IconComponent className={cn("w-3/4 h-3/4", card.isMatched ? 'text-primary' : 'text-accent')} />}
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        )}
    </div>
  );
}
