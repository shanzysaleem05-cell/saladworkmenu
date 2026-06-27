import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    sitemap: 'https://saladworksmenu.us/sitemap.xml',
    host: 'https://saladworksmenu.us',
  }
}
