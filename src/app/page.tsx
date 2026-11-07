import { FaqSection } from '@/modules/lp/components/faq-section';
import { FeaturesSection } from '@/modules/lp/components/features-section';
import { FooterSection } from '@/modules/lp/components/footer-section';
import { GetStartedSection } from '@/modules/lp/components/get-started-section';
import { Header } from '@/modules/lp/components/header';
import { HeroSection } from '@/modules/lp/components/hero-section';
import { HowItWorksSection } from '@/modules/lp/components/how-it-works-section';

import { JsonLd } from '@/global/components/json-ld';
import { PageContainer } from '@/global/components/page-container';
import { HashRule } from '@/global/components/receipt';
import { getHomeJsonLd, getHomeMetadata } from '@/global/config/seo.config';

export const metadata = getHomeMetadata();

const SectionRule = () => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <HashRule />
  </div>
);

function HomePage() {
  return (
    <PageContainer>
      <JsonLd data={getHomeJsonLd()} />
      <Header />
      <main>
        <HeroSection />
        <SectionRule />
        <HowItWorksSection />
        <SectionRule />
        <FeaturesSection />
        <GetStartedSection />
        <FaqSection />
      </main>
      <FooterSection />
    </PageContainer>
  );
}

export default HomePage;
