'use client';

import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface PlaceholderGameProps {
  gameName: string;
}

export default function PlaceholderGame({ gameName }: PlaceholderGameProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-muted/50 rounded-lg text-muted-foreground p-8 text-center">
      <Gamepad2 className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-foreground">{gameName}</h2>
      <p>This game is coming soon!</p>
      <p className="text-sm mt-4">Stay tuned for more arcade fun.</p>
    </div>
  );
}
