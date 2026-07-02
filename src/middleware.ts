import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { seoConfig } from '@/global/config/seo.config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const base = seoConfig.siteUrl.replace(/\/$/, '');
  const canonical = pathname === '/' ? `${base}/` : `${base}${pathname}`;

  const response = NextResponse.next();
  response.headers.set('Link', `<${canonical}>; rel="canonical"`);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\..*).*)',
  ],
};
