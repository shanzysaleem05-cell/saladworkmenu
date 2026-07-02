import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { getAllStateHoursData, getDataDate } from "@/lib/stateData"
import { HoursClient } from "./HoursClient"

export const metadata: Metadata = {
  title: "SaladWorks Hours & Locations (2026) | Store Locator",
  description: "Find the exact operating hours for every SaladWorks location. Search our store directory to check opening and closing times near you.",
  alternates: {
    canonical: "https://saladworksmenu.us/hours",
  },
  openGraph: {
    title: "Hours & Locations | SaladWorks Menu & Prices",
    description: "Check the daily operating hours for every SaladWorks location.",
    url: "https://saladworksmenu.us/hours",
  },
}

export default function HoursPage() {
  const dataDate = getDataDate()
  const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  const stateHours = getAllStateHoursData()
  const totalLocations = stateHours.reduce((sum, s) => sum + s.locations.length, 0)
  const totalStates = stateHours.length

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Saladworks Locations Directory",
    "description": `A complete directory of operating hours for ${totalLocations} Saladworks locations.`,
    "dateModified": dataDate
  }

  const faqs = [
    {
      question: "What time does SaladWorks usually open and close?",
      answer: "Most SaladWorks locations open around 10:00 AM or 10:30 AM and close between 8:00 PM and 9:00 PM. However, mall and airport locations may have wildly different hours. Use our store locator above to find the exact opening time for the Saladworks near you."
    },
    {
      question: "Are Saladworks locations open on Sundays?",
      answer: "Yes, a majority of SaladWorks locations are open on Sundays, typically operating with reduced hours such as 11:00 AM to 7:00 PM. Some corporate park or strict mall locations might be closed on Sundays."
    },
    {
      question: "How do I find out if a specific Saladworks is open right now?",
      answer: "Simply type your city, state, or zip code into our smart search bar above. It will calculate your local time and show a green 'Open Now' or red 'Closed' badge next to each restaurant based on their real daily hours."
    },
    {
      question: "Do SaladWorks hours change on holidays?",
      answer: "Yes, operating hours may vary significantly on major national holidays like Thanksgiving, Christmas, and New Year's Day. We highly recommend calling your local SaladWorks ahead of time during holiday periods using the phone numbers provided in our directory."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Hours & Locations", href: "/hours" }
      ]} />
      
      <div className="py-12 md:py-20 bg-site-bg">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-6 rounded-full">
              🕐 Find a Restaurant Near You
            </span>
            <h1 className="text-[32px] md:text-[48px] font-black text-site-black leading-tight tracking-tight mb-6">
              SaladWorks Hours & Locations ({new Date().getFullYear()})
            </h1>
            <p className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed max-w-3xl mx-auto mb-8">
              Wondering when your local restaurant closes or trying to find the nearest location? 
              You've come to the right place. Our database tracks the real-time operating schedules for <strong>{totalLocations} restaurants</strong> across {totalStates} states. 
              Search below to instantly see which stores are currently open near you!
            </p>
          </div>

          {/* Interactive Client Locator */}
          <HoursClient initialData={stateHours} />

          {/* SEO Content Section */}
          <div className="mt-20 bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-site-black mb-6">Why Check SaladWorks Hours Before You Visit?</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Saladworks is renowned for its fresh, customizable salads, hearty wraps, and comforting soups. However, because Saladworks operates in a wide variety of venues—from standalone drive-thrus to busy mall food courts and university campuses—their <strong>opening and closing times can vary drastically</strong>.
              </p>
              <p>
                For example, a Saladworks located in a business district might close as early as 4:00 PM and remain completely closed on weekends, whereas a suburban shopping mall location will likely stay open until 9:00 PM all seven days of the week. 
              </p>
              <p>
                By using our advanced location finder above, you can confidently search for restaurants in your area, check the precise weekly schedule without encountering confusing formats, and even tap to call the store directly to confirm their holiday schedules!
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <FaqSection faqs={faqs} />
    </div>
  )
}
