
import GamePageClient from './game-page-client';

interface GamePageProps {
  params: {
    slug: string;
  };
}

// This component now only extracts the slug and passes it to the client component.
// All data fetching and logic is handled on the client to avoid the params error.
export default function GamePage({ params }: GamePageProps) {
  const { slug } = params;
  return <GamePageClient slug={slug} />;
}
