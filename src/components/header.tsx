
'use client';

import { Gamepad2, Github, Heart } from 'lucide-react';
import Link from 'next/link';
import ConnectWalletButton from './connect-wallet-button';
import PremiumSubscribeButton from './premium-subscribe-button';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Gamepad2 className="h-7 w-7" />
            <span className="font-bold text-xl font-headline">
              Warpcast Arcade
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
                <a href="https://github.com/Qasim-Rokeeb/farcaster-arcade" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Contribute
                </a>
            </Button>
            <PremiumSubscribeButton>
                <Button>
                    <Heart className="mr-2 h-4 w-4" />
                    Sponsor this Project
                </Button>
            </PremiumSubscribeButton>
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
