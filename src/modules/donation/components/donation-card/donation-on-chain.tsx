'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { AlertTriangle } from 'lucide-react';

import { useLiveQuotation } from '@/modules/crypto/hooks/live-quotation';
import { BtcUtils } from '@/modules/crypto/utils/bitcoin';

import { HashRule, LineItem } from '@/global/components/receipt';
import { BitcoinIcon } from '@/global/svg/icons/bitcoin';

import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { Button } from '$/components/ui/button';

import { getAddressInfoSafe } from '../../utils/address-info';
import { AddressInfo } from './address-on-chain-info';
import { AddressSlip } from './address-slip';
import { DonationQrCode } from './qr-code';

const quickAmounts = [5, 10, 25] as const;

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

  if (!url || !props.onChainAddress)
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
    <div className="space-y-5">
      <DonationQrCode
        fetching={query.isFetching}
        pending={query.isPending}
        content={url.full}
      >
        <div
          className="bg-btc absolute top-1/2 left-1/2 flex w-fit -translate-1/2
            flex-col items-center justify-center rounded-md border-3
            border-white p-1.5 text-white"
        >
          <BitcoinIcon className="size-8 text-white" />
        </div>
      </DonationQrCode>

      {!addressInfo.isValid && (
        <Alert variant="warning">
          <AlertTriangle />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            The provided address is not recognized as a valid Bitcoin address.
            Please double-check the address before sending any funds.
          </AlertDescription>
        </Alert>
      )}

      <AddressSlip
        grouped
        address={props.onChainAddress}
        checks={<AddressInfo address={props.onChainAddress} />}
        copyContent={() => url.full}
        walletHref={url.full}
      />

      <HashRule />

      <div className="space-y-3">
        <p className="eyebrow">Quick amounts (USD equivalent)</p>

        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              className="data-[selected=true]:border-btc-ink
                data-[selected=true]:bg-secondary font-mono"
              data-selected={value === amount}
              aria-pressed={value === amount}
              onClick={() => setValue(amount)}
            >
              ${amount}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setValue(undefined)}
            disabled={value === undefined}
          >
            Clear
          </Button>
        </div>

        {value && query.data ? (
          <dl className="text-sm">
            <LineItem
              label={`$${value} in bitcoin`}
              value={`${query.data} BTC`}
            />
          </dl>
        ) : null}

        <p className="text-muted-foreground text-xs">
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
          .
        </p>
      </div>
    </div>
  );
};
