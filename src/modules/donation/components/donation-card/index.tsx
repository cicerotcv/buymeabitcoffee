import { QrCode } from 'lucide-react';

import { BitcoinIcon } from '@/global/svg/icons/bitcoin';
import { LightningIcon } from '@/global/svg/icons/lightning';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
};

export const DonationCard = (props: Props) => {
  const addresses = [props.lightningAddress, props.onChainAddress].filter(
    Boolean
  );

  const singleAddress = addresses.length === 1;

  const defaultValue = props.lightningAddress
    ? AddressType.Lightning
    : AddressType.OnChain;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="size-5" />
          Bitcoin Donation
        </CardTitle>
        <CardDescription>
          Scan the QR code or copy the address below to send Bitcoin
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue={defaultValue} className="gap-4">
          <TabsList
            className={cn('w-full', {
              hidden: singleAddress,
            })}
          >
            <TabsTrigger value={AddressType.Lightning}>
              <LightningIcon className="text-lightning" />
              Lightning
            </TabsTrigger>

            <TabsTrigger value={AddressType.OnChain}>
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
    </Card>
  );
};
