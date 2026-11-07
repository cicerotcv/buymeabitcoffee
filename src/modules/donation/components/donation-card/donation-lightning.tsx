'use client';

import { useMemo } from 'react';

import { AlertTriangle, Info } from 'lucide-react';

import { LightningUtils } from '@/modules/crypto/utils/lightning';

import { HashRule } from '@/global/components/receipt';
import { LightningIcon } from '@/global/svg/icons/lightning';

import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';

import { LightningAddressInfo } from './address-lightning-info';
import { AddressSlip } from './address-slip';
import { DonationQrCode } from './qr-code';

type Props = {
  lightningAddressOrUrl?: string;
  identifier: string;
};

export const DonationLightning = (props: Props) => {
  const url = useMemo(() => {
    if (!props.lightningAddressOrUrl) return;

    return LightningUtils.fmtAddressUri({
      address: props.lightningAddressOrUrl,
    });
  }, [props.lightningAddressOrUrl]);

  if (!url)
    return (
      <Alert className="text-destructive">
        <AlertTriangle />
        <AlertTitle>No Lightning address provided</AlertTitle>
        <AlertDescription>
          Please provide a valid Lightning address or URL to display the
          donation information.
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="space-y-5">
      <DonationQrCode content={url?.full}>
        <div
          className="bg-lightning absolute top-1/2 left-1/2 flex w-fit
            -translate-1/2 flex-col items-center justify-center rounded-md
            border-3 border-white p-1.5 text-white"
        >
          <LightningIcon className="size-8 text-white" />
        </div>
      </DonationQrCode>

      <AddressSlip
        address={props.lightningAddressOrUrl ?? ''}
        checks={<LightningAddressInfo address={props.lightningAddressOrUrl} />}
        copyContent={() => props.lightningAddressOrUrl || ''}
        walletHref={url.full}
      />

      <HashRule />

      <p className="text-muted-foreground flex gap-2 text-xs">
        <Info className="mt-px size-3.5 shrink-0" />
        Quick amounts are not available for Lightning yet. Send any amount
        you&apos;d like from your wallet.
      </p>
    </div>
  );
};
