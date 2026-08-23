import { getAllStates, getStateItemSlugs, getDataDate } from "@/lib/stateData"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { FaqSection } from "@/components/FaqSection"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: { absolute: "Saladworks Menu Directory - Browse Prices by State & City" },
  description: "Browse every Saladworks menu and price page by state. Find local menus with real prices, calories, and hours for every state with Saladworks locations.",
  keywords: [
    "SaladWorks near me",
    "salad restaurants near me",
    "salad places near me",
    "salad bars near me",
    "SaladWorks locations",
    "SaladWorks locations by state"
  ],
  alternates: { canonical: "https://saladworksmenu.us/directory" },
}

export default function DirectoryPage() {
  const states = getAllStates()
  const dataDate = getDataDate()
  const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Saladworks Menu Directory",
    "url": "https://saladworksmenu.us/directory",
    "hasPart": {
      "@type": "ItemList",
      "itemListElement": states.map((state, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": `Saladworks ${state.name} Menu`,
        "url": `https://saladworksmenu.us/menu/${state.slug}`
      }))
    }
  }

  return (
    <div className="flex flex-col w-full bg-site-white">
      <JsonLd data={itemListSchema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Directory", href: "#" }
      ]} />

      <section className="bg-gradient-to-r from-brand-deep via-[#2d1a0a] to-brand-deep py-10 md:py-14">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-5xl text-center">
          <h1 className="text-[30px] md:text-[44px] font-black text-white leading-tight tracking-tight mb-3">
            Saladworks Menu Directory
          </h1>
          <p className="text-gray-300 text-[16px] max-w-2xl mx-auto leading-relaxed">
            Every Saladworks menu and price page on this site, organized by state.
            Real prices from live location data, updated {prettyDate}.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-5 md:px-10 lg:px-16 py-12 max-w-5xl">
        <h2 className="text-[24px] font-black text-site-black mb-6">Menus by State</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {states.map(state => {
            const itemCount = getStateItemSlugs(state.slug).length
            return (
              <div key={state.slug} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-green/40 transition-colors">
                <Link href={`/menu/${state.slug}`} className="font-black text-site-black text-[17px] hover:text-brand-green transition-colors block mb-1">
                  Saladworks {state.name} Menu
                </Link>
                <p className="text-gray-500 text-[13px] mb-3">
                  {state.locationCount} location{state.locationCount > 1 ? 's' : ''} Â· {state.cities.length} cit{state.cities.length > 1 ? 'ies' : 'y'} Â· {itemCount} menu items
                </p>
                <Link href={`/directory/${state.slug}`} className="inline-flex items-center gap-1 text-brand-orange font-bold text-[13px] hover:underline">
                  All {state.name} price pages <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )
          })}
        </div>

        <h2 className="text-[24px] font-black text-site-black mb-6">More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/menu" className="bg-white border border-gray-200 rounded-xl p-4 font-bold text-site-black text-[14px] hover:border-brand-green hover:text-brand-green transition-colors">National Menu & Prices</Link>
          <Link href="/menu/prices-by-state" className="bg-white border border-gray-200 rounded-xl p-4 font-bold text-site-black text-[14px] hover:border-brand-green hover:text-brand-green transition-colors">Compare Prices by State</Link>
          <Link href="/hours" className="bg-white border border-gray-200 rounded-xl p-4 font-bold text-site-black text-[14px] hover:border-brand-green hover:text-brand-green transition-colors">Hours & Locations</Link>
          <Link href="/nutrition" className="bg-white border border-gray-200 rounded-xl p-4 font-bold text-site-black text-[14px] hover:border-brand-green hover:text-brand-green transition-colors">Nutrition Guide</Link>
          <Link href="/catering" className="bg-white border border-gray-200 rounded-xl p-4 font-bold text-site-black text-[14px] hover:border-brand-green hover:text-brand-green transition-colors">Catering Menu</Link>
          <Link href="/blog" className="bg-white border border-gray-200 rounded-xl p-4 font-bold text-site-black text-[14px] hover:border-brand-green hover:text-brand-green transition-colors">Blog & Guides</Link>
        </div>
      </section>

      <FaqSection faqs={[
        {
          question: "How many Saladworks locations are in this directory?",
          answer: `This directory covers ${states.reduce((sum, s) => sum + s.locationCount, 0)} Saladworks locations across ${states.length} states, each with its own dedicated menu and price page updated ${prettyDate}.`
        },
        {
          question: "How do I find Saladworks menu prices near me?",
          answer: "Pick your state from the list above to see the full local menu with real prices sourced from restaurants in that state, or use our Hours & Locations page to search by city or zip code."
        },
        {
          question: "Why are prices different for each state?",
          answer: "Saladworks locations are franchised, so menu prices reflect local rent, labor costs, and market conditions. Each state page on this site is built from real location menu data, not national estimates."
        },
      ]} />
    </div>
  )
}
