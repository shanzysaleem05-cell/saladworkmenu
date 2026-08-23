import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { getAllStateHoursData, getDataDate } from "@/lib/stateData"
import { HoursClient } from "./HoursClient"

export const metadata: Metadata = {
  title: { absolute: "SaladWorks Near Me - Hours & Locations (2026)" },
  description: "Find SaladWorks near you: exact operating hours for every location, searchable by city, state, or zip code, plus live open-now status.",
  keywords: [
    "SaladWorks near me",
    "salad restaurants near me",
    "salad places near me",
    "SaladWorks hours",
    "SaladWorks locations"
  ],
  alternates: {
    canonical: "https://saladworksmenu.us/hours",
  },
  openGraph: {
    title: "SaladWorks Near Me - Hours & Locations",
    description: "Find SaladWorks near you: exact operating hours for every location, searchable by city, state, or zip code.",
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
      question: "Where is the closest SaladWorks near me?",
      answer: `Use the location search above and type your city, state, or zip code to see every SaladWorks near you, sorted with distance and live open/closed status. This directory covers ${totalLocations} locations across ${totalStates} states, last verified ${prettyDate}.`
    },
    {
      question: "What time does SaladWorks usually open and close?",
      answer: "Most SaladWorks locations open around 10:00 AM or 10:30 AM and close between 8:00 PM and 9:00 PM. However, mall and airport locations may have wildly different hours. Use the store locator above to find the exact opening time for the SaladWorks nearest you."
    },
    {
      question: "Are Saladworks locations open on Sundays?",
      answer: "Yes, a majority of SaladWorks locations are open on Sundays, typically operating with reduced hours such as 11:00 AM to 7:00 PM. Some corporate park or strict mall locations might be closed on Sundays."
    },
    {
      question: "How do I find out if a specific Saladworks is open right now?",
      answer: "Type your city, state, or zip code into the smart search bar above. It calculates your local time and shows a green 'Open Now' or red 'Closed' badge next to each restaurant based on their real daily hours."
    },
    {
      question: "Do SaladWorks hours change on holidays?",
      answer: "Yes, operating hours may vary significantly on major national holidays like Thanksgiving, Christmas, and New Year's Day. Call the local SaladWorks ahead of time during holiday periods using the phone numbers provided in the directory above."
    }
  ]
  // Calculate most common timings for SEO table
  const timingGroups = new Map<string, Set<string>>();
  
  const formatTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(':');
      let h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  stateHours.forEach(stateGroup => {
    stateGroup.locations.forEach(loc => {
      if (loc.hours && loc.hours.monday && !('closed' in loc.hours.monday)) {
        // @ts-ignore - we checked it's not closed
        const h = loc.hours.monday;
        if (h.open && h.close) {
          const timingStr = `${formatTime(h.open)} - ${formatTime(h.close)}`;
          if (!timingGroups.has(timingStr)) {
            timingGroups.set(timingStr, new Set());
          }
          timingGroups.get(timingStr)!.add(stateGroup.state.name);
        }
      }
    });
  });

  const topTimings = Array.from(timingGroups.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 6)
    .map(([timing, states]) => ({
      timing,
      states: Array.from(states).sort().join(', ')
    }));

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Hours & Locations", href: "/hours" }
      ]} />
      
      <div className="py-12 md:py-20 bg-site-bg">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-6 rounded-full">
              ðŸ• Find a Restaurant Near You
            </span>
            <h1 className="text-[32px] md:text-[48px] font-black text-site-black leading-tight tracking-tight mb-6">
              SaladWorks Near Me - Hours & Locations ({new Date().getFullYear()})
            </h1>
            <p className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed max-w-3xl mx-auto mb-8">
              Looking for a SaladWorks near you? Search by city, state, or zip code to find the closest location,
              its exact hours, and whether it's open right now. This directory tracks operating schedules for <strong>{totalLocations} restaurants</strong> across {totalStates} states,
              last verified {prettyDate}.
            </p>
          </div>

          {/* SEO Table: Standard Operating Hours (Above Search) */}
          {topTimings.length > 0 && (
            <div className="mb-16 bg-white p-6 md:p-12 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <h2 className="text-2xl md:text-3xl font-black text-site-black mb-4">Standard Saladworks Operating Hours by State</h2>
              <p className="text-gray-600 mb-8 text-lg">
                While hours can vary by specific location (especially malls and airports), here is a structured summary of the most common daily schedules across different states.
              </p>
              
              <div className="flex flex-col">
                <div className="hidden md:grid grid-cols-3 bg-gray-50 border border-gray-200 py-4 px-6 rounded-t-xl">
                  <div className="col-span-1 font-black text-site-black text-[15px] uppercase tracking-wider">Typical Hours (Mon - Fri)</div>
                  <div className="col-span-2 font-black text-site-black text-[15px] uppercase tracking-wider">States with these Hours</div>
                </div>
                <div className="flex flex-col gap-4 md:gap-0 md:border md:border-t-0 md:border-gray-200 md:rounded-b-xl overflow-hidden">
                  {topTimings.map((row, i) => (
                    <div key={i} className="flex flex-col md:grid md:grid-cols-3 border border-gray-200 md:border-0 md:border-b md:last:border-b-0 p-5 md:p-0 hover:bg-gray-50/50 transition-colors rounded-xl md:rounded-none bg-white">
                      <div className="col-span-1 md:py-4 md:px-6">
                        <span className="md:hidden text-xs text-gray-500 uppercase font-black tracking-wider block mb-1">Typical Hours</span>
                        <span className="font-bold text-brand-orange text-lg md:text-base">{row.timing}</span>
                      </div>
                      <div className="col-span-2 md:py-4 md:px-6 mt-3 md:mt-0">
                        <span className="md:hidden text-xs text-gray-500 uppercase font-black tracking-wider block mb-1">States</span>
                        <span className="text-gray-600 font-medium leading-relaxed">{row.states}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Client Locator */}
          <HoursClient initialData={stateHours} />

          {/* SEO Content Section */}
          <div className="mt-10 bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-site-black mb-6">Why Check SaladWorks Hours Before You Visit?</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Saladworks is renowned for its fresh, customizable salads, hearty wraps, and comforting soups. However, because Saladworks operates in a wide variety of venues - from standalone drive-thrus to busy mall food courts and university campuses - their <strong>opening and closing times can vary drastically</strong>.
              </p>
              <p>
                For example, a Saladworks located in a business district might close as early as 4:00 PM and remain completely closed on weekends, whereas a suburban shopping mall location will likely stay open until 9:00 PM all seven days of the week. 
              </p>
              <p>
                Using the location finder above, you can confidently search for restaurants in your area, check the precise weekly schedule without encountering confusing formats, and even tap to call the store directly to confirm their holiday schedules.
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <FaqSection faqs={faqs} />
    </div>
  )
}
