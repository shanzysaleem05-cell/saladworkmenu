# SEO Fixes Implementation Plan

This plan addresses all 8 specific SEO and structural fixes requested for the SaladWorks Menu project.

## Proposed Changes

### FIX 1: FAQ SSR FIX
#### [MODIFY] [FAQAccordion.tsx](file:///c:/shanzy-project/saladworksmenu/components/FAQAccordion.tsx)
- Replaced `useState` and `framer-motion` with native `<details>` and `<summary>` tags.
- Maintained exact visual styling with `group`, `group-open` classes, and rotating `<Plus />` icon.

#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/catering/page.tsx)
#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/about/page.tsx)
#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/contact/page.tsx)
- Find and replace any inline FAQ accordions with the native `<details>` / `<summary>` implementation, keeping answer text fully hardcoded for crawler visibility.

### FIX 2: URL SLUGS FIX
#### [MODIFY] [menuData.ts](file:///c:/shanzy-project/saladworksmenu/data/menuData.ts)
- Update specific slugs (`sophie's` -> `sophies`, `turkey-jalapeño` -> `turkey-jalapeno`, `coke-(bottle)` -> `coke-bottle`, etc.) to remove invalid characters.
#### [MODIFY] [next.config.js](file:///c:/shanzy-project/saladworksmenu/next.config.js)
- Add 301 redirects from all old invalid slugs to the new cleaned slugs.

### FIX 3 & 7: SITEMAP COMPLETE & DATES FIX
#### [MODIFY] [sitemap.ts](file:///c:/shanzy-project/saladworksmenu/app/sitemap.ts)
- Completely rewrite the sitemap using static `2026-06-01` dates for all non-blog pages.
- Add all specific priorities and the exact list of 52+ menu item URLs requested.
- Dynamically add blog posts wrapped in a `try/catch` block.

### FIX 4: BLOG POSTS
#### [NEW] [saladworks-menu-prices-2026.mdx](file:///c:/shanzy-project/saladworksmenu/content/posts/saladworks-menu-prices-2026.mdx)
#### [NEW] [saladworks-calories-nutrition-guide.mdx](file:///c:/shanzy-project/saladworksmenu/content/posts/saladworks-calories-nutrition-guide.mdx)
#### [NEW] [saladworks-catering-review.mdx](file:///c:/shanzy-project/saladworksmenu/content/posts/saladworks-catering-review.mdx)
#### [NEW] [saladworks-vs-sweetgreen-prices.mdx](file:///c:/shanzy-project/saladworksmenu/content/posts/saladworks-vs-sweetgreen-prices.mdx)
#### [NEW] [saladworks-pick-2-combo-guide.mdx](file:///c:/shanzy-project/saladworksmenu/content/posts/saladworks-pick-2-combo-guide.mdx)
#### [NEW] [saladworks-kids-menu-guide.mdx](file:///c:/shanzy-project/saladworksmenu/content/posts/saladworks-kids-menu-guide.mdx)
- Create each post with 800-1000 words, correct frontmatter, formatting, and tables.

### FIX 5: TITLE TAG CONSISTENCY
#### [MODIFY] [layout.tsx](file:///c:/shanzy-project/saladworksmenu/app/layout.tsx)
#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/page.tsx)
- Make title, `og:title`, and `twitter:title` identical on all core pages ("SaladWorks Menu Prices 2026 — Full Menu, Calories and Nutrition Guide"). Update templates to be strict.

### FIX 6: REMOVE REMAINING WE/OUR LANGUAGE
#### [MODIFY] [HomeClient.tsx](file:///c:/shanzy-project/saladworksmenu/app/HomeClient.tsx)
#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/catering/page.tsx)
#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/about/page.tsx)
#### [MODIFY] [page.tsx](file:///c:/shanzy-project/saladworksmenu/app/menu/page.tsx)
- Globally replace "our", "we offer", "we prepare" with "SaladWorks", "SaladWorks offers", etc., maintaining a 3rd-party informational tone.

### FIX 8: OG IMAGE VERIFY AND CREATE
#### [NEW] [opengraph-image.tsx](file:///c:/shanzy-project/saladworksmenu/app/opengraph-image.tsx)
#### [NEW] [opengraph-image.tsx](file:///c:/shanzy-project/saladworksmenu/app/menu/opengraph-image.tsx)
#### [NEW] [opengraph-image.tsx](file:///c:/shanzy-project/saladworksmenu/app/catering/opengraph-image.tsx)
#### [NEW] [opengraph-image.tsx](file:///c:/shanzy-project/saladworksmenu/app/blog/opengraph-image.tsx)
- Create dynamic Edge-based OG images using Next.js `ImageResponse` with the specified cream background and green pill badge.
- Update page metadatas to use the dynamic relative paths.

### SEARCH CONSOLE REMINDER
#### [MODIFY] [layout.tsx](file:///c:/shanzy-project/saladworksmenu/app/layout.tsx)
- Add the `// TODO: Replace with real Google Search Console...` comment above the verification block.

## Verification Plan
1. Check that the dev server compiles perfectly.
2. Visit `/sitemap.xml` to verify the fixed dates and priorities.
3. Validate that FAQ accordions open/close using native HTML tags.
4. Verify dynamic OG images load via `/opengraph-image`.
