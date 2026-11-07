import { ImageResponse } from 'next/og';

import { OgEm, OgLayout } from '@/modules/og/og-layout';
import { OgReceipt } from '@/modules/og/og-receipt';
import { getOgFonts, OG_SIZE } from '@/modules/og/og-theme';

import { Env } from '@/env';

export const alt =
  'Buy Me a BitCoffee: tips in bitcoin, straight to your wallet.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <OgLayout
        eyebrow="Open source · On-chain + Lightning"
        headlineSize={80}
        headline={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
              Tips in bitcoin,
            </div>
            <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
              <OgEm>straight</OgEm>
              {/* Satori drops inline spaces between flex items; use a spacer. */}
              <div style={{ width: 20, flexShrink: 0 }} />
              <span>to your wallet.</span>
            </div>
          </div>
        }
        lead="Donation pages and README badges. No signup, no custody, no platform fees."
        receipt={
          <OgReceipt
            eyebrowRight="On-chain"
            title="Buy Me a BitCoffee"
            address={Env.ExampleBtcAddress}
            rows={[
              { label: 'Custody', value: 'none' },
              { label: 'Platform fee', value: '0' },
              { label: 'Signup', value: 'none' },
            ]}
          />
        }
      />
    ),
    { ...size, fonts: await getOgFonts() }
  );
}
