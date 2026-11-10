import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/*?*sort=*',
        '/*?*price=*',
        '/*?*min=*',
        '/*?*max=*',
        '/*?*order=*',
        '/*?*page=*',
        '/*?*filter=*',
      ],
    },
    sitemap: 'https://europropmoney.de/sitemap.xml',
  };
}
