import type { NextConfig } from 'next';

import { Env } from '@/env';

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
  rewrites: async () => [
    {
      source: '/donate',
      destination: `/btc/${Env.ExampleBtcAddress}?${params.toString()}`,
    },
  ],
};

export default nextConfig;
