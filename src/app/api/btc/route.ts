import { NextRequest, NextResponse } from 'next/server';

import {
  BADGE_TEXT_MAX_LENGTH,
  parseBadgeQuery,
} from '@/modules/badge/parsers/badge-query';
import { getShieldsUrl } from '@/modules/badge/utils/shields';

import { BadgeStyle } from '@/types/badge';

export const runtime = 'edge';
export const revalidate = 86400;

export async function GET(request: NextRequest) {
  try {
    const query = parseBadgeQuery(new URL(request.url).searchParams);

    if (!query.success) {
      return NextResponse.json(
        {
          error: 'Invalid badge parameters',
          validStyles: Object.values(BadgeStyle),
          maxTextLength: BADGE_TEXT_MAX_LENGTH,
        },
        { status: 400 }
      );
    }

    const { label, content, style } = query.data;

    const shieldsUrl = getShieldsUrl({
      content,
      style,
      label,
    });

    const response = await fetch(shieldsUrl, {
      next: {
        revalidate: 86400,
        tags: [`badge-${style}-${label}-${content}`],
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to generate badge' },
        { status: 500 }
      );
    }

    const badge = await response.arrayBuffer();

    return new NextResponse(badge, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control':
          'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Badge API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
