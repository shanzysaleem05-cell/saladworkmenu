import { isStateSlug, getStateMenuData, getStateSlugs, getDataDate } from "@/lib/stateData"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { FaqSection } from "@/components/FaqSection"

type Props = {
  params: { state: string }
}

export async function generateStaticParams() {
  return getStateSlugs().map(state => ({ state }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = isStateSlug(params.state) ? getStateMenuData(params.state) : null
  if (!data) return { title: "Not Found" }
  const { state } = data

  return {
    title: { absolute: `Saladworks ${state.name} - All Menu & Price Pages` },
    description: `Directory of every Saladworks ${state.name} price page: full local menu plus individual price and calorie pages for every item, sourced from ${state.locationCount} locations.`,
    alternates: { canonical: `https://saladworksmenu.us/directory/${state.slug}` },
  }
}

export default function StateDirectoryPage({ params }: Props) {
  const data = isStateSlug(params.state) ? getStateMenuData(params.state) : null
  if (!data) notFound()

  const { state, categories } = data
  const dataDate = getDataDate()
  const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <div className="flex flex-col w-full bg-site-white">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Directory", href: "/directory" },
        { label: state.name, href: "#" }
      ]} />

      <section className="bg-gradient-to-r from-brand-deep via-[#2d1a0a] to-brand-deep py-10">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-[28px] md:text-[40px] font-black text-white leading-tight tracking-tight mb-3">
            Saladworks {state.name} - All Price Pages
          </h1>
          <p className="text-gray-300 text-[15px] max-w-2xl mx-auto leading-relaxed">
            {totalItems} menu item pages with real {state.name} prices from {state.locationCount} location{state.locationCount > 1 ? 's' : ''} in {state.cities.join(', ')}. Updated {prettyDate}.
          </p>
          <Link href={`/menu/${state.slug}`} className="inline-block mt-5 bg-brand-orange text-white font-black text-[14px] px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            View Full {state.name} Menu
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <p className="text-gray-600 text-[15px] leading-relaxed mb-10 max-w-3xl">
          Every Saladworks {state.name} menu item below links to its own price and calorie page, built from real
          order data at {state.locationCount} location{state.locationCount > 1 ? 's' : ''} across {state.cities.join(', ')}.
          For the full local menu on one page, see the <Link href={`/menu/${state.slug}`} className="text-brand-orange font-bold hover:underline">Saladworks {state.name} menu</Link>.
        </p>
        {categories.map(category => (
          <div key={category.slug} className="mb-10">
            <h2 className="text-[20px] font-black text-site-black mb-4">{category.name} in {state.name}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
              {category.items.map(item => (
                <li key={item.chainProductId}>
                  <Link href={`/menu/${state.slug}/${item.slug}`} className="text-[14px] text-gray-600 hover:text-brand-orange transition-colors">
                    {item.name} Price in {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <FaqSection faqs={[
        {
          question: `How many Saladworks locations are in ${state.name}?`,
          answer: `There are ${state.locationCount} Saladworks locations in ${state.name}, across ${state.cities.length} cit${state.cities.length > 1 ? 'ies' : 'y'}: ${state.cities.join(', ')}.`
        },
        {
          question: `How many menu items have their own price page for ${state.name}?`,
          answer: `${totalItems} Saladworks menu items have a dedicated price and calorie page for ${state.name}, updated ${prettyDate} from real location menu data.`
        },
        {
          question: `Where can I see the full Saladworks ${state.name} menu on one page?`,
          answer: `Visit the Saladworks ${state.name} menu page for every item, category, price, and location hours in one place, instead of browsing item-by-item.`
        },
      ]} />
    </div>
  )
}
