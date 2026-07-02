import type { Metadata } from 'next';

import { Env } from '@/env';

import { securityHeadersConfig } from './security-headers.config';

export { getSecurityHeaders } from './security-headers.config';

export const seoConfig = {
  siteName: 'Buy Me a BitCoffee',
  shortName: 'BitCoffee',
  siteUrl: Env.VercelUrl,
  lang: 'en',
  title: {
    default: 'Buy Me a BitCoffee | Open-Source Bitcoin Donations',
    template: '%s | Buy Me a BitCoffee',
    home: 'Buy Me a BitCoffee | Open-Source Bitcoin Donations',
  },
  description: {
    default:
      'Open-source Bitcoin donation platform inspired by Buy me a Coffee. Generate badges, accept donations and share with your community.',
    home: 'Open-source Bitcoin donation platform inspired by Buy me a Coffee. Generate shareable badges, integrate with GitHub, and start receiving Bitcoin donations today.',
  },
  keywords: [
    'bitcoin donations',
    'buy me a coffee bitcoin',
    'bitcoin badge',
    'lightning donations',
    'open source',
    'crypto donations',
  ],
  verification: {
    google: '3nggRK22fkg4vb5VG7i8XveFw0AHsPq4HwMP3x0O9SA',
  },
  openGraph: {
    locale: 'en_US',
    type: 'website' as const,
    siteName: 'Buy Me a BitCoffee',
  },
  twitter: {
    card: 'summary_large_image' as const,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  securityHeaders: securityHeadersConfig,
} as const;

export const getDonationDisplayName = (address: string, identifier?: string) =>
  identifier || `${address.slice(0, 8)}...`;

export const getDonationTitle = (displayName: string) =>
  `Support ${displayName}`;

export const getDonationDescription = (displayName: string) =>
  `Send Bitcoin donations to ${displayName}. On-chain and Lightning supported.`;

export function getRootMetadata(): Metadata {
  const {
    title,
    description,
    openGraph,
    twitter,
    verification,
    manifest,
    icons,
  } = seoConfig;

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
      default: title.default,
      template: title.template,
    },
    description: description.default,
    keywords: [...seoConfig.keywords],
    manifest,
    icons: {
      icon: [...icons.icon],
      apple: icons.apple,
    },
    openGraph: {
      siteName: openGraph.siteName,
      type: openGraph.type,
      locale: openGraph.locale,
      url: '/',
      title: title.default,
      description: description.default,
    },
    twitter: {
      card: twitter.card,
      title: title.default,
      description: description.default,
    },
    verification,
  };
}

export function getHomeMetadata(): Metadata {
  const { title, description, openGraph, twitter } = seoConfig;

  return {
    title: { absolute: title.home },
    description: description.home,
    alternates: { canonical: '/' },
    openGraph: {
      type: openGraph.type,
      url: '/',
      title: title.home,
      description: description.home,
    },
    twitter: {
      card: twitter.card,
      title: title.home,
      description: description.home,
    },
  };
}

export function getDonationMetadata(
  address: string,
  identifier?: string
): Metadata {
  const displayName = getDonationDisplayName(address, identifier);
  const title = getDonationTitle(displayName);
  const description = getDonationDescription(displayName);
  const path = `/btc/${address}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: seoConfig.openGraph.type,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title,
      description,
    },
  };
}

export function getHomeJsonLd(): Record<string, unknown> {
  const { siteName, siteUrl, description } = seoConfig;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        description: description.home,
      },
      {
        '@type': 'WebApplication',
        name: siteName,
        url: siteUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        description: description.home,
      },
    ],
  };
}

export function getDonationJsonLd(
  address: string,
  displayName: string
): Record<string, unknown> {
  const description = getDonationDescription(displayName);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: getDonationTitle(displayName),
    description,
    url: `${seoConfig.siteUrl}/btc/${address}`,
  };
}
