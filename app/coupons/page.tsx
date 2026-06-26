import { Metadata } from "next"
import CouponsClient from "./CouponsClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Coupons & Deals",
  description: "Find the latest SaladWorks coupons, promo codes, and special deals. Save money on your favorite salads, wraps, and Pick 2 combos today.",
  keywords: ["SaladWorks coupons", "SaladWorks promo code", "SaladWorks deals", "SaladWorks discounts"],
  alternates: {
    canonical: "https://saladworksmenu.us/coupons",
  },
  openGraph: {
    title: "SaladWorks Coupons & Promo Codes",
    description: "Find the latest SaladWorks coupons, promo codes, and special deals to save on your next meal.",
    url: "https://saladworksmenu.us/coupons",
  },
}

export default function CouponsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SaladWorks Coupons & Deals",
    "description": "A collection of current promo codes and offers for SaladWorks.",
    "url": "https://saladworksmenu.us/coupons"
  }

  const faqs = [
    {
      question: "How do I use a promo code?",
      answer: "Promo codes can typically be applied at checkout when ordering online through the official SaladWorks app or website."
    },
    {
      question: "Are these coupons valid at all locations?",
      answer: "Most national promotions are valid at participating locations, but some franchises may opt out. Always check with your local store."
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Coupons", href: "/coupons" }
      ]} />
      <CouponsClient />
      <FaqSection faqs={faqs} />
    </>
  )
}
