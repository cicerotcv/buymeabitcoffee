import { NextRequest } from 'next/server';

import { parseDonationQuery } from '@/modules/donation/parsers/donation-query';
import { renderDonationOg } from '@/modules/og/donation-og';

// A route handler instead of opengraph-image.tsx: metadata image files do not
// receive searchParams, and the card shows the identifier from the query.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  const query = parseDonationQuery(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  return renderDonationOg({ address, ...query });
}
