import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Video',
          'Googlebot-News',
          'Google-Extended',
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'PerplexityBot',
          'YouBot',
          'Bingbot',
          'BingPreview',
          'DuckDuckBot',
          'Applebot',
          'facebookexternalhit',
          'LinkedInBot',
          'Twitterbot',
        ],
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/studio/'],
      },
    ],
    sitemap: 'https://saladworksmenu.us/sitemap.xml',
    host: 'https://saladworksmenu.us',
  }
}
