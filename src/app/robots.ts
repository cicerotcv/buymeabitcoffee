import type { MetadataRoute } from 'next';

import { Env } from '@/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/btc/*'],
    },
    sitemap: `${Env.VercelUrl}/sitemap.xml`,
  };
}
