
import { getGameBySlug } from '@/lib/games';
import { notFound } from 'next/navigation';
import GamePageClient from './game-page-client';

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GamePageClient game={game} />;
}
