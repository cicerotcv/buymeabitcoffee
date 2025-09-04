'use client';

import { PropsWithChildren } from 'react';

import { QrcodeCanvas } from 'react-qrcode-pretty';

type Props = {
  fetching?: boolean;
  pending?: boolean;
  content?: string;
};

export const DonationQrCode = (props: PropsWithChildren<Props>) => {
  return (
    <div
      className="relative mx-auto flex aspect-square size-72 w-fit max-w-full
        justify-center border-4 p-4"
    >
      <div
        className="border-card absolute top-1/2 -right-1.25 -left-1.25 z-0 h-3/4
          -translate-y-1/2 border-x-6"
      />

      <div
        className="border-card absolute -top-1.25 -bottom-1.25 left-1/2 z-0
          w-3/4 -translate-x-1/2 border-y-6"
      />

      <QrcodeCanvas
        value={props.content || ''}
        padding={24}
        internalProps={{
          className:
            'group data-[fetching=true]:opacity-80 bg-white rounded-md transition-all',
          ['data-fetching' as string]: props.fetching,
        }}
        variant={{
          eyes: 'fluid',
          body: 'dots',
        }}
        color={{
          eyes: 'black',
          body: 'black',
        }}
        bgRounded
        level="Q"
        bgColor="white"
      />

      {props.children}
    </div>
  );
};
