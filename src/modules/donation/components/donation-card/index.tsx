'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { Check, Copy, QrCode } from 'lucide-react';
import { toast } from 'sonner';

import { useLiveQuotation } from '@/modules/crypto/hooks/live-quotation';
import { fmtBtcAddress } from '@/modules/crypto/utils/btc-address.fmt';

import { Button } from '$/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';
import { Label } from '$/components/ui/label';

import { AddressVerification } from './address-verification';
import { DonationQrCode } from './qr-code';

type Props = {
  address: string;
  identifier: string;
};

export const DonationCard = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const [value, setValue] = useState<number>();

  const query = useLiveQuotation(value, !!value);

  const url = useMemo(() => {
    const usdPriceInBtc = query.data;

    return fmtBtcAddress({
      address: props.address,
      label: props.identifier,
      value: value ? usdPriceInBtc : undefined,
    });
  }, [value, props.address, props.identifier, query.data]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(url.href);
      setCopied(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

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
        <DonationQrCode
          fetching={query.isFetching}
          pending={query.isPending}
          content={url.href}
        />

        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">
            Address:
          </Label>

          <div className="flex flex-col gap-2">
            <AddressVerification address={props.address} />

            <div
              className="bg-muted text-muted-foreground flex-1 rounded-md p-3
                font-mono text-xs break-all"
            >
              {url.protocol}
              <span className="text-btc font-semibold">{url.pathname}</span>
              {url.search}
            </div>

            <Button size="sm" variant="outline" onClick={copyAddress}>
              Copy
              {copied ? (
                <Check className="text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-foreground text-sm font-medium">
            Quick amounts (USD equivalent):
          </p>

          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="data-[selected=true]:border-btc! text-sm"
              data-selected={value === 5}
              onClick={() => setValue(5)}
            >
              $ 5
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="data-[selected=true]:border-btc! text-sm"
              data-selected={value === 10}
              onClick={() => setValue(10)}
            >
              $ 10
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="data-[selected=true]:border-btc! text-sm"
              data-selected={value === 25}
              onClick={() => setValue(25)}
            >
              $ 25
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={() => setValue(undefined)}
            >
              Clear
            </Button>
          </div>

          <p className="text-muted-foreground text-center text-xs">
            These are suggested amounts. You can send any amount you&apos;d
            like. The prices come from{' '}
            <Link
              href="https://www.blockchain.com/explorer/assets/BTC"
              className="hover:text-foreground underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blockchain.com
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
