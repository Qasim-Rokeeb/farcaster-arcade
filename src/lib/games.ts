
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
    id: 'clicker-hero',
    name: 'Clicker Hero',
    description: 'Click the targets as fast as you can before the time runs out!',
    imageUrl: '/assets/images/clicker-hero.png',
    dataAiHint: 'bullseye target',
    isPremium: false,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip the cards and find all the matching pairs. A test of your memory!',
    imageUrl: '/assets/images/memory-match.png',
    dataAiHint: 'playing cards',
    isPremium: false,
  },
  {
    id: 'whack-a-mole',
    name: 'Whack-a-Mole',
    description: 'Test your reflexes! Whack the moles as they pop up.',
    imageUrl: '/assets/images/whack-a-mole.png',
    dataAiHint: 'retro arcade',
    isPremium: false,
  },
  // Premium Games
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Fit the falling blocks together to clear lines and score points.',
    imageUrl: '/assets/images/tetris.png',
    dataAiHint: 'geometric blocks',
    isPremium: true,
  },
  {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'Push boxes to their storage locations. A classic logic puzzle.',
    imageUrl: '/assets/images/sokoban.png',
    dataAiHint: 'wooden crate',
    isPremium: true,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Slide the tiles and combine them to reach the 2048 tile!',
    imageUrl: '/assets/images/2048.png',
    dataAiHint: 'number tiles',
    isPremium: true,
  },
  {
    id: 'pac-man',
    name: 'Pac-Man',
    description: 'Navigate the maze, eat the dots, and avoid the ghosts.',
    imageUrl: '/assets/images/pac-man.png',
    dataAiHint: 'retro maze',
    isPremium: true,
  },
  {
    id: 'asteroids',
    name: 'Asteroids',
    description: 'Pilot a spaceship and destroy asteroids and flying saucers.',
    imageUrl: '/assets/images/asteroids.png',
    dataAiHint: 'space spaceship',
    isPremium: true,
  },
    {
    id: 'flappy-bird',
    name: 'Flappy Bird',
    description: 'Guide the bird through the pipes with a simple tap.',
    imageUrl: '/assets/images/flappy-bird.png',
    dataAiHint: 'pixel bird',
    isPremium: true,
  },
  {
    id: 'pong',
    name: 'Pong',
    description: 'The original table tennis classic. A two-dimensional sports game.',
    imageUrl: '/assets/images/pong.png',
    dataAiHint: 'retro paddle',
    isPremium: true,
  },
  {
    id: 'lights-out',
    name: 'Lights Out',
    description: 'A puzzle where toggling a light also toggles its neighbors.',
    imageUrl: '/assets/images/lights-out.png',
    dataAiHint: 'light grid',
    isPremium: true,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
