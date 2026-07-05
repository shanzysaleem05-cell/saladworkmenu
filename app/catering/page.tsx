import { Metadata } from "next"
import CateringClient from "./CateringClient"
import { JsonLd } from "@/components/JsonLd"
import { cateringFaqs } from "@/data/cateringFaqs"

export const metadata: Metadata = {
  title: { absolute: "SaladWorks Catering Menu & Prices 2026" },
  description: "SaladWorks catering packages start at $89.99 for 10 people. Order salad bars, group trays, boxed meals and beverages for your next corporate event, party or family gathering. Request a free quote today.",
  keywords: [
    "SaladWorks catering",
    "SaladWorks catering menu",
    "SaladWorks catering prices",
    "SaladWorks catering packages",
    "SaladWorks group order",
    "SaladWorks party trays",
    "SaladWorks corporate catering",
    "SaladWorks catering 2026"
  ],
  authors: [{ name: "SaladWorks Menu Guide Editorial Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://saladworksmenu.us/catering",
  },
  openGraph: {
    title: "SaladWorks Catering Menu & Prices 2026 - Packages from $89.99",
    description: "SaladWorks catering packages start at $89.99 for 10 people. Salad bars, group trays, boxed meals and beverages for any event size.",
    url: "https://saladworksmenu.us/catering",
    siteName: "SaladWorks Menu & Prices",
    images: [
      {
        url: "https://saladworksmenu.us/catering/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SaladWorks Catering Packages 2026 - Starting at $89.99",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaladWorks Catering Menu & Prices 2026",
    description: "Catering packages from $89.99 for 10 people. Salad bars, trays, boxed meals for any event.",
    images: ["https://saladworksmenu.us/catering/opengraph-image"],
  },
};

export default function CateringPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://saladworksmenu.us"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catering",
        "item": "https://saladworksmenu.us/catering"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SaladWorks Catering",
    "description": "SaladWorks catering service for corporate events, parties and gatherings. Includes salad bars, group trays, boxed meals, beverages and desserts.",
    "provider": {
      "@type": "FoodEstablishment",
      "name": "SaladWorks",
      "url": "https://saladworks.com"
    },
    "areaServed": "United States",
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Catering Package",
        "description": "Feeds up to 10 people. Includes 2 large signature salads, 10 assorted wraps, 2 choices of soup, and assorted beverages.",
        "price": "89.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Party Catering Package",
        "description": "Feeds up to 25 people. Includes 4 large signature salads, 25 assorted wraps and melts, 4 choices of soup, sides and beverages.",
        "price": "199.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Corporate Catering Package",
        "description": "Feeds up to 50 people. Includes 8 large signature salads, 50 assorted wraps and melts, 6 choices of soup, 4 sides and premium beverages.",
        "price": "379.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  // Built from the same data the visible FAQ accordion renders (see
  // app/catering/CateringClient.tsx) so the schema always matches on-page text.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cateringFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <h1 className="sr-only">SaladWorks Catering Menu and Packages 2026</h1>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <CateringClient />
    </>
  )
}
