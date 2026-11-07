import type { VariantProps } from 'class-variance-authority';

import { HashRule, Receipt } from '@/global/components/receipt';
import { BitcoinIcon } from '@/global/svg/icons/bitcoin';
import { LightningIcon } from '@/global/svg/icons/lightning';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type cardVariants,
} from '$/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '$/components/ui/tabs';
import { cn } from '$/lib/utils';

import { DonationLightning } from './donation-lightning';
import { DonationOnChain } from './donation-on-chain';

enum AddressType {
  OnChain = 'on-chain',
  Lightning = 'lightning',
}

type Props = {
  onChainAddress?: string;
  lightningAddress?: string;
  identifier: string;
  variant?: VariantProps<typeof cardVariants>['variant'];
  className?: string;
  /** Replays the printing reveal when the receipt mounts. */
  print?: boolean;
};

export const DonationCard = (props: Props) => {
  const addresses = [props.lightningAddress, props.onChainAddress].filter(
    Boolean
  );

  const singleAddress = addresses.length === 1;

  const defaultValue = props.lightningAddress
    ? AddressType.Lightning
    : AddressType.OnChain;

  const variant = props.variant ?? 'receipt';

  const content = (
    <>
      <CardHeader className="gap-3">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">Receipt</span>
          <span className="eyebrow">Bitcoin donation</span>
        </div>
        <CardTitle className="font-heading text-3xl leading-tight font-normal">
          {props.identifier}
        </CardTitle>
        <CardDescription>
          Scan the QR code or copy the address below to send Bitcoin.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <HashRule />

        <Tabs defaultValue={defaultValue} className="gap-4">
          <TabsList className={cn('w-full', { hidden: singleAddress })}>
            <TabsTrigger value={AddressType.Lightning} data-brand="lightning">
              <LightningIcon className="text-lightning" />
              Lightning
            </TabsTrigger>

            <TabsTrigger value={AddressType.OnChain} data-brand="btc">
              <BitcoinIcon className="text-btc" />
              On-chain
            </TabsTrigger>
          </TabsList>

          <TabsContent value={AddressType.Lightning}>
            <DonationLightning
              identifier={props.identifier}
              lightningAddressOrUrl={props.lightningAddress}
            />
          </TabsContent>

          <TabsContent value={AddressType.OnChain}>
            <DonationOnChain
              identifier={props.identifier}
              onChainAddress={props.onChainAddress}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );

  if (variant === 'receipt')
    return (
      <Receipt
        className={props.className}
        paperClassName="sm:[&>*]:px-6"
        print={props.print}
      >
        {content}
      </Receipt>
    );

  return (
    <Card variant={variant} className={props.className}>
      {content}
    </Card>
  );
};
