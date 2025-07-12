
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
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Fit the falling blocks together to clear lines and score points.',
    imageUrl: '/assets/images/tetris.png',
    dataAiHint: 'geometric blocks',
    isPremium: false,
  },
    {
    id: 'flappy-bird',
    name: 'Flappy Bird',
    description: 'Guide the bird through the pipes with a simple tap.',
    imageUrl: '/assets/images/flappy-bird.png',
    dataAiHint: 'pixel bird',
    isPremium: false,
  },
    {
    id: 'sokoban',
    name: 'Sokoban',
    description: 'Push boxes to their storage locations. A classic logic puzzle.',
    imageUrl: '/assets/images/sokoban.png',
    dataAiHint: 'wooden crate',
    isPremium: false,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Slide the tiles and combine them to reach the 2048 tile!',
    imageUrl: '/assets/images/2048.png',
    dataAiHint: 'number tiles',
    isPremium: false,
  },
   {
    id: 'snake',
    name: 'Snake',
    description: 'Guide the snake to eat the food and grow longer.',
    imageUrl: '/assets/images/snakke.png',
    dataAiHint: 'green snake',
    isPremium: false,
  },
  {
    id: 'simon-says',
    name: 'Simon Says',
    description: 'Watch the pattern of lights and repeat it back. How long can you last?',
    imageUrl: '/assets/images/simon-says.png',
    dataAiHint: 'color buttons',
    isPremium: false,
  },
  {
    id: 'hangman',
    name: 'Hangman',
    description: 'Guess the hidden word letter by letter before you run out of guesses.',
    imageUrl: '/assets/images/hangman.png',
    dataAiHint: 'chalkboard letters',
    isPremium: false,
  },
  {
    id: 'pac-man',
    name: 'Pac-Man',
    description: 'Navigate the maze, eat the dots, and avoid the ghosts.',
    imageUrl: '/assets/images/pac-man.png',
    dataAiHint: 'retro maze',
    isPremium: false,
  },
  {
    id: 'asteroids',
    name: 'Asteroids',
    description: 'Pilot a spaceship and destroy asteroids and flying saucers.',
    imageUrl: '/assets/images/asteroids.png',
    dataAiHint: 'space spaceship',
    isPremium: false,
  },
  {
    id: 'pong',
    name: 'Pong',
    description: 'The original table tennis classic. A two-dimensional sports game.',
    imageUrl: '/assets/images/pong.png',
    dataAiHint: 'retro paddle',
    isPremium: false,
  },
  {
    id: 'lights-out',
    name: 'Lights Out',
    description: 'A puzzle where toggling a light also toggles its neighbors.',
    imageUrl: '/assets/images/lights-out.png',
    dataAiHint: 'light grid',
    isPremium: false,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
