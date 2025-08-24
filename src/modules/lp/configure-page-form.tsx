'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { validate } from 'bitcoin-address-validation';
import { capitalCase } from 'change-case';
import { ExternalLink, Info } from 'lucide-react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { Env } from '@/env';
import { ButtonLink } from '@/global/components/button-link';
import { TextInput } from '@/global/components/text-input';
import { BadgeStyle } from '@/types/badge';

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '$/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';

import { getDonationPath } from '../crypto/utils/urls';
import { DonationCard } from '../donation/components/donation-card';
import { BadgePreview } from './badge-preview';

const parser = z.object({
  style: z.nativeEnum(BadgeStyle),
  identifier: z.string().min(2).max(100),
  btcAddress: z
    .string()
    .min(42)
    .max(42)
    .refine((value) => validate(value)),
  label: z.string().min(2).max(32).optional().or(z.literal('')),
  content: z.string().min(2).max(32),
});

type Schema = z.infer<typeof parser>;

export const ConfigurePageForm = () => {
  const form = useForm<Schema>({
    defaultValues: {
      style: BadgeStyle.Flat,
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

      <CardContent className="space-y-4">
        <FormProvider {...form}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="identifier">
                Identifier or username{' '}
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-3" />
                  </TooltipTrigger>

                  <TooltipContent className="max-w-prose">
                    This is the identifier or username that will be displayed on
                    the donation page and used as a self note on the
                    donor&apos;s transaction.
                  </TooltipContent>
                </Tooltip>
              </Label>

              <TextInput id="identifier" name="identifier" placeholder="" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Badge Style</Label>

              <Controller
                name="style"
                control={form.control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="for-the-badge" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Style</SelectLabel>
                        <SelectItem value={BadgeStyle.Flat}>
                          {capitalCase(BadgeStyle.Flat)}
                        </SelectItem>
                        <SelectItem value={BadgeStyle.FlatSquare}>
                          {capitalCase(BadgeStyle.FlatSquare)}
                        </SelectItem>
                        <SelectItem value={BadgeStyle.ForTheBadge}>
                          {capitalCase(BadgeStyle.ForTheBadge)}
                        </SelectItem>
                        <SelectItem value={BadgeStyle.Social}>
                          {capitalCase(BadgeStyle.Social)}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <p className="text-muted-foreground text-sm"></p>
            </div>
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
              <Label>Markdown:</Label>

              <BadgePreview
                style={params.style}
                address={params.btcAddress}
                label={params.label}
                content={params.content}
                identifier={params.identifier}
              />
            </div>

            <Label>What others will see:</Label>
            <DonationCard
              address={params.btcAddress}
              identifier={params.identifier}
            />

            <ButtonLink
              href={getDonationPath({
                address: params.btcAddress,
                identifier: params.identifier,
              })}
              className="w-full"
              variant="default"
            >
              See the Donation Page <ExternalLink />
            </ButtonLink>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
