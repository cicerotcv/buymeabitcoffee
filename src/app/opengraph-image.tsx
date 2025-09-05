import { ImageResponse } from 'next/og';

import { SvgLogo } from '@/global/svg/project-logo';

export const alt = 'Buy Me a BitCoffee';
export const size = {
  width: 1200,
  height: 800,
};

export const contentType = 'image/png';

export default async function Image() {
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
          textAlign: 'left',
        }}
      >
        <SvgLogo width={660} height={192} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 660,
          }}
        >
          <p
            style={{
              fontSize: 40,
              textAlign: 'center',
              filter: 'saturate(0) brightness(1.5) opacity(0.7)',
            }}
          >
            Open source and built with ❤️ for the Bitcoin community
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
