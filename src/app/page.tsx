'use server';

import { FeaturesSection } from '@/modules/lp/features-section';
import { FooterSection } from '@/modules/lp/footer-section';
import { GetStartedSection } from '@/modules/lp/get-started-section';
import { Header } from '@/modules/lp/header';
import { HeroSection } from '@/modules/lp/hero-section';

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
