import { getComparableItemSlugs, findItemAcrossStates, getItemStateComparison, getDataDate } from "@/lib/stateData"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

type Props = {
  params: { item: string }
}

export async function generateStaticParams() {
  return getComparableItemSlugs().map(item => ({ item }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findItemAcrossStates(params.item)
  const { states, nationalAvg } = getItemStateComparison(params.item)
  if (!found || states.length < 2) return { title: "Item Not Found" }

  const { item } = found
  const year = new Date().getFullYear()
  const cheapest = states[0]
  const priciest = states[states.length - 1]

  return {
    title: `Saladworks ${item.name} Price by State (${year}) - Cheapest: ${cheapest.name} $${cheapest.avgPrice.toFixed(2)}`,
    description: `Compare Saladworks ${item.name} prices across ${states.length} states. National average: $${nationalAvg.toFixed(2)}. Cheapest in ${cheapest.name} ($${cheapest.avgPrice.toFixed(2)}), most expensive in ${priciest.name} ($${priciest.avgPrice.toFixed(2)}). Real location data.`,
    alternates: { canonical: `https://saladworksmenu.us/menu/prices-by-state/${item.slug}` },
    openGraph: {
      title: `Saladworks ${item.name} Price by State (${year})`,
      description: `Which state has the cheapest Saladworks ${item.name}? Compare real prices across ${states.length} states.`,
      url: `https://saladworksmenu.us/menu/prices-by-state/${item.slug}`,
      type: "website",
    },
  }
}

export default function PricesByStatePage({ params }: Props) {
  const found = findItemAcrossStates(params.item)
  const { states, nationalAvg } = getItemStateComparison(params.item)
  if (!found || states.length < 2) notFound()

  const { item, category } = found
  const dataDate = getDataDate()
  const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  const monthYear = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
  const year = new Date().getFullYear()

  const cheapest = states[0]
  const priciest = states[states.length - 1]
  const totalLocations = states.reduce((sum, s) => sum + s.locationCount, 0)
  const spread = Math.round((priciest.avgPrice - cheapest.avgPrice) * 100) / 100

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Saladworks ${item.name}`,
    ...(item.image ? { "image": `https://saladworksmenu.us${item.image}` } : {}),
    "description": item.description,
    "brand": { "@type": "Brand", "name": "SaladWorks" },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://saladworksmenu.us/menu/prices-by-state/${item.slug}`,
      "priceCurrency": "USD",
      "lowPrice": Math.min(...states.map(s => s.minPrice)),
      "highPrice": Math.max(...states.map(s => s.maxPrice)),
      "offerCount": totalLocations,
      "availability": "https://schema.org/InStock"
    }
  }

  const faqs = [
    { question: `Which state has the cheapest Saladworks ${item.name}?`, answer: `${cheapest.name} has the cheapest Saladworks ${item.name} at $${cheapest.avgPrice.toFixed(2)} on average across ${cheapest.locationCount} location${cheapest.locationCount > 1 ? 's' : ''}, as of ${prettyDate}. The most expensive state is ${priciest.name} at $${priciest.avgPrice.toFixed(2)}.` },
    { question: `What is the national average price of the Saladworks ${item.name}?`, answer: `The national average price of the ${item.name} is $${nationalAvg.toFixed(2)}, computed from ${totalLocations} Saladworks locations across ${states.length} states as of ${monthYear}.` },
    { question: `How much do Saladworks ${item.name} prices vary between states?`, answer: `Average ${item.name} prices vary by $${spread.toFixed(2)} between the cheapest state (${cheapest.name}, $${cheapest.avgPrice.toFixed(2)}) and the most expensive (${priciest.name}, $${priciest.avgPrice.toFixed(2)}). Local rent, labor costs, and market conditions drive the differences.` },
    { question: `Why do Saladworks prices differ by state?`, answer: `Saladworks locations are franchised, so each restaurant sets prices based on local operating costs. That is why the same ${item.name} can cost $${cheapest.avgPrice.toFixed(2)} in ${cheapest.name} but $${priciest.avgPrice.toFixed(2)} in ${priciest.name}. All prices on this page come from live location menus, not estimates.` },
  ]

  return (
    <div className="flex flex-col w-full bg-site-white">
      <JsonLd data={productSchema} />

      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Menu & Prices", href: "/menu" },
        { label: `${item.name} Price by State`, href: "#" }
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-deep via-[#2d1a0a] to-brand-deep py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-[30px] md:text-[44px] font-black text-white leading-tight tracking-tight mb-3">
            Saladworks {item.name} Price by State ({year})
          </h1>
          <p className="text-brand-orange text-[18px] md:text-[24px] font-black mb-4">
            National Average: ${nationalAvg.toFixed(2)} | Updated {prettyDate}
          </p>
          <p className="text-gray-300 text-[16px] max-w-3xl mx-auto leading-relaxed">
            The Saladworks {item.name} costs <strong className="text-white">${nationalAvg.toFixed(2)}</strong> on average nationally as of {monthYear}.
            It is cheapest in <strong className="text-white">{cheapest.name}</strong> (${cheapest.avgPrice.toFixed(2)}) and most expensive
            in <strong className="text-white">{priciest.name}</strong> (${priciest.avgPrice.toFixed(2)}), based on real menu data
            from {totalLocations} locations across {states.length} states.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {item.image && (
            <div className="w-full md:w-4/12 shrink-0 md:sticky md:top-24">
              <div className="relative aspect-square rounded-[20px] overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
                <Image src={item.image} alt={`Saladworks ${item.name} price comparison by state`} fill priority sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
              </div>
              <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-[14px] space-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500">National Average</span>
                  <span className="font-black text-brand-orange text-[16px]">${nationalAvg.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Cheapest State</span>
                  <span className="font-bold text-green-600">{cheapest.name} (${cheapest.avgPrice.toFixed(2)})</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Most Expensive</span>
                  <span className="font-bold text-red-500">{priciest.name} (${priciest.avgPrice.toFixed(2)})</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Category</span>
                  <span className="font-bold text-site-black">{category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Data Updated</span>
                  <span className="font-bold text-site-black">{prettyDate}</span>
                </div>
              </div>
            </div>
          )}

          <div className="w-full md:flex-1">
            <h2 className="text-[24px] md:text-[28px] font-black text-site-black mb-6">
              {item.name} Average Price in Every State
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-deep">
                    <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider">State</th>
                    <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider text-center hidden sm:table-cell">Locations</th>
                    <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider text-center hidden sm:table-cell">Range</th>
                    <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider text-right">Average</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {states.map((s, i) => {
                    const diff = Math.round((s.avgPrice - nationalAvg) * 100) / 100
                    return (
                      <tr key={s.slug} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-5">
                          <Link href={`/menu/${s.slug}/${item.slug}`} className="font-semibold text-site-black hover:text-brand-orange transition-colors text-[14px]">
                            {item.name} in {s.name}
                          </Link>
                          {i === 0 && <span className="ml-2 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Cheapest</span>}
                          {i === states.length - 1 && <span className="ml-2 text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Highest</span>}
                        </td>
                        <td className="py-3 px-5 text-gray-500 text-[14px] text-center hidden sm:table-cell">{s.locationCount}</td>
                        <td className="py-3 px-5 text-gray-500 text-[14px] text-center hidden sm:table-cell">
                          {s.minPrice !== s.maxPrice ? `$${s.minPrice.toFixed(2)}–$${s.maxPrice.toFixed(2)}` : `$${s.minPrice.toFixed(2)}`}
                        </td>
                        <td className="py-3 px-5 text-right">
                          <span className="text-brand-orange font-bold text-[15px]">${s.avgPrice.toFixed(2)}</span>
                          {Math.abs(diff) >= 0.01 && (
                            <span className={`block text-[11px] font-semibold ${diff < 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {diff < 0 ? '−' : '+'}${Math.abs(diff).toFixed(2)} vs national
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[13px] text-gray-500 mt-4">
              Averages computed from live menu data at {totalLocations} Saladworks locations, updated {prettyDate}. Individual restaurants may vary slightly.
            </p>

            <div className="mt-8">
              <Link href="/menu/prices-by-state" className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-[15px] hover:underline">
                Compare prices for other menu items <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-16 max-w-4xl">
        <FaqSection faqs={faqs} />
      </section>
    </div>
  )
}
