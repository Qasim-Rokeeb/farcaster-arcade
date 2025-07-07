import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Warpcast Arcade',
  description: 'An interactive Warpcast MiniApp offering a curated collection of classic games.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className={cn('font-body antialiased h-full flex flex-col')}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
