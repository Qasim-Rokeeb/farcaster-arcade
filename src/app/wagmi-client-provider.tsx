
'use client';

import React, { useState, useEffect } from 'react';
import { ConnectKitProvider } from 'connectkit';

export default function WagmiClientProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <ConnectKitProvider theme="retro">
      {children}
    </ConnectKitProvider>
  );
}
