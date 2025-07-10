
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig } from 'connectkit';

// This will be read from your .env.local file
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

if (!walletConnectProjectId) {
  console.error("Warning: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will be disabled.");
}

if (!alchemyId) {
    console.error("Warning: NEXT_PUBLIC_ALCHEMY_ID is not set. Blockchain connections will fail.");
}

const config = createConfig(
  getDefaultConfig({
    // Your WalletConnect Project ID
    walletConnectProjectId: walletConnectProjectId || "",

    // chains supported by your app
    chains: [base, mainnet, sepolia],

    // Transports for each chain
    transports: {
      // RPC URL for each chain
      [base.id]: http(
        `https://base-mainnet.g.alchemy.com/v2/${alchemyId}`
      ),
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`
      ),
       [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`
      ),
    },

    // Required App Info
    appName: 'Warpcast Arcade',
    appDescription: 'Your favorite retro games, onchain.',
    appUrl: 'https://warpcast-arcade.xyz', // your app's url
    appIcon: 'https://warpcast-arcade.xyz/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
