
'use client';

import { Gamepad2, Github } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Gamepad2 className="h-7 w-7" />
            <span className="font-bold text-lg md:text-xl font-headline hidden sm:inline">
              Warpcast Arcade
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="icon" className="h-9 w-9 md:w-auto md:px-4 md:py-2">
                    <a href="https://github.com/Qasim-Rokeeb/farcaster-arcade" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      <span className="hidden md:inline ml-2">Contribute</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="md:hidden">
                  <p>Contribute on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
