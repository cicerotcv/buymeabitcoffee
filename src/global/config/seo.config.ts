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
    default: 'Buy Me a BitCoffee | Bitcoin Donation Pages & README Badges',
    template: '%s | Buy Me a BitCoffee',
    home: 'Buy Me a BitCoffee | Bitcoin Donation Pages & README Badges',
  },
  description: {
    default:
      'Open-source Bitcoin donation platform inspired by Buy Me a Coffee. Generate badges, accept donations and share with your community.',
    home: 'Create a free Bitcoin donation page with QR codes, Lightning support, and embeddable badges. No signup. Direct to your wallet. Open source.',
  },
  keywords: [
    'bitcoin donations',
    'buy me a coffee bitcoin',
    'bitcoin badge',
    'lightning donations',
    'open source',
    'crypto donations',
    'bitcoin qr code donations',
    'github donation badge',
    'lightning address donations',
    'self-custody donations',
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

export const faqItems = [
  {
    question: 'Do you hold my funds?',
    answer:
      'No. Donations go directly to the address you provide. We never touch your sats.',
  },
  {
    question: 'Is Lightning required?',
    answer:
      'No. On-chain only works fine; Lightning is optional for faster, lower-fee donations.',
  },
  {
    question: 'Do you store my data?',
    answer:
      'No. Pages are generated client-side from your inputs. Nothing is saved on our servers.',
  },
  {
    question: 'Are there platform fees?',
    answer:
      'No. Standard Bitcoin network fees still apply when donors send on-chain.',
  },
  {
    question: 'How do badges work?',
    answer:
      'Copy the Markdown or HTML snippet into your README or website. The badge links to your donation page.',
  },
] as const;

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
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
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
