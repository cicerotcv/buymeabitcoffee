import { Geist_Mono, Inter } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { Env } from '@/env';
import { QueryProvider } from '@/global/contexts/query-provider';
import { ThemeProvider } from '@/global/contexts/theme-provider';

import { Toaster } from '$/components/ui/sonner';

import './globals.css';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Buy me a BitCoffee - Accept Bitcoin Donations',
  description:
    'Open-source Bitcoin donation platform inspired by Buy me a Coffee. Generate badges, accept donations, and integrate with GitHub.',
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${mono.variable} font-sans
          antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors />
        </ThemeProvider>
        <SpeedInsights debug={!Env.Prod} />
      </body>
    </html>
  );
}

export default RootLayout;
