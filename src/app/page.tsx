'use server';

import { FeaturesSection } from '@/modules/lp/components/features-section';
import { FooterSection } from '@/modules/lp/components/footer-section';
import { GetStartedSection } from '@/modules/lp/components/get-started-section';
import { Header } from '@/modules/lp/components/header';
import { HeroSection } from '@/modules/lp/components/hero-section';

import { PageContainer } from '@/global/components/page-container';

function HomePage() {
  return (
    <PageContainer>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GetStartedSection />
      <FooterSection />
    </PageContainer>
  );
}

export default HomePage;
