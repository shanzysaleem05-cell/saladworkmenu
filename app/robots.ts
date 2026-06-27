import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const commonDisallow = ['/admin/', '/api/', '/private/']
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/sitemap.xml', '/image-sitemap.xml', '/favicon.ico', '/apple-icon.png'],
        disallow: commonDisallow,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: commonDisallow,
      },
    ],
    sitemap: 'https://saladworksmenu.us/sitemap.xml',
    host: 'https://saladworksmenu.us',
  }
}
