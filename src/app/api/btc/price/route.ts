import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get('value') ?? '1';

  try {
    const response = await fetch(
      `https://blockchain.info/tobtc?currency=USD&value=${value}`,
      { next: { revalidate: 10 } }
    );

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
