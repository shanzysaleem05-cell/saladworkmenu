import { Metadata } from "next"
import HomeClient from "./HomeClient"
import { JsonLd } from "@/components/JsonLd"
import { menuData } from "@/data/menuData"
import { homeFaqs } from "@/data/homeFaqs"
import { getNationalAverages, getDataDate } from "@/lib/stateData"

export const metadata: Metadata = {
  title: { absolute: "SaladWorks Menu Prices 2026 - Full Menu & Nutrition Guide" },
  description: "Explore the complete SaladWorks menu with 2026 prices, calorie counts, and nutrition. Salads from $9.99, wraps from $11.99, and Pick 2 combos from $13.49.",
  keywords: [
    "SaladWorks menu prices",
    "SaladWorks menu 2026",
    "SaladWorks calories",
    "SaladWorks nutrition",
    "SaladWorks salad prices",
    "SaladWorks wraps prices",
    "SaladWorks soups",
    "SaladWorks Pick 2",
    "SaladWorks catering",
    "SaladWorks kids menu"
  ],
  authors: [{ name: "SaladWorks Menu Guide Editorial Team" }],
  creator: "SaladWorks Menu Guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://saladworksmenu.us",
  },
  openGraph: {
    title: "SaladWorks Menu Prices 2026 - Full Menu, Calories and Nutrition Guide",
    description: "Explore the complete SaladWorks menu with 2026 prices, calorie counts, and nutrition. Salads from $9.99, wraps from $11.99, and Pick 2 combos from $13.49.",
    url: "https://saladworksmenu.us",
    siteName: "SaladWorks Menu & Prices",
    images: ["/opengraph-image"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaladWorks Menu Prices 2026 - Full Menu, Calories and Nutrition Guide",
    description: "Complete SaladWorks menu with 2026 prices, calories and nutrition facts.",
    images: ["/opengraph-image"],
    creator: "@saladworksmenu",
  },
  // Verification tag lives once in app/layout.tsx (root layout) — a second,
  // page-level `verification` object here would replace the whole object
  // (including the real Bing msvalidate.01 code) instead of merging with it.
};

export default function Page() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SaladWorks Menu & Prices",
    "url": "https://saladworksmenu.us",
    "description": "Independent fan guide for SaladWorks menu prices, calories, and nutrition information for 2026.",
    "inLanguage": "en-US",
    "dateModified": getDataDate(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://saladworksmenu.us/menu?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SaladWorks Menu Guide",
    "url": "https://saladworksmenu.us",
    "logo": {
      "@type": "ImageObject",
      "url": "https://saladworksmenu.us/logo.png",
      "width": 200,
      "height": 60
    },
    "description": "An independent fan guide providing up-to-date SaladWorks menu prices, nutrition facts, and calorie counts. Not affiliated with SaladWorks Inc.",
    "sameAs": []
  }

  // Built from the same data the visible <FAQAccordion> renders (see
  // components/FAQAccordion.tsx) so the schema always matches on-page text.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  // Fetch real average prices and calories
  const { categories: nationalCategories } = getNationalAverages()

  // Update static menuData with real prices & calories
  const updatedMenuData = menuData.map(cat => ({
    ...cat,
    items: cat.items.map(item => {
      // Find the corresponding item in national averages
      let realItem: any = null
      for (const natCat of nationalCategories) {
        realItem = natCat.items.find(i => 
          i.slug === item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
          i.name.toLowerCase() === item.name.toLowerCase() ||
          i.name.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(i.name.toLowerCase())
        )
        if (realItem) break
      }
      
      return {
        ...item,
        price: realItem ? realItem.price : item.price,
        calories: realItem ? realItem.calories : null
      }
    })
  }))

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <HomeClient menuData={updatedMenuData} dataDate={getDataDate()} />
    </>
  )
}
