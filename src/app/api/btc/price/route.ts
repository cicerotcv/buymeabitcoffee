import { NextRequest, NextResponse } from 'next/server';

import {
  getBlockchainPriceUrl,
  parsePriceQuery,
} from '@/modules/crypto/parsers/price-query';

export const revalidate = 10;

export async function GET(request: NextRequest) {
  const query = parsePriceQuery(request.nextUrl.searchParams);

  if (!query.success)
    return NextResponse.json(
      { error: 'Invalid value parameter' },
      { status: 400 }
    );

  try {
    const response = await fetch(getBlockchainPriceUrl(query.data.value), {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch BTC price' },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch BTC price' },
      { status: 502 }
    );
  }
}
