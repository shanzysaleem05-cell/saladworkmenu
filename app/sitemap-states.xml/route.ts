import { getStateSlugs, getDataDate } from '@/lib/stateData'

// Sitemap index: one child sitemap per state so indexation can be tracked
// per-state in Search Console.
export async function GET() {
  const baseUrl = 'https://saladworksmenu.us'
  const stateSlugs = getStateSlugs()
  const dataDate = getDataDate()

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  for (const stateSlug of stateSlugs) {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-states/${stateSlug}.xml</loc>
    <lastmod>${dataDate}</lastmod>
  </sitemap>`
  }

  xml += `
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
