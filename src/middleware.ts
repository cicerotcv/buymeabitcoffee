import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  buildContentSecurityPolicy,
  NONCE_HEADER,
} from '@/global/config/security-headers.config';
import { seoConfig } from '@/global/config/seo.config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const base = seoConfig.siteUrl.replace(/\/$/, '');
  const canonical = pathname === '/' ? `${base}/` : `${base}${pathname}`;

  const nonce = btoa(crypto.randomUUID());
  const csp = buildContentSecurityPolicy({
    nonce,
    dev: process.env.NODE_ENV !== 'production',
  });

  // Next reads the CSP from the request to put the nonce on its own scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(NONCE_HEADER, nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Link', `<${canonical}>; rel="canonical"`);
  return response;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\..*).*)',
      // Prefetches carry no HTML, so they need neither nonce nor canonical.
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
