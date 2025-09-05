import type { MetadataRoute } from 'next';

import { Env } from '@/env';

export const contentType = 'application/xml';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${Env.VercelUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${Env.VercelUrl}/#features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${Env.VercelUrl}/#get-started`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${Env.VercelUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ];
}
