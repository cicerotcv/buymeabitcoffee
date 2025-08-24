'use server';

import { Coffee } from 'lucide-react';

import { DonationCard } from '@/modules/donation/components/donation-card';
import { DonationPageFooter } from '@/modules/donation/components/donation-page/footer';
import { DonationPageHeader } from '@/modules/donation/components/donation-page/header';
import { DonationPageInstruction } from '@/modules/donation/components/donation-page/instructions';

import { PageContainer } from '@/global/components/page-container';
import { NextPage } from '@/types/next';

type Params = { address: string };
type Query = { identifier?: string };

const DonationPage: NextPage<Params, Query> = async ({
  params,
  searchParams,
}) => {
  const { address } = await params;
  const { identifier } = await searchParams;

  const displayName = identifier || address.slice(0, 8) + '...';

  return (
    <PageContainer>
      <DonationPageHeader displayName={displayName} />

      <main className="px-2 py-8 sm:px-4">
        <div className="container mx-auto max-w-prose space-y-4">
          <div className="text-center">
            <div
              className="bg-primary mx-auto mb-4 flex h-20 w-20 items-center
                justify-center rounded-full"
            >
              <Coffee className="text-primary-foreground h-10 w-10" />
            </div>
            <h1 className="text-foreground mb-2 text-3xl font-bold">
              Support{' '}
              <span className="text-btc">
                {identifier ? identifier : 'this project'}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Send Bitcoin donations to show your appreciation
            </p>
          </div>

          <DonationCard
            address={address}
            identifier={identifier || 'Donation from Buy Me a BitCoffee'}
          />

          <DonationPageInstruction />

          <DonationPageFooter />
        </div>
      </main>
    </PageContainer>
  );
};

export default DonationPage;
