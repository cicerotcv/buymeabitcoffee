import type { Metadata } from 'next';

import { FeaturesSection } from '@/modules/lp/components/features-section';
import { FooterSection } from '@/modules/lp/components/footer-section';
import { GetStartedSection } from '@/modules/lp/components/get-started-section';
import { Header } from '@/modules/lp/components/header';
import { HeroSection } from '@/modules/lp/components/hero-section';

import { Env } from '@/env';
import { JsonLd } from '@/global/components/json-ld';
import { PageContainer } from '@/global/components/page-container';

const homeDescription =
  'Open-source Bitcoin donation platform inspired by Buy me a Coffee. Generate shareable badges, integrate with GitHub, and start receiving Bitcoin donations today.';

export const metadata: Metadata = {
  title: 'Accept Bitcoin Donations',
  description: homeDescription,
  openGraph: {
    title: 'Accept Bitcoin Donations | Buy Me a BitCoffee',
    description: homeDescription,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accept Bitcoin Donations | Buy Me a BitCoffee',
    description: homeDescription,
  },
};

function HomePage() {
  return (
    <PageContainer>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              name: 'Buy Me a BitCoffee',
              url: Env.VercelUrl,
              description: homeDescription,
            },
            {
              '@type': 'WebApplication',
              name: 'Buy Me a BitCoffee',
              url: Env.VercelUrl,
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Any',
              description: homeDescription,
            },
          ],
        }}
      />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GetStartedSection />
      <FooterSection />
    </PageContainer>
  );
}

export default HomePage;
