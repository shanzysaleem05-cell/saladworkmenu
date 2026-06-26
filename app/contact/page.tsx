import { Metadata } from "next"
import ContactClient from "./ContactClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SaladWorks. Reach out to our team for questions, feedback, catering inquiries, or to report incorrect menu prices.",
  keywords: ["Contact SaladWorks", "SaladWorks customer service", "report price"],
  alternates: {
    canonical: "https://saladworksmenu.us/contact",
  },
  openGraph: {
    title: "Contact SaladWorks",
    description: "Get in touch with SaladWorks. Reach out to our team for questions, feedback, or catering inquiries.",
    url: "https://saladworksmenu.us/contact",
  },
}

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact SaladWorks",
    "description": "Contact information and form for SaladWorks inquiries.",
    "url": "https://saladworksmenu.us/contact"
  }

  const faqs = [
    {
      question: "What is the typical response time?",
      answer: "We try to respond to all inquiries within 24-48 business hours. For urgent catering questions, please call your local store directly."
    },
    {
      question: "How do I report a wrong price on the website?",
      answer: "You can use the contact form on this page to let us know if you spot a discrepancy. Please mention the location and the specific item, and we will update our database!"
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Contact Us", href: "/contact" }
      ]} />
      <ContactClient />
      <FaqSection faqs={faqs} />
    </>
  )
}
