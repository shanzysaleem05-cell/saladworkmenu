import { Metadata } from "next"
import ContactClient from "./ContactClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SaladWorksMenu.us. Reach out to the team for questions, feedback, catering inquiries, or to report incorrect menu prices.",
  keywords: ["Contact SaladWorksMenu.us", "SaladWorks customer service", "report price"],
  alternates: {
    canonical: "https://saladworksmenu.us/contact",
  },
  openGraph: {
    title: "Contact SaladWorksMenu.us",
    description: "Get in touch with SaladWorksMenu.us. Reach out to the team for questions, feedback, or catering inquiries.",
    url: "https://saladworksmenu.us/contact",
  },
}

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact SaladWorksMenu.us",
    "description": "Contact information and form for SaladWorksMenu.us inquiries.",
    "url": "https://saladworksmenu.us/contact"
  }

  const faqs = [
    {
      question: "What is the typical response time?",
      answer: "The team tries to respond to all inquiries within 24-48 business hours. For urgent catering questions, please call your local store directly."
    },
    {
      question: "How do I report a wrong price on the website?",
      answer: "You can use the contact form on this page to let the team know if you spot a discrepancy. Please mention the location and the specific item, and they will update the database!"
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
