import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { getAllStateHoursData, getDataDate } from "@/lib/stateData"
import Link from "next/link"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "SaladWorks Hours & Locations | See Real Operating Hours",
  description: "Find real, up-to-date operating hours for every SaladWorks location across 16+ states. Check when your local Saladworks is open for fresh salads, wraps, and more.",
  keywords: ["SaladWorks hours", "SaladWorks open time", "SaladWorks closing time", "SaladWorks locations", "Saladworks near me", "Is Saladworks open today"],
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
    "@type": "WebPage",
    "name": "Saladworks Hours & Locations",
    "description": `Operating hours for ${totalLocations} Saladworks locations across ${totalStates} states.`,
    "dateModified": dataDate
  }

  const faqs = [
    {
      question: "What time does SaladWorks usually open and close?",
      answer: "Most SaladWorks locations open at 10:00 AM or 10:30 AM and close between 8:00 PM and 9:00 PM. However, hours vary significantly by location and day of the week, so check the specific hours for your state below."
    },
    {
      question: "Are Saladworks locations open on Sundays?",
      answer: "Yes, many SaladWorks locations are open on Sundays, typically with reduced hours like 11:00 AM to 7:00 PM or 8:00 PM. Some locations, especially inside malls or office buildings, may be closed on Sundays."
    },
    {
      question: "Do SaladWorks hours change on holidays?",
      answer: "Yes, operating hours may vary on major national holidays like Thanksgiving, Christmas, and New Year's Day. We recommend calling your local SaladWorks ahead of time during holiday periods."
    },
    {
      question: "How many SaladWorks locations are there?",
      answer: `We are currently tracking real-time menu and hours data for ${totalLocations} SaladWorks locations across ${totalStates} states.`
    }
  ]

  // Helper to format hours display cleanly
  const formatDayHours = (day: any) => {
    if (day.closed) return "Closed"
    return `${day.open} – ${day.close}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Hours & Locations", href: "/hours" }
      ]} />
      
      <div className="py-20 bg-site-bg">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-6 rounded-full">
              🕐 Store Hours
            </span>
            <h1 className="text-[36px] md:text-[48px] font-black text-site-black leading-tight tracking-tight mb-4">
              SaladWorks Hours & Locations
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-2xl mx-auto mb-8">
              Find up-to-date operating hours for {totalLocations} SaladWorks locations across {totalStates} states. Last verified {prettyDate}.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {stateHours.map((stateData) => (
              <div key={stateData.state.code} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                
                {/* State Header */}
                <div className="bg-brand-deep p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-brand-orange" />
                      {stateData.state.name} SaladWorks Locations
                    </h2>
                    <p className="text-gray-300 mt-1 text-sm">
                      {stateData.locations.length} Location{stateData.locations.length > 1 ? 's' : ''} • <Link href={`/menu/${stateData.state.slug}`} className="text-brand-orange hover:underline font-semibold">View {stateData.state.name} Menu Prices →</Link>
                    </p>
                  </div>
                </div>

                {/* Locations List */}
                <div className="divide-y divide-gray-100">
                  {stateData.locations.map((loc) => (
                    <div key={loc.id} className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row gap-8">
                        
                        {/* Location Details */}
                        <div className="md:w-1/3">
                          <h3 className="font-bold text-site-black text-lg mb-2">{loc.name}</h3>
                          <address className="not-italic text-gray-500 text-[15px] leading-relaxed mb-3">
                            {loc.address}<br />
                            {loc.city}, {stateData.state.code} {loc.postalCode}
                          </address>
                          {loc.phone && (
                            <a href={`tel:${loc.phone}`} className="inline-flex items-center text-sm font-bold text-brand-green hover:text-brand-deep">
                              📞 {loc.phone}
                            </a>
                          )}
                        </div>

                        {/* Hours Table */}
                        <div className="md:w-2/3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                            {[
                              { label: 'Monday', hours: formatDayHours(loc.hours.monday) },
                              { label: 'Tuesday', hours: formatDayHours(loc.hours.tuesday) },
                              { label: 'Wednesday', hours: formatDayHours(loc.hours.wednesday) },
                              { label: 'Thursday', hours: formatDayHours(loc.hours.thursday) },
                              { label: 'Friday', hours: formatDayHours(loc.hours.friday) },
                              { label: 'Saturday', hours: formatDayHours(loc.hours.saturday) },
                              { label: 'Sunday', hours: formatDayHours(loc.hours.sunday) },
                            ].map((day, i) => (
                              <div key={i} className="flex flex-col">
                                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">{day.label}</span>
                                <span className={`text-[14px] font-semibold ${day.hours === 'Closed' ? 'text-brand-orange' : 'text-site-black'}`}>
                                  {day.hours}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
      
      <FaqSection faqs={faqs} />
    </div>
  )
}
