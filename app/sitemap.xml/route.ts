import { blogData } from '@/data/blogData'
import { menuData } from '@/data/menuData'
import { slugify } from '@/lib/utils'
import { getDataDate, getComparableItemSlugs, getStateSlugs, getStateItemSlugs } from '@/lib/stateData'

export async function GET() {
  const baseUrl = 'https://saladworksmenu.us'
  const dataDate = getDataDate()

  const staticUrls = [
    `${baseUrl}`,
    `${baseUrl}/menu`,
    `${baseUrl}/hours`,
    `${baseUrl}/catering`,
    `${baseUrl}/blog`,
    `${baseUrl}/nutrition`,
    `${baseUrl}/coupons`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/privacy-policy`,
    `${baseUrl}/terms-and-conditions`,
    `${baseUrl}/cookies-policy`,
    `${baseUrl}/directory`,
    `${baseUrl}/menu/prices-by-state`,
  ]

  const compareUrls = getComparableItemSlugs().map(
    slug => `${baseUrl}/menu/prices-by-state/${slug}`
  )

  // Legacy flat menu-item pages, generated with the same slugify() used to
  // build the actual routes — no more hand-typed slug list that can drift
  // out of sync with what generateStaticParams() actually builds.
  const menuUrls = menuData.flatMap(category =>
    category.items.map(item => `${baseUrl}/menu/${slugify(item.name)}`)
  )

  // Per-state menu pages and per-state x per-item price pages — these carry
  // the richest, cleanest unique content on the site and were previously
  // missing from the sitemap entirely.
  const stateSlugs = getStateSlugs()
  const stateMenuUrls = stateSlugs.map(slug => `${baseUrl}/menu/${slug}`)
  const stateItemUrls = stateSlugs.flatMap(stateSlug =>
    getStateItemSlugs(stateSlug).map(itemSlug => `${baseUrl}/menu/${stateSlug}/${itemSlug}`)
  )
  const directoryStateUrls = stateSlugs.map(slug => `${baseUrl}/directory/${slug}`)

  // Blog posts carry their own publish date — that is their honest lastmod,
  // independent of when the menu data was refreshed.
  const normalizeDate = (d: string): string => {
    if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10)
    const parsed = new Date(d)
    return isNaN(parsed.getTime()) ? dataDate : parsed.toISOString().slice(0, 10)
  }

  // Only real, rendered posts (data/blogData.ts) go in the sitemap.
  // content/posts/*.mdx are not wired into any renderer yet — submitting
  // those slugs produced soft-404s ("Post not found", HTTP 200) that Google
  // flagged as "Crawled - currently not indexed".
  const blogUrls = new Map<string, string>()
  for (const post of blogData) {
    blogUrls.set(`${baseUrl}/blog/${post.slug}`, normalizeDate(post.date))
  }

  const allUrls: Array<{ url: string; lastmod: string }> = [
    ...[
      ...staticUrls,
      ...compareUrls,
      ...menuUrls,
      ...stateMenuUrls,
      ...stateItemUrls,
      ...directoryStateUrls,
    ].map(url => ({ url, lastmod: dataDate })),
    ...Array.from(blogUrls, ([url, lastmod]) => ({ url, lastmod })),
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  for (const { url, lastmod } of allUrls) {
    xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
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
