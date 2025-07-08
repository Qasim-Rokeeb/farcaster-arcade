export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  isPremium?: boolean;
}

export const games: Game[] = [
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'The classic block-dropping puzzle game. Stack the blocks and clear lines!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'tetris blocks',
    isPremium: false,
  },
  {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'A mind-bending puzzle where you push boxes to their designated locations.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'puzzle box',
    isPremium: false,
  },
  {
    id: 'mini-car-racing',
    name: 'Mini Car Racing',
    description: 'A simple and fun racing game. Avoid obstacles and race to the finish line!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'race car',
    isPremium: false,
  },
  {
    id: 'space-invaders',
    name: 'Space Invaders',
    description: 'Defend the territory from aliens. A timeless arcade classic.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'space invaders',
    isPremium: true,
  },
  {
    id: 'pac-man',
    name: 'Pac-Man',
    description: 'Navigate the maze, eat the dots, and avoid the ghosts!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pac-man maze',
    isPremium: true,
  },
  {
    id: 'asteroids',
    name: 'Asteroids',
    description: 'Pilot a spaceship in an asteroid field and shoot them down.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'asteroid spaceship',
    isPremium: true,
  },
  {
    id: 'frogger',
    name: 'Frogger',
    description: 'Help a frog cross a busy road and a treacherous river.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'frogger game',
    isPremium: true,
  },
  {
    id: 'donkey-kong',
    name: 'Donkey Kong',
    description: 'Climb the ladders and jump over barrels to save the princess!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'donkey kong arcade',
    isPremium: true,
  },
  {
    id: 'galaga',
    name: 'Galaga',
    description: 'A classic fixed-shooter game where you fight off insect-like aliens.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'galaga spaceship',
    isPremium: true,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
