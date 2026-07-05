import { Metadata } from "next"
import AboutClient from "./AboutClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: { absolute: "About Us | SaladWorksMenu.us (Independent Fan Guide)" },
  description: "Learn about SaladWorksMenu.us. The site is an independent blog providing accurate menu prices, nutrition facts, and dietary guides for SaladWorks fans.",
  keywords: ["About SaladWorksMenu", "independent menu guide", "restaurant prices blog", "SaladWorks nutrition facts", "food blog methodology"],
  alternates: {
    canonical: "https://saladworksmenu.us/about",
  },
  openGraph: {
    title: "About Us | SaladWorksMenu.us",
    description: "Your trusted, independent source for accurate SaladWorks menu prices, nutrition, and deals.",
    url: "https://saladworksmenu.us/about",
    type: "website",
  },
}

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "SaladWorksMenu.us",
      "url": "https://saladworksmenu.us",
      "logo": "https://saladworksmenu.us/logo.png",
      "description": "An independent informational blog providing restaurant menu prices, nutrition facts, and reviews.",
      "email": "contact@saladworksmenu.us"
    }
  }

  const faqs = [
    {
      question: "Are you the official SaladWorks website?",
      answer: "No. SaladWorksMenu.us is a 100% independent, fan-run informational blog. SaladWorksMenu.us is not affiliated with or endorsed by SaladWorks, LLC."
    },
    {
      question: "How do you ensure your prices are accurate?",
      answer: "The editorial team visits local restaurants, collects receipts, and uses community submissions to provide the most accurate national average prices possible."
    },
    {
      question: "Where do you get your nutritional information?",
      answer: "The team carefully reviews official nutritional PDFs and data released by the company, compiling it into an easy-to-use format for readers to track their macros and dietary needs."
    },
    {
      question: "How often is the content updated?",
      answer: "SaladWorksMenu.us strives to update the menu and pricing data monthly or whenever major seasonal changes are announced."
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" }
      ]} />
      <AboutClient />
      <FaqSection faqs={faqs} />
    </>
  )
}
