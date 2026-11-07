'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, ReceiptText } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import { ButtonLink } from '@/global/components/button-link';
import { CopyButton } from '@/global/components/copy-button';
import { TextInput } from '@/global/components/text-input';

import { Button } from '$/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';

import { BadgeCard } from '../../badge/components/badge-card';
import { getDonationPath, getDonationUrl } from '../../crypto/utils/urls';
import { DonationCard } from '../../donation/components/donation-card';
import { PreviewParser, PreviewSchema } from '../parsers/preview';

export const PreviewForm = () => {
  const form = useForm<PreviewSchema>({
    defaultValues: {
      identifier: 'Buy Me a BitCoffee',
      btcAddress: '',
      lightningAddressOrUrl: '',
    },
    resolver: zodResolver(PreviewParser),
  });

  const [params, setParams] = useState<PreviewSchema | null>(() =>
    form.getValues()
  );
  // Bumped on every submit so the receipt prints again.
  const [printKey, setPrintKey] = useState(0);

  const handleSubmit = form.handleSubmit((data) => {
    setParams(data);
    setPrintKey((key) => key + 1);
  });

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12">
      <Card className="lg:sticky lg:top-24 lg:col-span-5">
        <CardHeader>
          <CardTitle className="text-lg">Your details</CardTitle>
          <CardDescription>
            Add your wallet address to generate a shareable donation page and
            embeddable badge instantly.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <FormProvider {...form}>
            <TextInput
              {...form.register('identifier')}
              label="Display name"
              info="Shown on your donation page and in the badge. Donors may see it as a payment note."
              placeholder="e.g. Buy Me a BitCoffee"
            />

            <TextInput
              {...form.register('btcAddress')}
              label="Bitcoin Address"
              description="Your Bitcoin wallet address where donations will be sent"
              info="Note: some bitcoin addresses may be case sensitive"
              placeholder="e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
              className="font-mono"
            />

            <TextInput
              {...form.register('lightningAddressOrUrl')}
              label="Lightning Address or URL (optional)"
              description="Your Lightning wallet address where donations will be sent"
              info={
                <span>
                  Note: a Lightning Address is in the format{' '}
                  <code className="font-black">username@domain</code> or a
                  Lightning URL is in the format{' '}
                  <code className="font-black">lnurl1abc123...</code>
                </span>
              }
              placeholder="e.g. username@domain or lnurl1abc123..."
              className="font-mono"
            />

            <Button onClick={handleSubmit} size="lg" className="w-full">
              Print my donation page
            </Button>
          </FormProvider>
        </CardContent>
      </Card>

      <div className="space-y-8 lg:col-span-7">
        {params?.btcAddress ? (
          <>
            <div className="space-y-3">
              <p className="eyebrow text-center">
                Preview: this is what donors will see
              </p>
              <DonationCard
                key={printKey}
                print
                className="mx-auto max-w-md"
                onChainAddress={params.btcAddress}
                lightningAddress={params.lightningAddressOrUrl}
                identifier={params.identifier}
              />
            </div>

            <div className="mx-auto flex max-w-md flex-col gap-2">
              <CopyButton
                contentSource={() =>
                  getDonationUrl({
                    onChain: params.btcAddress,
                    lightning: params.lightningAddressOrUrl,
                    identifier: params.identifier,
                  })
                }
              >
                Copy your donation link
              </CopyButton>

              <ButtonLink
                href={getDonationPath({
                  onChain: params.btcAddress,
                  lightning: params.lightningAddressOrUrl,
                  identifier: params.identifier,
                })}
                className="w-full"
                variant="ghost"
              >
                See the donation page <ExternalLink />
              </ButtonLink>
            </div>

            <BadgeCard
              onChainAddress={params.btcAddress}
              lightningAddressOrUrl={params.lightningAddressOrUrl}
              identifier={params.identifier}
            />
          </>
        ) : (
          <div
            className="border-border-strong text-muted-foreground flex min-h-80
              flex-col items-center justify-center gap-3 rounded-lg border
              border-dashed p-8 text-center"
          >
            <ReceiptText className="size-8" />
            <p className="font-heading text-foreground text-2xl">
              Your receipt prints here.
            </p>
            <p className="max-w-[36ch] text-sm">
              Fill in your Bitcoin address and press print to preview your
              donation page and badge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
