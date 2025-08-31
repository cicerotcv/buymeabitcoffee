import { ImageResponse } from 'next/og';

import { SvgLogo } from '@/global/components/logo';

export const alt = 'Buy Me a BitCoffee';
export const size = {
  width: 300,
  height: 200,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#1d293d',
          color: '#f7931a',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SvgLogo />
      </div>
    ),
    {
      ...size,
    }
  );
}
