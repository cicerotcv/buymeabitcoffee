import type { NextConfig } from 'next';

import { Env } from '@/env';
import {
  apiContentSecurityPolicy,
  getSecurityHeaders,
} from '@/global/config/security-headers.config';

const params = new URLSearchParams({
  identifier: 'Buy Me a BitCoffee',
  lightning: Env.ExampleLightningAddress,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // OG images read their TTFs from disk at request time; ship them with the
  // function bundles.
  outputFileTracingIncludes: {
    '/btc/[address]/og': ['./assets/og/**'],
    '/opengraph-image': ['./assets/og/**'],
  },
  images: {
    domains: ['img.shields.io'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: getSecurityHeaders(),
    },
    {
      // HTML routes get a per-request nonce policy from the middleware.
      source: '/api/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: apiContentSecurityPolicy },
      ],
    },
  ],
  rewrites: async () => [
    {
      source: '/donate',
      destination: `/btc/${Env.ExampleBtcAddress}?${params.toString()}`,
    },
  ],
};

export default nextConfig;
