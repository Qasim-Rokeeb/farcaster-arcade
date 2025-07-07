'use client';

import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import ConnectWalletButton from './connect-wallet-button';

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
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
