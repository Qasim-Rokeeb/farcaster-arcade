import { getGameBySlug } from '@/lib/games';
import { notFound } from 'next/navigation';
import GamePageClient from './game-page-client';

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

  return <GamePageClient game={game} />;
}
