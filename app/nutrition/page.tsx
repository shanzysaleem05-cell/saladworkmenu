import { Metadata } from "next"
import NutritionClient from "./NutritionClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Nutrition Facts",
  description: "Explore the full nutritional information for the entire SaladWorks menu. Find calories, fat, carbs, and protein for all salads, wraps, and soups.",
  keywords: [
    "SaladWorks nutrition",
    "SaladWorks calories",
    "healthy menu items",
    "SaladWorks macros",
    "SaladWorks nutrition facts",
    "SaladWorks calorie calculator",
    "is SaladWorks healthy"
  ],
  alternates: {
    canonical: "https://saladworksmenu.us/nutrition",
  },
  openGraph: {
    title: "SaladWorks Nutrition Facts & Calories",
    description: "Explore the full nutritional information for the entire SaladWorks menu.",
    url: "https://saladworksmenu.us/nutrition",
  },
}

export default function NutritionPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SaladWorks Nutrition Guide",
    "description": "Comprehensive nutritional information for all SaladWorks menu items.",
    "url": "https://saladworksmenu.us/nutrition"
  }

  const faqs = [
    {
      question: "Are the nutritional facts accurate?",
      answer: "The nutritional values provided are estimates based on standard recipes. Customized orders and slight variations in portion sizes will affect the actual nutritional content."
    },
    {
      question: "Does SaladWorks have low-carb options?",
      answer: "Yes, many SaladWorks salads can be made low-carb by omitting croutons, certain fruits, and opting for lighter dressings like vinaigrettes."
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Nutrition", href: "/nutrition" }
      ]} />
      <NutritionClient />
      <FaqSection faqs={faqs} />
    </>
  )
}
