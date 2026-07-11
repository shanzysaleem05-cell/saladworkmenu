import { getComparableItemSlugs, findItemAcrossStates, getItemStateComparison, getDataDate, getStateSlugs } from "@/lib/stateData"
import Link from "next/link"
import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { FaqSection } from "@/components/FaqSection"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: { absolute: `Saladworks Prices by State - Compare Every Item (${new Date().getFullYear()})` },
  description: "Compare Saladworks menu item prices across every state. See which states have the cheapest salads, bowls, wraps, and soups — real data from live location menus.",
  alternates: { canonical: "https://www.saladworksmenu.us/menu/prices-by-state" },
}

export default function PricesByStateIndexPage() {
  const dataDate = getDataDate()
  const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

  const items = getComparableItemSlugs()
    .map(slug => {
      const found = findItemAcrossStates(slug)
      if (!found) return null
      const { states, nationalAvg } = getItemStateComparison(slug)
      return { slug, name: found.item.name, category: found.category, stateCount: states.length, nationalAvg }
    })
    .filter((i): i is NonNullable<typeof i> => i !== null)

  // Group by category for a scannable directory
  const byCategory = new Map<string, typeof items>()
  for (const item of items) {
    if (!byCategory.has(item.category)) byCategory.set(item.category, [])
    byCategory.get(item.category)!.push(item)
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Saladworks Prices by State",
    "url": "https://www.saladworksmenu.us/menu/prices-by-state",
    "hasPart": {
      "@type": "ItemList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "url": `https://www.saladworksmenu.us/menu/prices-by-state/${item.slug}`
      }))
    }
  }

  return (
    <div className="flex flex-col w-full bg-site-white">
      <JsonLd data={itemListSchema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Menu & Prices", href: "/menu" },
        { label: "Prices by State", href: "#" }
      ]} />

      <section className="bg-gradient-to-r from-brand-deep via-[#2d1a0a] to-brand-deep py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-[30px] md:text-[44px] font-black text-white leading-tight tracking-tight mb-3">
            Saladworks Prices by State
          </h1>
          <p className="text-gray-300 text-[16px] max-w-2xl mx-auto leading-relaxed">
            Pick a menu item to see its average price in every state — which state is cheapest, which is most
            expensive, and how each compares to the national average. Data updated {prettyDate}.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        {Array.from(byCategory.entries()).map(([category, catItems]) => (
          <div key={category} className="mb-10">
            <h2 className="text-[22px] font-black text-site-black mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {catItems.map(item => (
                <Link key={item.slug} href={`/menu/prices-by-state/${item.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-orange/40 hover:shadow-md transition-all">
                  <h3 className="font-bold text-site-black text-[14px] mb-1 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                  <span className="text-brand-orange font-black text-[15px]">${item.nationalAvg.toFixed(2)} avg</span>
                  <span className="text-gray-400 text-[12px] block">{item.stateCount} states</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <FaqSection faqs={[
        {
          question: "Why do Saladworks menu prices vary by state?",
          answer: "Saladworks locations are franchised, so each restaurant sets prices based on local rent, labor costs, and market conditions. That's why the same item can cost more in one state than another."
        },
        {
          question: "How many menu items can I compare across states?",
          answer: `${items.length} Saladworks menu items have enough multi-state location data to compare prices, updated ${prettyDate}. Items carried at only one location aren't included since there's nothing to compare.`
        },
        {
          question: "Where does this price data come from?",
          answer: `Every price on this page comes from real, live Saladworks location menus across ${getStateSlugs().length} states — not national estimates or guesses.`
        },
      ]} />
    </div>
  )
}
