import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { blogData } from '@/data/blogData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://saladworksmenu.us'
  const staticDate = '2026-06-01'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: staticDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: staticDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/catering`, lastModified: staticDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: staticDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/nutrition`, lastModified: staticDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/coupons`, lastModified: staticDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: staticDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: staticDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/legal`, lastModified: staticDate, changeFrequency: 'yearly', priority: 0.3 },
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

  const menuPages: MetadataRoute.Sitemap = menuItems.map((item) => ({
    url: `${baseUrl}/menu/${item}`,
    lastModified: staticDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const posts = getAllPosts()
  const mdxBlogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || staticDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const dataBlogPages: MetadataRoute.Sitemap = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || staticDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...menuPages, ...mdxBlogPages, ...dataBlogPages]
}
