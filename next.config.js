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
      { source: "/menu/sophie's", destination: '/menu/sophies', permanent: true },
      { source: '/menu/turkey-jalapeño', destination: '/menu/turkey-jalapeno', permanent: true },
      { source: '/menu/coke-\\(bottle\\)', destination: '/menu/coke-bottle', permanent: true },
      { source: '/menu/diet-coke-\\(bottle\\)', destination: '/menu/diet-coke-bottle', permanent: true },
      { source: '/menu/sprite-\\(bottle\\)', destination: '/menu/sprite-bottle', permanent: true },
      { source: '/menu/chipotle-chicken-&', destination: '/menu/chipotle-chicken-and', permanent: true },
      { source: '/menu/turkey-cheddar-&', destination: '/menu/turkey-cheddar-and', permanent: true },
      { source: '/menu/sides-&-desserts', destination: '/menu/sides-and-desserts', permanent: true },
    ]
  }
}

module.exports = nextConfig
