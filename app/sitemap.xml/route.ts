import { getAllPosts } from '@/lib/blog'
import { blogData } from '@/data/blogData'

export async function GET() {
  const baseUrl = 'https://saladworksmenu.us'
  const staticDate = '2026-07-01'

  const staticUrls = [
    { url: `${baseUrl}`, lastModified: staticDate, changefreq: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: staticDate, changefreq: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/hours`, lastModified: staticDate, changefreq: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/catering`, lastModified: staticDate, changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: staticDate, changefreq: 'daily', priority: 0.8 },
    { url: `${baseUrl}/nutrition`, lastModified: staticDate, changefreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/coupons`, lastModified: staticDate, changefreq: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: staticDate, changefreq: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: staticDate, changefreq: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/legal`, lastModified: staticDate, changefreq: 'yearly', priority: 0.3 },
  ]

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

  const menuUrls = menuItems.map(item => ({
    url: `${baseUrl}/menu/${item}`,
    lastModified: staticDate,
    changefreq: 'monthly',
    priority: 0.6,
  }))

  const posts = getAllPosts()
  const mdxBlogUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || staticDate,
    changefreq: 'monthly',
    priority: 0.7,
  }))

  const dataBlogUrls = blogData.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || staticDate,
    changefreq: 'monthly',
    priority: 0.7,
  }))

  const allUrls = [...staticUrls, ...menuUrls, ...mdxBlogUrls, ...dataBlogUrls]

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
