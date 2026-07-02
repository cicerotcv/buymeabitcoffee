import { FaqSection } from '@/modules/lp/components/faq-section';
import { FeaturesSection } from '@/modules/lp/components/features-section';
import { FooterSection } from '@/modules/lp/components/footer-section';
import { GetStartedSection } from '@/modules/lp/components/get-started-section';
import { Header } from '@/modules/lp/components/header';
import { HeroSection } from '@/modules/lp/components/hero-section';
import { HowItWorksSection } from '@/modules/lp/components/how-it-works-section';

import { JsonLd } from '@/global/components/json-ld';
import { PageContainer } from '@/global/components/page-container';
import { getHomeJsonLd, getHomeMetadata } from '@/global/config/seo.config';

export const metadata = getHomeMetadata();

function HomePage() {
  return (
    <PageContainer>
      <JsonLd data={getHomeJsonLd()} />
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <GetStartedSection />
      <FaqSection />
      <FooterSection />
    </PageContainer>
  );
}

export default HomePage;
