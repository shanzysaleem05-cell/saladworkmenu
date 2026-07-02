import { getStateSlugs, getStateItemSlugs } from '@/lib/stateData'

function getRandomizedDate(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const offsetDays = (Math.abs(hash) % 2) + 1; // Always 1 or 2 days behind
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split('T')[0];
}

export async function GET() {
  const baseUrl = 'https://saladworksmenu.us'
  const stateSlugs = getStateSlugs()
  
  const allUrls: { url: string; lastModified: string; changefreq: string; priority: number }[] = []

  for (const stateSlug of stateSlugs) {
    allUrls.push({
      url: `${baseUrl}/menu/${stateSlug}`,
      lastModified: getRandomizedDate(stateSlug),
      changefreq: 'daily',
      priority: 0.9,
    })

    const itemSlugs = getStateItemSlugs(stateSlug)
    for (const itemSlug of itemSlugs) {
      allUrls.push({
        url: `${baseUrl}/menu/${stateSlug}/${itemSlug}`,
        lastModified: getRandomizedDate(stateSlug + itemSlug),
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  for (const item of allUrls) {
    xml += `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
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
