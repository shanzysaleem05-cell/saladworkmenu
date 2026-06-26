import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Hours & Locations",
  description: "Check the daily operating hours for SaladWorks. We are open Monday to Friday from 7:00 AM to 7:00 PM to serve you fresh salads, wraps, and more.",
  keywords: ["SaladWorks hours", "SaladWorks open time", "SaladWorks closing time", "SaladWorks weekend hours"],
  alternates: {
    canonical: "https://saladworksmenu.us/hours",
  },
  openGraph: {
    title: "Hours & Locations | SaladWorks Menu & Prices",
    description: "Check the daily operating hours for SaladWorks. We are open Monday to Friday from 7:00 AM to 7:00 PM.",
    url: "https://saladworksmenu.us/hours",
  },
}

export default function HoursPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "SaladWorks",
    "image": "https://saladworksmenu.us/opengraph-image",
    "url": "https://saladworksmenu.us",
    "telephone": "(555) 123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Fresh Avenue",
      "addressLocality": "Food City",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "00:00"
      }
    ]
  }

  const faqs = [
    {
      question: "What time does SaladWorks open and close?",
      answer: "SaladWorks is open from 7:00 AM to 7:00 PM, Monday through Friday. We are currently closed on Saturdays and Sundays."
    },
    {
      question: "Are you open on Sundays?",
      answer: "No, SaladWorks is closed on Sundays to allow our team to rest and prepare for the week ahead."
    },
    {
      question: "Do SaladWorks hours change on holidays?",
      answer: "Yes, our hours may vary on major national holidays. We recommend calling your local SaladWorks ahead of time during holiday periods to confirm our operating hours."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Hours & Locations", href: "/hours" }
      ]} />
      
      <div className="py-24 bg-site-bg">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-6">
              🕐 Store Hours
            </span>
            <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              SaladWorks Hours of Operation
            </h1>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
              Hours may vary slightly by location. Please check with your local SaladWorks for the most accurate schedule.
            </p>
            <div className="inline-flex items-center gap-3 bg-white border border-green-200 rounded-xl px-6 py-3 shadow-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0"></span>
              <span className="font-bold text-site-black text-sm">Currently Open</span>
              <span className="text-gray-400 text-sm ml-4">Mon – Fri • 07:00 AM – 07:00 PM</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { day: "Monday",    hours: "07:00 AM – 07:00 PM", open: true },
              { day: "Tuesday",   hours: "07:00 AM – 07:00 PM", open: true },
              { day: "Wednesday", hours: "07:00 AM – 07:00 PM", open: true },
              { day: "Thursday",  hours: "07:00 AM – 07:00 PM", open: true },
              { day: "Friday",    hours: "07:00 AM – 07:00 PM", open: true },
              { day: "Saturday",  hours: "Closed", open: false },
              { day: "Sunday",    hours: "Closed", open: false },
            ].map((schedule, idx) => (
              <div 
                key={idx} 
                className={`flex justify-between items-center px-6 py-5 rounded-xl border ${
                  schedule.open 
                    ? "bg-white border-gray-100 shadow-sm" 
                    : "bg-gray-50/50 border-gray-100/50 opacity-70"
                }`}
              >
                <span className={`font-extrabold ${schedule.open ? 'text-site-black text-lg' : 'text-gray-400 text-base'}`}>
                  {schedule.day}
                </span>
                <span className={`font-bold ${schedule.open ? 'text-brand-orange text-lg' : 'text-gray-400 text-base'}`}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <FaqSection faqs={faqs} />
    </div>
  )
}
