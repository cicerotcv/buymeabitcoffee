import { Geist_Mono, Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';

import { Env } from '@/env';
import { QueryProvider } from '@/global/contexts/query-provider';
import { ThemeProvider } from '@/global/contexts/theme-provider';

import { Toaster } from '$/components/ui/sonner';

import './globals.css';

const siteDescription =
  'Open-source Bitcoin donation platform inspired by Buy me a Coffee. Generate badges, accept donations and share with your community.';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(Env.VercelUrl),
  title: {
    default: 'Buy Me a BitCoffee - Accept Bitcoin Donations',
    template: '%s | Buy Me a BitCoffee',
  },
  description: siteDescription,
  keywords: [
    'bitcoin donations',
    'buy me a coffee bitcoin',
    'bitcoin badge',
    'lightning donations',
    'open source',
    'crypto donations',
  ],
  openGraph: {
    siteName: 'Buy Me a BitCoffee',
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Buy Me a BitCoffee - Accept Bitcoin Donations',
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Me a BitCoffee - Accept Bitcoin Donations',
    description: siteDescription,
  },
  verification: {
    google: '3nggRK22fkg4vb5VG7i8XveFw0AHsPq4HwMP3x0O9SA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${interFont.variable} ${mono.variable} font-sans
          antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
