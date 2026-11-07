import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { headers } from 'next/headers';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Viewport } from 'next';

import { NONCE_HEADER } from '@/global/config/security-headers.config';
import { getRootMetadata, seoConfig } from '@/global/config/seo.config';
import { QueryProvider } from '@/global/contexts/query-provider';
import { ThemeProvider } from '@/global/contexts/theme-provider';

import { Toaster } from '$/components/ui/sonner';

import './globals.css';

const sans = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});
const heading = Instrument_Serif({
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
});
const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = getRootMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get(NONCE_HEADER) ?? undefined;

  return (
    <html
      lang={seoConfig.lang}
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${sans.variable} ${heading.variable} ${mono.variable}
          font-sans antialiased`}
      >
        <ThemeProvider nonce={nonce}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
