export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  isPremium?: boolean;
}

export const games: Game[] = [
  // Free and Popular Games
  {
    id: 'brick-breaker',
    name: 'Brick Breaker',
    description: 'Break all the bricks with the ball. A timeless arcade classic.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'brick breaker game',
    isPremium: false,
  },
  {
    id: 'snake',
    name: 'Snake',
    description: "Guide the snake to eat the food, but don't hit the walls or yourself!",
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'snake game',
    isPremium: false,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip the cards and find all the matching pairs. A test of your memory!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'memory cards',
    isPremium: false,
  },
  // Premium Games
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Fit the falling blocks together to clear lines and score points.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'tetris blocks',
    isPremium: true,
  },
  {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'Push boxes to their storage locations. A classic logic puzzle.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'puzzle boxes',
    isPremium: true,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Slide the tiles and combine them to reach the 2048 tile!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'puzzle numbers',
    isPremium: true,
  },
  {
    id: 'word-find',
    name: 'Word Find',
    description: 'Find all the hidden words in the grid. A challenge for your vocabulary.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'word search',
    isPremium: true,
  },
  {
    id: 'clicker-hero',
    name: 'Clicker Hero',
    description: 'Click the targets as fast as you can before the time runs out!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'target practice',
    isPremium: true,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
