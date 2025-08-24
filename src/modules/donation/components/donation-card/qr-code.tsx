'use client';

import { Bitcoin, Loader2 } from 'lucide-react';
import QRCode from 'react-qr-code';

import { Skeleton } from '$/components/ui/skeleton';

type Props = {
  fetching?: boolean;
  pending?: boolean;
  content?: string;
};
export const DonationQrCode = (props: Props) => {
  return (
    <div
      className="relative mx-auto flex w-fit justify-center rounded-md border-4
        p-4"
    >
      <div
        className="border-card absolute top-1/2 -right-1 -left-1 z-0 h-3/4
          -translate-y-1/2 border-x-4"
      />

      <div
        className="border-card absolute -top-1 -bottom-1 left-1/2 z-0 w-3/4
          -translate-x-1/2 border-y-4"
      />

      {(props.pending && props.fetching) || !props.content ? (
        <Skeleton className="size-72" />
      ) : (
        <QRCode
          value={props.content}
          bgColor="#ffffff"
          fgColor="#000000"
          className="size-72 rounded-sm bg-white p-4"
        />
      )}

      <div
        className="bg-btc absolute top-1/2 left-1/2 flex size-16 -translate-1/2
          items-center justify-center rounded-lg border-2 border-white
          text-white"
      >
        {props.fetching ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Bitcoin className="size-8" />
        )}
      </div>
    </div>
  );
};
