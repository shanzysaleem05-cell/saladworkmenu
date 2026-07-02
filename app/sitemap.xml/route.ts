import { getAllPosts } from '@/lib/blog'
import { blogData } from '@/data/blogData'
import { getDataDate, getComparableItemSlugs } from '@/lib/stateData'

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
    `${baseUrl}/legal`,
    `${baseUrl}/directory`,
    `${baseUrl}/menu/prices-by-state`,
  ]

  const compareUrls = getComparableItemSlugs().map(
    slug => `${baseUrl}/menu/prices-by-state/${slug}`
  )

  const menuItems = [
    'hot-honey-chicken-bowl', 'sweet-chili-shrimp-bowl', 'fire-grilled-steak-bowl',
    'grilled-chicken-caesar', 'avocado-cobb', 'fuji-apple-crunch', 'sophies',
    'mediterranean-chicken', 'southwest-chipotle-ranch', 'steakhouse-salad',
    'buffalo-chicken', 'chipotle-chicken-and-bacon', 'bently', 'tofu-superfood',
    'chicken-pesto', 'asian-crispy-chicken', 'southwest-chicken-caesar',
    'smoky-bbq-crispy-chicken', 'grilled-chicken-caesar-wrap', 'buffalo-bleu-wrap',
    'black-blue-grilled-wrap', 'bently-wrap', 'turkey-jalapeno-crunch-wrap',
    'mediterranean-chicken-wrap', 'tofu-superfood-wrap', 'roasted-turkey-club',
    'cali-chicken-grilled-wrap', 'buffalo-chicken-grilled-wrap', 'turkey-cheddar-and-bacon',
    'steak-cheddar-melt', 'grilled-cheese', 'broccoli-cheddar-soup', 'chicken-noodle-soup',
    'soup-of-the-day', 'kids-bento-box', 'kids-create-your-own-salad', 'kids-grilled-cheese',
    'kids-grilled-chicken-quesadilla', 'chocolate-chip-cookie', 'chocolate-fudge-brownie',
    'crispy-rice-marshmallow-treat', 'chips', 'extra-roll', '16oz-dressing',
    'tractor-fountain-drink', 'tractor-gallon-pouch', 'bottled-water', 'coke-bottle',
    'diet-coke-bottle', 'sprite-bottle', 'half-create-your-own', 'half-premium-salad',
    'half-signature-salad', 'half-melt', 'soup', 'wrap-or-grilled-wrap'
  ]

  const menuUrls = menuItems.map(item => `${baseUrl}/menu/${item}`)

  // Blog posts carry their own publish date — that is their honest lastmod,
  // independent of when the menu data was refreshed.
  const normalizeDate = (d: string): string => {
    if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10)
    const parsed = new Date(d)
    return isNaN(parsed.getTime()) ? dataDate : parsed.toISOString().slice(0, 10)
  }

  const blogUrls = new Map<string, string>()
  for (const post of getAllPosts()) {
    blogUrls.set(`${baseUrl}/blog/${post.slug}`, normalizeDate(post.date))
  }
  for (const post of blogData) {
    const url = `${baseUrl}/blog/${post.slug}`
    if (!blogUrls.has(url)) blogUrls.set(url, normalizeDate(post.date))
  }

  const allUrls: Array<{ url: string; lastmod: string }> = [
    ...[...staticUrls, ...compareUrls, ...menuUrls].map(url => ({ url, lastmod: dataDate })),
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
