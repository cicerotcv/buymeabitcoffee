'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink } from 'lucide-react';
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
import { Separator } from '$/components/ui/separator';

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

  const handleSubmit = form.handleSubmit(
    (data) => {
      setParams(data);
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Create Your Donation Page
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details below to generate a shareable donation page and
          badge
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-2 sm:px-4">
        <FormProvider {...form}>
          <TextInput
            {...form.register('identifier')}
            label="Identifier or username"
            info="This is the identifier or username that will be displayed on the donation page and used as a self note on the donor's transaction."
            placeholder="e.g. Buy Me a BitCoffee"
          />

          <TextInput
            {...form.register('btcAddress')}
            label="Bitcoin Address"
            description="Your Bitcoin wallet address where donations will be sent"
            info="Note: some bitcoin addresses may be case sensitive"
            placeholder="e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
          />

          <TextInput
            {...form.register('lightningAddressOrUrl')}
            label="Lightning Address or URL"
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
          />

          <Button onClick={handleSubmit} className="w-full">
            Generate Preview
          </Button>
        </FormProvider>

        {params?.btcAddress && (
          <div className="bg-accent space-y-4 rounded-md p-4">
            <div className="text-center">
              <p className="mb-2 text-sm font-medium">Your Donation Card:</p>
            </div>

            <div className="space-y-2">
              <DonationCard
                onChainAddress={params.btcAddress}
                lightningAddress={params.lightningAddressOrUrl}
                identifier={params.identifier}
              />
            </div>

            <div className="flex flex-col gap-2">
              <CopyButton
                variant="outline"
                contentSource={() =>
                  getDonationUrl({
                    onChain: params.btcAddress,
                    lightning: params.lightningAddressOrUrl,
                    identifier: params.identifier,
                  })
                }
              >
                Copy your Donation Link
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
                See the Donation Page <ExternalLink />
              </ButtonLink>
            </div>

            <Separator />

            <div className="space-y-2">
              <BadgeCard
                onChainAddress={params.btcAddress}
                lightningAddressOrUrl={params.lightningAddressOrUrl}
                identifier={params.identifier}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
