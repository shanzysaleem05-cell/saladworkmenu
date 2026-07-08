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
      // NOTE: www <-> non-www canonicalization must be handled at the
      // hosting/DNS layer only (e.g. Vercel Project -> Settings -> Domains,
      // set one domain as primary). Do NOT add an app-level redirect here
      // too - if the host is already redirecting the other direction, an
      // app-level redirect the opposite way creates an infinite redirect
      // loop (ERR_TOO_MANY_REDIRECTS).
      // Old un-sanitized item slugs (crawled/indexed by Google before the
      // slug generator was fixed to strip "&", "(", ")" and accents) -> the
      // new clean slugs produced by lib/utils.ts `slugify()`.
      { source: "/menu/sophie's", destination: '/menu/sophies', permanent: true },
      { source: '/menu/turkey-jalapeño-crunch-wrap', destination: '/menu/turkey-jalapeno-crunch-wrap', permanent: true },
      // Same rule again, percent-encoded: Google/browsers request this path
      // as %C3%B1 and it arrives at the matcher already-encoded, so the
      // literal-ñ source above never matches it — this encoded twin does.
      { source: '/menu/turkey-jalape%C3%B1o-crunch-wrap', destination: '/menu/turkey-jalapeno-crunch-wrap', permanent: true },
      { source: '/menu/coke-\\(bottle\\)', destination: '/menu/coke-bottle', permanent: true },
      { source: '/menu/diet-coke-\\(bottle\\)', destination: '/menu/diet-coke-bottle', permanent: true },
      { source: '/menu/sprite-\\(bottle\\)', destination: '/menu/sprite-bottle', permanent: true },
      { source: '/menu/chipotle-chicken-&-bacon', destination: '/menu/chipotle-chicken-and-bacon', permanent: true },
      { source: '/menu/turkey-cheddar-&-bacon', destination: '/menu/turkey-cheddar-and-bacon', permanent: true },
      // Old category-anchor URL Google indexed pre-rebuild; no longer linked
      // anywhere but still gets crawled, so send it to the live menu page.
      { source: '/menu/salads', destination: '/menu', permanent: true },
    ]
  }
}

module.exports = nextConfig
