import type { NextConfig } from 'next';

import { Env } from '@/env';
import { getSecurityHeaders } from '@/global/config/security-headers.config';

const params = new URLSearchParams({
  identifier: 'Buy Me a BitCoffee',
  lightning: Env.ExampleLightningAddress,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['img.shields.io'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: getSecurityHeaders(),
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
