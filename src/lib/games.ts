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
    imageUrl: 'https://images.unsplash.com/photo-1593348824345-95d49e759a23?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'retro arcade',
    isPremium: false,
  },
  {
    id: 'snake',
    name: 'Snake',
    description: "Guide the snake to eat the food, but don't hit the walls or yourself!",
    imageUrl: 'https://images.unsplash.com/photo-1585060168448-237834571469?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'pixelated snake',
    isPremium: false,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip the cards and find all the matching pairs. A test of your memory!',
    imageUrl: 'https://images.unsplash.com/photo-1543599723-8e4d94733303?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'playing cards',
    isPremium: false,
  },
  // Premium Games
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Fit the falling blocks together to clear lines and score points.',
    imageUrl: 'https://images.unsplash.com/photo-1557835114-c1cf1646b1a3?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'geometric blocks',
    isPremium: true,
  },
  {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'Push boxes to their storage locations. A classic logic puzzle.',
    imageUrl: 'https://images.unsplash.com/photo-1507675929634-a20a3f65625c?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'wooden crate',
    isPremium: true,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Slide the tiles and combine them to reach the 2048 tile!',
    imageUrl: 'https://images.unsplash.com/photo-1618193139063-5e7a9b1a511e?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'number tiles',
    isPremium: true,
  },
  {
    id: 'word-find',
    name: 'Word Find',
    description: 'Find all the hidden words in the grid. A challenge for your vocabulary.',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'letter grid',
    isPremium: true,
  },
  {
    id: 'clicker-hero',
    name: 'Clicker Hero',
    description: 'Click the targets as fast as you can before the time runs out!',
    imageUrl: 'https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=600&h=400&auto=format&fit=crop',
    dataAiHint: 'bullseye target',
    isPremium: true,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
