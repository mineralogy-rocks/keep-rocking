import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: 'https://api.mineralogy.rocks/sitemap.xml',
    host: 'https://mineralogy.rocks',
  };
}
