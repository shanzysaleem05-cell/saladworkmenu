import { Metadata } from "next"
import CateringClient from "./CateringClient"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  metadataBase: new URL("https://saladworksmenu.us"),
  title: "SaladWorks Catering Menu & Prices 2026 - Packages, Trays & Group Orders",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does SaladWorks catering cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SaladWorks catering packages start at $89.99 for the Basic Package which feeds up to 10 people. The Party Package for up to 25 people is $199.99, and the Corporate Package for up to 50 people is $379.99."
        }
      },
      {
        "@type": "Question",
        "name": "Does SaladWorks offer delivery for catering orders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SaladWorks offers catering delivery to your event location. Delivery availability and fees vary by location. Contact your nearest SaladWorks to confirm delivery options."
        }
      },
      {
        "@type": "Question",
        "name": "How much advance notice is required for catering?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SaladWorks requires at least 24 hours advance notice for standard orders. For large events of 25 or more people, order 3 to 5 business days in advance."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize the catering menu for dietary restrictions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SaladWorks catering can be customized for vegetarian, vegan, and gluten-free dietary needs. Include your requirements in the Special Requests field on the quote form."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum order for SaladWorks catering?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum catering order is typically the Basic Package serving 8 to 10 people starting at $89.99. Minimums may vary by location."
        }
      },
      {
        "@type": "Question",
        "name": "Can I cancel or modify my catering order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Changes or cancellations made more than 24 hours before the event can generally be accommodated. Contact your local SaladWorks as soon as possible."
        }
      },
      {
        "@type": "Question",
        "name": "Does SaladWorks catering include setup and serving?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SaladWorks catering is delivered ready to serve. Setup assistance varies by location. Contact your local SaladWorks to discuss specific setup needs."
        }
      },
      {
        "@type": "Question",
        "name": "How do I place a SaladWorks catering order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fill out the quote request form on this page, call your local SaladWorks directly, or visit saladworks.com. A specialist will confirm your order within 24 hours."
        }
      }
    ]
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
