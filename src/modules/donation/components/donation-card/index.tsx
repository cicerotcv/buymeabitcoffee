'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { AlertTriangle, QrCode } from 'lucide-react';

import { useLiveQuotation } from '@/modules/crypto/hooks/live-quotation';
import { fmtBtcAddress } from '@/modules/crypto/utils/btc-address.fmt';

import { CopyButton } from '@/global/components/copy-button';

import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { Button } from '$/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';
import { Label } from '$/components/ui/label';

import { getAddressInfoSafe } from '../../utils/address-info';
import { AddressInfo } from './address-verification';
import { DonationQrCode } from './qr-code';

type Props = {
  address: string;
  identifier: string;
};

export const DonationCard = (props: Props) => {
  const [value, setValue] = useState<number>();

  const addressInfo = useMemo(
    () => getAddressInfoSafe(props.address),
    [props.address]
  );

  const query = useLiveQuotation(value, !!value);

  const url = useMemo(() => {
    const usdPriceInBtc = query.data;

    return fmtBtcAddress({
      address: props.address,
      label: props.identifier,
      value: value ? usdPriceInBtc : undefined,
    });
  }, [value, props.address, props.identifier, query.data]);

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

        {!addressInfo.isValid && (
          <Alert className="bg-orange-600/10 text-orange-500">
            <AlertTriangle />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              The provided address is not recognized as a valid Bitcoin address.
              Please double-check the address before sending any funds.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">
            Address:
          </Label>

          <div className="flex flex-col gap-2">
            <AddressInfo address={props.address} />

            <div
              className="bg-muted text-muted-foreground flex-1 rounded-md p-3
                font-mono text-xs break-all"
            >
              {url.protocol}
              <span className="text-btc font-semibold">{url.pathname}</span>
              {url.search}
            </div>

            <CopyButton
              size="sm"
              variant="outline"
              contentSource={() => url.href}
            >
              Copy
            </CopyButton>
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
              disabled={value === undefined}
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
