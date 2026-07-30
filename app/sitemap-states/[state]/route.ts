import { getStateSlugs, getStateItemSlugs, isStateSlug, getDataDate } from '@/lib/stateData'

export async function generateStaticParams() {
  return getStateSlugs().map(slug => ({ state: `${slug}.xml` }))
}

// Per-state sitemap: /sitemap-states/texas.xml etc., referenced by the
// sitemap-states.xml index.
export async function GET(
  _request: Request,
  { params }: { params: { state: string } }
) {
  const stateSlug = params.state.replace(/\.xml$/, '')
  if (!params.state.endsWith('.xml') || !isStateSlug(stateSlug)) {
    return new Response('Not found', { status: 404 })
  }

  const baseUrl = 'https://saladworksmenu.us'
  const dataDate = getDataDate()

  const urls = [
    `${baseUrl}/menu/${stateSlug}`,
    `${baseUrl}/directory/${stateSlug}`,
    ...getStateItemSlugs(stateSlug).map(
      itemSlug => `${baseUrl}/menu/${stateSlug}/${itemSlug}`
    ),
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  for (const url of urls) {
    xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${dataDate}</lastmod>
  </url>`
  }

  xml += `
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
