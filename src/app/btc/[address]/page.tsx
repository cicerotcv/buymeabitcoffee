import { Suspense } from 'react';

import { headers } from 'next/headers';

import type { Metadata } from 'next';

import { DonationCard } from '@/modules/donation/components/donation-card';
import { DonationPageFooter } from '@/modules/donation/components/donation-page/footer';
import { DonationPageHeader } from '@/modules/donation/components/donation-page/header';
import { DonationPageInstruction } from '@/modules/donation/components/donation-page/instructions';
import { parseDonationQuery } from '@/modules/donation/parsers/donation-query';

import { JsonLd } from '@/global/components/json-ld';
import { PageContainer } from '@/global/components/page-container';
import { NONCE_HEADER } from '@/global/config/security-headers.config';
import {
  getDonationDisplayName,
  getDonationJsonLd,
  getDonationMetadata,
  seoConfig,
} from '@/global/config/seo.config';
import { NextPage } from '@/types/next';

import { Skeleton } from '$/components/ui/skeleton';

type Params = { address: string };
type Query = { identifier?: string; lightning?: string };

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Query>;
}): Promise<Metadata> {
  const { address } = await params;
  const { identifier, lightning } = parseDonationQuery(await searchParams);

  return getDonationMetadata(address, identifier, lightning);
}

const DonationPage: NextPage<Params, Query> = async ({
  params,
  searchParams,
}) => {
  const { address } = await params;
  const { identifier, lightning } = parseDonationQuery(await searchParams);

  const displayName = getDonationDisplayName(address, identifier);
  const nonce = (await headers()).get(NONCE_HEADER) ?? undefined;

  return (
    <PageContainer>
      <JsonLd data={getDonationJsonLd(address, displayName)} nonce={nonce} />
      <DonationPageHeader />

      <main className="px-4 pt-12 pb-6 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-md space-y-12">
          <div className="text-center">
            <h1
              className="font-heading [&_em]:text-btc-ink
                text-[clamp(2.5rem,8vw,3.5rem)] leading-[1.05] [&_em]:italic"
            >
              Support <em>{identifier ? identifier : 'this project'}</em>.
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Send Bitcoin donations to show your appreciation.
            </p>
          </div>

          <Suspense fallback={<Skeleton className="aspect-[2/3] w-full" />}>
            <DonationCard
              onChainAddress={address}
              lightningAddress={lightning}
              identifier={identifier || seoConfig.siteName}
            />
          </Suspense>

          <DonationPageInstruction />

          <DonationPageFooter />
        </div>
      </main>
    </PageContainer>
  );
};

export default DonationPage;
