
'use client';

import type { Game } from '@/lib/games';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import PremiumSubscribeButton from './premium-subscribe-button';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-2xl">{game.name}</CardTitle>
            <CardDescription>{game.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow relative">
        <div className="aspect-video overflow-hidden rounded-lg group">
          <Image
            src={game.imageUrl}
            alt={game.name}
            width={600}
            height={400}
            data-ai-hint={game.dataAiHint}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/games/${game.id}`}>
            Play Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
