import { Metadata } from "next"
import BlogClient from "./BlogClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "SaladWorks Blog & News",
  description: "Read the latest news, healthy eating tips, and menu updates from SaladWorks. Stay informed on our seasonal ingredients and limited-time offers.",
  keywords: ["SaladWorks blog", "healthy eating tips", "SaladWorks news", "menu updates"],
  alternates: {
    canonical: "https://saladworksmenu.us/blog",
  },
  openGraph: {
    title: "SaladWorks Blog & News",
    description: "Read the latest news, healthy eating tips, and menu updates from SaladWorks.",
    url: "https://saladworksmenu.us/blog",
  },
}

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SaladWorks Blog",
    "description": "News, updates, and healthy eating tips from SaladWorks.",
    "url": "https://saladworksmenu.us/blog"
  }

  const faqs = [
    {
      question: "How often is the SaladWorks blog updated?",
      answer: "This blog is updated several times a month with new menu guides, price comparisons, and healthy eating tips about SaladWorks."
    },
    {
      question: "What topics are covered on the blog?",
      answer: "This blog covers a wide range of topics including detailed nutritional breakdowns of SaladWorks menu items, price guides, catering reviews, and general wellness and healthy lifestyle advice."
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" }
      ]} />
      <BlogClient />
      <FaqSection faqs={faqs} />
    </>
  )
}
