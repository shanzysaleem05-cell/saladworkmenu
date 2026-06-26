import { Metadata } from "next"
import HomeClient from "./HomeClient"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  metadataBase: new URL("https://saladworksmenu.us"),
  title: "SaladWorks Menu & Prices 2026 — Calories & Nutrition",
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
    title: "SaladWorks Menu Prices 2026 — Full Menu, Calories & Nutrition",
    description: "Explore the complete SaladWorks menu with 2026 prices, calorie counts, and nutrition. Salads from $9.99, wraps from $11.99, and Pick 2 combos from $13.49.",
    url: "https://saladworksmenu.us",
    siteName: "SaladWorks Menu & Prices",
    images: [
      {
        url: "https://saladworksmenu.us/og-homepage.png",
        width: 1200,
        height: 630,
        alt: "SaladWorks Menu Prices 2026 — Complete Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaladWorks Menu Prices 2026 — Full Menu Guide",
    description: "Complete SaladWorks menu with 2026 prices, calories and nutrition facts.",
    images: ["https://saladworksmenu.us/og-homepage.png"],
    creator: "@saladworksmenu",
  },
  verification: {
    google: "PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_CODE_HERE",
  },
};

export default function Page() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SaladWorks Menu & Prices",
    "url": "https://saladworksmenu.us",
    "description": "Independent fan guide for SaladWorks menu prices, calories, and nutrition information for 2026.",
    "inLanguage": "en-US",
    "dateModified": "2026-06-01",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a salad cost at SaladWorks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SaladWorks salad prices range from $11.99 for Sophie's Salad to $14.99 for the Steakhouse Salad. Signature salads average $12.49–$13.49. Prices may vary by location."
        }
      },
      {
        "@type": "Question",
        "name": "Does SaladWorks have a kids menu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The SaladWorks Kids Works menu includes Kids Bento Box ($7.99), Kids Create Your Own Salad ($6.99), Kids Grilled Cheese ($6.49), and Kids Grilled Chicken Quesadilla ($7.49). All kids meals are under $8."
        }
      },
      {
        "@type": "Question",
        "name": "Does SaladWorks offer catering?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SaladWorks offers catering including Salad Bar, Group Trays, Group Bowls, Boxed Meals, Grazer Trays, Sides and Desserts, and Beverages. Contact your local SaladWorks to order."
        }
      },
      {
        "@type": "Question",
        "name": "Are there vegan and vegetarian options at SaladWorks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SaladWorks offers vegan-friendly options including the Tofu Superfood Salad ($12.49), Tofu Superfood Wrap ($11.99), and many salads customizable to vegan on request."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Pick 2 combo at SaladWorks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SaladWorks Pick 2 combo lets you choose any two items from half salads, melts, soups, and wraps. Prices start at $13.49 and go up to $14.99."
        }
      },
      {
        "@type": "Question",
        "name": "What are SaladWorks hours of operation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most SaladWorks locations are open Monday–Thursday 10AM–9PM, Friday–Saturday 10AM–10PM, Sunday 11AM–8PM. Hours vary by location."
        }
      }
    ]
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <HomeClient />
    </>
  )
}
