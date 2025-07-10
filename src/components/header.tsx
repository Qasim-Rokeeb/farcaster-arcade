'use client';

import { Gamepad2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ConnectWalletButton from './connect-wallet-button';
import { useEffect, useState } from 'react';
import PremiumSubscribeButton from './premium-subscribe-button';

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkPremium = () => setIsPremiumUser(localStorage.getItem('isPremiumUser') === 'true');
    checkPremium();
    
    window.addEventListener('storage', checkPremium);
    window.addEventListener('subscriptionSuccess', checkPremium);

    return () => {
      window.removeEventListener('storage', checkPremium);
      window.removeEventListener('subscriptionSuccess', checkPremium);
    };
  }, []);

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
            {isClient && !isPremiumUser && <PremiumSubscribeButton />}
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
