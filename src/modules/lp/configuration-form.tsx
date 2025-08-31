'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, Info } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import { Env } from '@/env';
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
import { Label } from '$/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';

import { BadgeCard } from '../badge/components/badge-card';
import { getDonationPath, getDonationUrl } from '../crypto/utils/urls';
import { DonationCard } from '../donation/components/donation-card';
import { parser, Schema } from './configuration-parser';

export const ConfigurationForm = () => {
  const form = useForm<Schema>({
    defaultValues: {
      identifier: 'Buy Me a BitCoffee',
      btcAddress: Env.ExampleBtcAddress,
      content: 'Buy Me a BitCoffee',
      label: 'Donate',
    },
    resolver: zodResolver(parser),
  });

  const [params, setParams] = useState<Schema | null>(() => form.getValues());

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
          <div className="space-y-2">
            <Label htmlFor="identifier">
              Identifier or username{' '}
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-3" />
                </TooltipTrigger>

                <TooltipContent className="max-w-prose">
                  This is the identifier or username that will be displayed on
                  the donation page and used as a self note on the donor&apos;s
                  transaction.
                </TooltipContent>
              </Tooltip>
            </Label>

            <TextInput id="identifier" name="identifier" placeholder="" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="btc-address">
              Bitcoin Address{' '}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="size-3" />
                </TooltipTrigger>
                <TooltipContent>
                  Note: some bitcoin addresses may be case sensitive
                </TooltipContent>
              </Tooltip>
            </Label>

            <TextInput
              id="btc-address"
              placeholder={Env.ExampleBtcAddress}
              {...form.register('btcAddress')}
            />

            <p className="text-muted-foreground text-sm">
              Your Bitcoin wallet address where donations will be sent
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <TextInput
                id="label"
                name="label"
                placeholder="Buy me a BitCoffee"
              />
              <p className="text-muted-foreground text-sm">
                Optional label for your badge (left side), e.g.
                &quot;Donate&quot;.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>

              <TextInput
                id="content"
                name="content"
                placeholder="Buy me a BitCoffee"
              />

              <p className="text-muted-foreground text-sm">
                The right side text for your badge.
              </p>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Generate Badge & Preview
          </Button>
        </FormProvider>

        {params && (
          <div className="bg-accent space-y-4 rounded-md p-4">
            <div className="text-center">
              <p className="mb-2 text-sm font-medium">Your Badge:</p>
            </div>

            <div className="space-y-2">
              <BadgeCard
                address={params.btcAddress}
                label={params.label}
                content={params.content}
                identifier={params.identifier}
              />
            </div>

            <div className="text-center">
              <p className="mb-2 text-sm font-medium">Your Donation Card:</p>
            </div>

            <div className="space-y-2">
              <DonationCard
                address={params.btcAddress}
                identifier={params.identifier}
              />
            </div>

            <div className="flex flex-col gap-2">
              <CopyButton
                variant="outline"
                contentSource={() =>
                  getDonationUrl({
                    address: params.btcAddress,
                    identifier: params.identifier,
                  })
                }
              >
                Copy your Donation Link
              </CopyButton>

              <ButtonLink
                href={getDonationPath({
                  address: params.btcAddress,
                  identifier: params.identifier,
                })}
                className="w-full"
                variant="ghost"
              >
                See the Donation Page <ExternalLink />
              </ButtonLink>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
