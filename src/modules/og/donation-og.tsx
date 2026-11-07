import { ImageResponse } from 'next/og';

import { OgEm, OgLayout } from './og-layout';
import { OgReceipt } from './og-receipt';
import { getOgFonts, OG_SIZE } from './og-theme';

type Params = {
  address: string;
  identifier?: string;
  lightning?: string;
};

const NAME_MAX = 48;
// Real addresses top out at 62 chars (taproot); longer input is not an address.
const ADDRESS_MAX = 64;

/** Shrinks the headline as the name grows, so it stays within three lines. */
const headlineSize = (name: string) => {
  if (name.length <= 14) return 92;
  if (name.length <= 24) return 78;
  if (name.length <= 36) return 64;
  return 54;
};

/** Path params arrive percent-encoded; malformed input is shown as is. */
const decode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

/** Social card for a donation page; inputs are already parsed by the caller. */
export async function renderDonationOg({
  address: rawAddress,
  identifier,
  lightning,
}: Params) {
  const address = truncate(decode(rawAddress), ADDRESS_MAX);
  const name = truncate(identifier || `${address.slice(0, 8)}…`, NAME_MAX);
  // The title formula ends with a period, unless the name already trails off.
  const title = name.endsWith('…') ? name : `${name}.`;

  return new ImageResponse(
    (
      <OgLayout
        eyebrow="Bitcoin donation"
        headlineSize={headlineSize(name)}
        headline={
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 18 }}>
            <span>Support</span>
            <OgEm>{title}</OgEm>
          </div>
        }
        lead={
          lightning
            ? 'Scan or copy, on-chain or Lightning. Straight to their wallet.'
            : 'Scan or copy the address. Straight to their wallet.'
        }
        receipt={
          <OgReceipt
            eyebrowRight={lightning ? 'On-chain + LN' : 'On-chain'}
            address={address}
            rows={[
              { label: 'Custody', value: 'none' },
              { label: 'Platform fee', value: '0' },
              { label: 'Signup', value: 'none' },
            ]}
          />
        }
      />
    ),
    {
      ...OG_SIZE,
      fonts: await getOgFonts(),
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    }
  );
}
