import { getGameBySlug } from '@/lib/games';
import { notFound } from 'next/navigation';
import GameArena from './game-arena';

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  return <GameArena game={game} />;
}
