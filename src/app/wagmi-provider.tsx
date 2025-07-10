
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

// Ensure the WalletConnect Project ID is handled correctly, preventing crashes if it's missing.
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  console.warn("WalletConnect Project ID is not defined in .env.local. WalletConnect functionality will be disabled.");
}

const config = createConfig(
  getDefaultConfig({
    // Require that a walletConnectProjectId be provided, but if it's not,
    // an empty string will be used, which will disable WalletConnect.
    walletConnectProjectId: walletConnectProjectId ?? "",

    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },
    
    appName: 'Warpcast Arcade',
    appDescription: 'Your favorite retro games, onchain.',
    appUrl: 'https://warpcast-arcade.xyz',
    appIcon: 'https://warpcast-arcade.xyz/logo.png',
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
