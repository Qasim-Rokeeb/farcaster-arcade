export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
}

export const games: Game[] = [
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'The classic block-dropping puzzle game. Stack the blocks and clear lines!',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'tetris blocks',
  },
  {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'A mind-bending puzzle where you push boxes to their designated locations.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'puzzle box',
  },
  {
    id: 'mini-car-racing',
    name: 'Mini Car Racing',
    description: 'A simple and fun racing game. Avoid obstacles and race to the finish line!',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'race car',
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
