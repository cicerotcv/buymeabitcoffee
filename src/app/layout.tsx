import { Geist_Mono, Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Viewport } from 'next';

import { getRootMetadata, seoConfig } from '@/global/config/seo.config';
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
  return (
    <html
      lang={seoConfig.lang}
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
