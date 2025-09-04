'use client';

import { useMemo } from 'react';

import { AlertCircle, AlertTriangle } from 'lucide-react';

import { LightningUtils } from '@/modules/crypto/utils/lightning';

import { CopyButton } from '@/global/components/copy-button';
import { LightningIcon } from '@/global/svg/icons/lightning';

import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';

import { LightningAddressInfo } from './address-lightning-info';
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
    <div className="space-y-4">
      <DonationQrCode content={url?.full}>
        <div
          className="bg-lightning absolute top-1/2 left-1/2 flex w-fit
            -translate-1/2 flex-col items-center justify-center rounded-md
            border-3 border-white p-2 text-white"
        >
          <LightningIcon className="size-10 text-white" />
        </div>
      </DonationQrCode>

      <div className="space-y-2">
        <p className="text-foreground text-sm font-medium">Address:</p>

        <div className="flex flex-col gap-2">
          <LightningAddressInfo address={props.lightningAddressOrUrl} />

          <div
            className="bg-muted text-muted-foreground flex-1 rounded-md p-3
              font-mono text-xs break-all"
          >
            {url?.format}
            <span className="text-lightning font-semibold">{url?.address}</span>
            {url?.query}
          </div>

          <CopyButton
            size="sm"
            variant="outline"
            contentSource={() => props.lightningAddressOrUrl || ''}
          >
            Copy
          </CopyButton>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-foreground text-sm font-medium">
          Quick amounts (USD equivalent):
        </p>

        <Alert className="text-lightning bg-lightning/10">
          <AlertCircle />
          <AlertTitle>Quick amounts is not available</AlertTitle>
          <AlertDescription>
            Quick amounts is not available for Lightning donations at the
            moment. You can send any amount you&apos;d like using your wallet.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
