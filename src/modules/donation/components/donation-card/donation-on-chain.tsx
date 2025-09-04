'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { AlertTriangle } from 'lucide-react';

import { useLiveQuotation } from '@/modules/crypto/hooks/live-quotation';
import { BtcUtils } from '@/modules/crypto/utils/bitcoin';

import { CopyButton } from '@/global/components/copy-button';
import { BitcoinIcon } from '@/global/svg/icons/bitcoin';

import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { Button } from '$/components/ui/button';

import { getAddressInfoSafe } from '../../utils/address-info';
import { AddressInfo } from './address-on-chain-info';
import { DonationQrCode } from './qr-code';

type Props = {
  onChainAddress?: string;
  identifier: string;
};

export const DonationOnChain = (props: Props) => {
  const [value, setValue] = useState<number>();

  const addressInfo = useMemo(
    () => getAddressInfoSafe(props.onChainAddress),
    [props.onChainAddress]
  );

  const query = useLiveQuotation(value, !!value);

  const url = useMemo(() => {
    if (!props.onChainAddress) return;

    const usdPriceInBtc = query.data;

    return BtcUtils.fmtAddressUri({
      address: props.onChainAddress,
      label: props.identifier,
      value: value ? usdPriceInBtc : undefined,
    });
  }, [value, props.onChainAddress, props.identifier, query.data]);

  if (!url)
    return (
      <Alert className="text-destructive">
        <AlertTriangle />
        <AlertTitle>No Bitcoin address provided</AlertTitle>
        <AlertDescription>
          Please provide a valid Bitcoin on-chain address to display the
          donation information.
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="space-y-4">
      <DonationQrCode
        fetching={query.isFetching}
        pending={query.isPending}
        content={url?.full}
      >
        <div
          className="bg-btc absolute top-1/2 left-1/2 flex w-fit -translate-1/2
            flex-col items-center justify-center rounded-md border-3
            border-white p-2 text-white"
        >
          <BitcoinIcon className="size-10 text-white" />
        </div>
      </DonationQrCode>

      {!addressInfo.isValid && (
        <Alert className="text-btc bg-btc/10">
          <AlertTriangle />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            The provided address is not recognized as a valid Bitcoin address.
            Please double-check the address before sending any funds.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <p className="text-foreground text-sm font-medium">Address:</p>

        <div className="flex flex-col gap-2">
          <AddressInfo address={props.onChainAddress} />

          <div
            className="bg-muted text-muted-foreground flex-1 rounded-md p-3
              font-mono text-xs break-all"
          >
            {url?.format}
            <span className="text-btc font-semibold">{url?.address}</span>
            {url?.query}
          </div>

          <CopyButton
            size="sm"
            variant="outline"
            contentSource={() => url?.full || ''}
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
          These are suggested amounts. You can send any amount you&apos;d like.
          The prices come from{' '}
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
    </div>
  );
};
