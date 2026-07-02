import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Map of 2-letter state codes to our state slugs
const STATE_MAP: Record<string, string> = {
  'CA': 'california',
  'CT': 'connecticut',
  'DC': 'washington-dc',
  'DE': 'delaware',
  'FL': 'florida',
  'IN': 'indiana',
  'KS': 'kansas',
  'MD': 'maryland',
  'MN': 'minnesota',
  'NC': 'north-carolina',
  'NJ': 'new-jersey',
  'NY': 'new-york',
  'PA': 'pennsylvania',
  'TN': 'tennessee',
  'TX': 'texas',
  'VA': 'virginia',
}

export function middleware(req: NextRequest) {
  // Only intercept exactly /menu (not /menu/new-york)
  if (req.nextUrl.pathname === '/menu') {
    // 1. Check for bots (SEO Protection)
    const userAgent = req.headers.get('user-agent') || ''
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent)
    
    // If it's a bot, don't redirect them so they can crawl the national menu
    if (isBot) {
      return NextResponse.next()
    }

    // 2. Try Vercel's Edge standard geo property
    let region = req.geo?.region

    // 2. Try Vercel headers if req.geo is undefined
    if (!region) {
      region = req.headers.get('x-vercel-ip-country-region') || undefined
    }

    if (region && typeof region === 'string') {
      const stateCode = region.toUpperCase()
      const stateSlug = STATE_MAP[stateCode]

      if (stateSlug) {
        // Redirect seamlessly to their local state menu
        const url = req.nextUrl.clone()
        url.pathname = `/menu/${stateSlug}`
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/menu',
}
