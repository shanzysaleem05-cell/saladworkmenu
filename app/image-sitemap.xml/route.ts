import { menuData } from '@/data/menuData'

export async function GET() {
  const baseUrl = 'https://saladworksmenu.us'
  const year = new Date().getFullYear()

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>`

  for (const category of menuData) {
    for (const item of category.items) {
      if (item.image) {
        xml += `
    <image:image>
      <image:loc>${baseUrl}${item.image}</image:loc>
      <image:caption>Saladworks ${item.name} - Official Menu Item Image ${year}</image:caption>
      <image:title>Saladworks ${item.name}</image:title>
    </image:image>`
      }
    }
  }

  xml += `
  </url>
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
