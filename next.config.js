/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // www -> non-www (fixes GSC indexing both hosts as separate properties).
      // Also configure this at the DNS/hosting layer (e.g. Vercel domain
      // settings) so it's enforced before requests even reach Next.js.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.saladworksmenu.us' }],
        destination: 'https://saladworksmenu.us/:path*',
        permanent: true,
      },
      // Old un-sanitized item slugs (crawled/indexed by Google before the
      // slug generator was fixed to strip "&", "(", ")" and accents) -> the
      // new clean slugs produced by lib/utils.ts `slugify()`.
      { source: "/menu/sophie's", destination: '/menu/sophies', permanent: true },
      { source: '/menu/turkey-jalapeño-crunch-wrap', destination: '/menu/turkey-jalapeno-crunch-wrap', permanent: true },
      { source: '/menu/coke-\\(bottle\\)', destination: '/menu/coke-bottle', permanent: true },
      { source: '/menu/diet-coke-\\(bottle\\)', destination: '/menu/diet-coke-bottle', permanent: true },
      { source: '/menu/sprite-\\(bottle\\)', destination: '/menu/sprite-bottle', permanent: true },
      { source: '/menu/chipotle-chicken-&-bacon', destination: '/menu/chipotle-chicken-and-bacon', permanent: true },
      { source: '/menu/turkey-cheddar-&-bacon', destination: '/menu/turkey-cheddar-and-bacon', permanent: true },
    ]
  }
}

module.exports = nextConfig
