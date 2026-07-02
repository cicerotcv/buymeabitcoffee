import { ImageResponse } from 'next/og';

import { SvgLogo } from '@/global/svg/project-logo';

export const alt = 'Buy Me a BitCoffee';
export const size = {
  width: 1200,
  height: 800,
};

export const contentType = 'image/png';

type Props = {
  params: Promise<{ address: string }>;
  searchParams: Promise<{ identifier?: string }>;
};

export default async function Image({ params, searchParams }: Props) {
  const { address } = await params;
  const { identifier } = await searchParams;
  const name = identifier || `${address.slice(0, 8)}...`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #1d293d 0%, black 100%)',
          color: '#f7931a',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <SvgLogo width={660} height={192} />
        <p
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginTop: 32,
            color: '#ffffff',
          }}
        >
          Support {name}
        </p>
        <p
          style={{
            fontSize: 32,
            marginTop: 16,
            filter: 'saturate(0) brightness(1.5) opacity(0.7)',
          }}
        >
          Send Bitcoin donations on-chain or via Lightning
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
