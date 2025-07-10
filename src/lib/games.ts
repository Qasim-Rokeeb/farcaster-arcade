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
    id: 'whack-a-mole',
    name: 'Whack-a-Mole',
    description: 'Test your reflexes! Whack the moles as they pop up.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'retro arcade',
    isPremium: false,
  },
  {
    id: 'snake',
    name: 'Snake',
    description: "Guide the snake to eat the food, but don't hit the walls or yourself!",
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pixelated snake',
    isPremium: false,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip the cards and find all the matching pairs. A test of your memory!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'playing cards',
    isPremium: false,
  },
  // Premium Games
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Fit the falling blocks together to clear lines and score points.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'geometric blocks',
    isPremium: true,
  },
  {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'Push boxes to their storage locations. A classic logic puzzle.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'wooden crate',
    isPremium: true,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Slide the tiles and combine them to reach the 2048 tile!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'number tiles',
    isPremium: true,
  },
  {
    id: 'word-find',
    name: 'Word Find',
    description: 'Find all the hidden words in the grid. A challenge for your vocabulary.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'letter grid',
    isPremium: true,
  },
  {
    id: 'clicker-hero',
    name: 'Clicker Hero',
    description: 'Click the targets as fast as you can before the time runs out!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bullseye target',
    isPremium: true,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
