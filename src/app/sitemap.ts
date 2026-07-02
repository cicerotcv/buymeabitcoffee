import type { MetadataRoute } from 'next';

import { seoConfig } from '@/global/config/seo.config';

export const contentType = 'application/xml';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${seoConfig.siteUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
