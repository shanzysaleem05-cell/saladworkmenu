import { Metadata } from "next"
import MenuClient from "./MenuClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { menuData } from "@/data/menuData"

export const metadata: Metadata = {
  title: "Full Menu with Prices",
  description: "Browse the complete SaladWorks menu with prices, calories, and detailed descriptions. Explore SaladWorks fresh salads, warm melts, signature wraps, and catering options.",
  keywords: ["SaladWorks menu prices", "SaladWorks salads", "SaladWorks wraps", "healthy food prices"],
  alternates: {
    canonical: "https://saladworksmenu.us/menu",
  },
  openGraph: {
    title: "SaladWorks Menu & Prices | 2026 Update",
    description: "Browse the complete SaladWorks menu with prices, calories, and detailed descriptions.",
    url: "https://saladworksmenu.us/menu",
  },
}

export default function MenuPage() {
  const allItems = menuData.flatMap(cat => cat.items)
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SaladWorks Menu",
    "description": "Complete list of SaladWorks menu items and prices.",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.name,
        "description": item.description,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "USD"
        }
      }
    }))
  }

  const faqs = [
    {
      question: "How much are the salads at SaladWorks?",
      answer: "Most Signature and Premium salads are priced between $11.99 and $14.99. The 'Create Your Own' salad base starts at $9.99 and includes your choice of greens and up to 5 standard toppings."
    },
    {
      question: "What are the wrap prices?",
      answer: "SaladWorks Wraps and Grilled Wraps generally range from $10.49 to $12.49. They come packed with the same high-quality ingredients as the salads, wrapped in a choice of tortillas."
    },
    {
      question: "How does the Pick 2 Combo work?",
      answer: "The Pick 2 Combo allows you to choose any two half-portions for a discounted price, usually starting around $10.49. You can mix and match a half salad, half melt, or a cup of soup."
    },
    {
      question: "What soup sizes does SaladWorks offer?",
      answer: "SaladWorks offers daily freshly prepared soups in two sizes: a Cup (typically around $4.99) and a Bowl (typically around $6.99)."
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Menu & Prices", href: "/menu" }
      ]} />
      <MenuClient />
      <FaqSection faqs={faqs} />
    </>
  )
}
