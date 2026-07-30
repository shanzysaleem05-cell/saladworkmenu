import { menuData } from "@/data/menuData"
import { isStateSlug, getStateMenuData, getAllStates, getStateSlugs, getDataDate, getStateLocations, formatTime12, findItemAcrossStates, getItemStateComparison } from "@/lib/stateData"
import { slugify } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { FoodCard } from "@/components/FoodCard"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"


type Props = {
  params: { slug1: string }
}

export async function generateStaticParams() {
  const params: { slug1: string }[] = []
  
  // Existing item pages
  for (const category of menuData) {
    for (const item of category.items) {
      params.push({ slug1: slugify(item.name) })
    }
  }

  // State menu pages
  const stateSlugs = getStateSlugs()
  for (const stateSlug of stateSlugs) {
    params.push({ slug1: stateSlug })
  }
  
  return params
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug1 } = params

  if (isStateSlug(slug1)) {
    const data = getStateMenuData(slug1)
    if (!data) return { title: "Menu Not Found" }
    const { state } = data
    const dataDate = getDataDate()
    const month = new Date(dataDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })
    const cityPreview = state.cities.slice(0, 5).join(', ') + (state.cities.length > 5 ? ' and more' : '')

    return {
      title: { absolute: `Saladworks Menu Prices in ${state.name} (${new Date().getFullYear()})` },
      description: `Looking for Saladworks in ${cityPreview}? Explore the complete ${state.name} menu with updated ${new Date().getFullYear()} prices, calories, and nutrition for salads, wraps, and soups at ${state.locationCount} locations.`,
      keywords: [
        `Saladworks menu ${state.name}`,
        `Saladworks prices ${state.name}`,
        `Saladworks ${state.name} menu ${new Date().getFullYear()}`,
        `Saladworks salad prices ${state.name}`,
        `Saladworks wraps ${state.name}`,
        ...state.cities.slice(0, 8).map(city => `Saladworks ${city} menu`),
      ],
      alternates: { canonical: `https://saladworksmenu.us/menu/${state.slug}` },
      openGraph: {
        title: `Saladworks Menu & Prices in ${state.name} (${month})`,
        description: `Complete Saladworks menu with ${new Date().getFullYear()} prices for ${state.name}. ${state.locationCount} location${state.locationCount > 1 ? 's' : ''} across ${state.cities.join(', ')}.`,
        url: `https://saladworksmenu.us/menu/${state.slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Saladworks Menu Prices in ${state.name} - ${month}`,
        description: `Full Saladworks menu with real prices for ${state.name}.`,
      },
    }
  }

  let foundItem: any
  for (const category of menuData) {
    const item = category.items.find(
      (i) => slugify(i.name) === slug1
    )
    if (item) { foundItem = item; break }
  }

  if (!foundItem) return { title: "Item Not Found" }

  const canonicalUrl = `https://saladworksmenu.us/menu/${slug1}`

  return {
    title: { absolute: `${foundItem.name} - Price & Nutrition | SaladWorks` },
    description: `Everything you need to know about the Saladworks ${foundItem.name}. Discover the latest prices, exact calorie counts, ingredients, and detailed nutritional information.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${foundItem.name} Calories & Nutrition | SaladWorks Menu Prices`,
      description: `Everything you need to know about the Saladworks ${foundItem.name}. Discover the latest prices, exact calorie counts, ingredients, and detailed nutritional information.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${foundItem.name} Calories & Nutrition | SaladWorks Menu Prices`,
      description: `Everything you need to know about the Saladworks ${foundItem.name}. Discover the latest prices, exact calorie counts, ingredients, and detailed nutritional information.`,
    }
  }
}

export default function Slug1Page({ params }: Props) {
  const { slug1 } = params

  if (isStateSlug(slug1)) {
    return <StateMenuPage stateSlug={slug1} />
  }
  return <ItemDetailPage itemSlug={slug1} />
}

// ---------------------------------------------------------------------------
// EXISTING ITEM DETAIL PAGE
// ---------------------------------------------------------------------------
function ItemDetailPage({ itemSlug }: { itemSlug: string }) {
  let foundItem: any
  let foundCategory: any

  for (const category of menuData) {
    const item = category.items.find(
      (i) => slugify(i.name) === itemSlug
    )
    if (item) {
      foundItem = item
      foundCategory = category
      break
    }
  }

  if (!foundItem || !foundCategory) {
    notFound()
  }

  const fallbackImg = "/hot-honey-chicken-bowl.webp"

  // Pull real data from live location menus when this item exists there â€”
  // never fabricate calories or nutrition numbers.
  const liveItem = findItemAcrossStates(itemSlug)
  const { states: itemStates, nationalAvg } = getItemStateComparison(itemSlug)
  const calories: number | null = liveItem?.item.calories ?? null
  const displayPrice: number = nationalAvg > 0 ? nationalAvg : foundItem.price
  const hasComparison = itemStates.length >= 2

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": foundItem.name,
    "image": foundItem.image ? `https://saladworksmenu.us${foundItem.image}` : fallbackImg,
    "description": foundItem.description,
    "brand": { "@type": "Brand", "name": "SaladWorks" },
    "offers": itemStates.length > 0
      ? {
          "@type": "AggregateOffer",
          "url": `https://saladworksmenu.us/menu/${itemSlug}`,
          "priceCurrency": "USD",
          "lowPrice": Math.min(...itemStates.map(s => s.minPrice)),
          "highPrice": Math.max(...itemStates.map(s => s.maxPrice)),
          "offerCount": itemStates.reduce((sum, s) => sum + s.locationCount, 0),
          "availability": "https://schema.org/InStock"
        }
      : {
          "@type": "Offer",
          "url": `https://saladworksmenu.us/menu/${itemSlug}`,
          "priceCurrency": "USD",
          "price": foundItem.price,
          "availability": "https://schema.org/InStock"
        },
    ...(calories !== null ? {
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": `${calories} calories`
      }
    } : {})
  }

  return (
    <div className="flex flex-col w-full bg-site-white pb-24">
      <JsonLd data={productSchema} />
      
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Menu", href: "/menu" },
        { label: foundCategory.title, href: `/menu#${foundCategory.id}` },
        { label: foundItem.name, href: "#" }
      ]} />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full md:w-1/2 shrink-0">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
              <Image src={foundItem.image || fallbackImg} alt={foundItem.name} title={foundItem.name} fill priority sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brand-orange/10 text-brand-orange px-2 py-1 rounded text-[11px] font-bold">
                {foundCategory.title}
              </span>
            </div>
            <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              {foundItem.name}
            </h1>
            <p className="text-[#6b7280] text-[15px] leading-relaxed mb-8">
              {foundItem.description}. This {foundCategory.title.toLowerCase()} is made fresh to order and packed with bold, satisfying flavors. Perfect for a quick lunch or paired with your favorite sides for a full meal.
            </p>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
              <div className="flex-1 p-6 flex flex-col items-center justify-center border-r border-gray-200 bg-gray-50/50">
                <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">{nationalAvg > 0 ? 'National Avg' : 'Price (Est.)'}</span>
                <span className="text-[32px] font-black text-brand-orange">${displayPrice.toFixed(2)}</span>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50/50">
                <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">Calories</span>
                <span className="text-[32px] font-black text-site-black">{calories !== null ? calories : 'Varies'}</span>
              </div>
            </div>
            {hasComparison && (
              <div className="mb-8 -mt-4">
                <Link href={`/menu/prices-by-state/${itemSlug}`} className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-[14px] hover:underline">
                  Compare {foundItem.name} prices in all {itemStates.length} states <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
            <p className="text-[#6b7280] text-[15px] leading-relaxed mb-8">
              Here is what stands out about the {foundItem.name}: It is completely satisfying, which makes it one of the better options you'll find at SaladWorks. Sitting comfortably in the middle of our menu - it is satisfying enough to be a full meal, and at ${displayPrice.toFixed(2)}{nationalAvg > 0 ? ' on average nationally' : ''} it's not going to hurt your wallet.
            </p>
            <div className="border-l-4 border-brand-orange bg-brand-orange/5 p-4 rounded-r-lg mb-8">
              <p className="text-site-black text-[14px] italic leading-relaxed">
                <span className="font-bold text-brand-orange">Pro tip:</span> The {foundItem.name} is genuinely one of the best budget picks at SaladWorks. Add a drink and a side and you've got a complete meal!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-semibold">Fresh Ingredients</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-semibold">Customizable</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-semibold">Healthy Choice</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-12 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="text-[20px] font-extrabold text-site-black mb-6 flex items-center gap-2">
              {foundItem.name} - Nutrition Facts
            </h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
              <div className="bg-site-black text-site-white p-4">
                <h3 className="font-black text-[24px] tracking-tight leading-none mb-1">Nutrition Facts</h3>
                <p className="text-[12px] text-gray-300">1 serving â€¢ {foundItem.name}</p>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-end border-b-[6px] border-site-black pb-2 mb-4">
                  <span className="font-extrabold text-[18px]">Calories</span>
                  <span className="font-black text-[28px] leading-none">{calories !== null ? calories : 'Varies'}</span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {calories !== null
                    ? `The ${foundItem.name} contains approximately ${calories} calories in its standard preparation, per Saladworks menu data. Customizations like extra proteins, dressings, or premium toppings change the total.`
                    : `Calories for the ${foundItem.name} depend on your customizations and portion size. Check the full nutrition guide or ask your local Saladworks for exact figures.`}
                </p>
                <p className="text-[10px] text-gray-500 mt-4 leading-snug">
                  * Full macro breakdowns (fat, sodium, carbs, protein) vary by customization â€” see our <Link href="/nutrition" className="underline">nutrition guide</Link>.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <h2 className="text-[24px] font-extrabold text-site-black mb-6">
              About the {foundItem.name} at SaladWorks
            </h2>
            <div className="prose prose-sm text-[#6b7280] mb-12">
              <p className="mb-4 text-[15px] leading-relaxed">
                The {foundItem.name} has been part of the SaladWorks experience for years, and it holds its spot on the menu for good reason. At ${displayPrice.toFixed(2)}{nationalAvg > 0 ? ' on average across all locations' : ''}, it sits in a competitive price range for our {foundCategory.title.toLowerCase()} category - an accessible pick that satisfies every craving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[24px] font-extrabold text-site-black">More {foundCategory.title}</h2>
          <Link href={`/menu#${foundCategory.id}`} className="text-[13px] font-bold text-[#6b7280] hover:text-brand-orange transition-colors flex items-center">
            All {foundCategory.title} <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16">
          {foundCategory.items.slice(0, 4).map((item: any) => {
            const itemLive = findItemAcrossStates(slugify(item.name))
            return (
              <FoodCard key={item.id} name={item.name} description={item.description} price={item.price} calories={itemLive?.item.calories ?? null} image={item.image || fallbackImg} category={foundCategory.title} />
            )
          })}
        </div>
      </section>

      <FaqSection faqs={[
        {
          question: `How much does the ${foundItem.name} cost?`,
          answer: `The Saladworks ${foundItem.name} costs $${displayPrice.toFixed(2)}${nationalAvg > 0 ? ' on average nationally' : ''}. Prices may vary slightly by location â€” see our ${hasComparison ? `state-by-state price comparison below` : `nutrition guide`} for exact local pricing.`
        },
        {
          question: `How many calories are in the ${foundItem.name}?`,
          answer: calories !== null
            ? `The ${foundItem.name} contains approximately ${calories} calories in its standard preparation. Customizations like extra proteins, dressings, or premium toppings will change the total.`
            : `Calorie counts for the ${foundItem.name} vary by customization and portion size. Check our nutrition guide or ask your local Saladworks for exact figures.`
        },
        {
          question: `Is the ${foundItem.name} available for catering?`,
          answer: `Saladworks catering menus rotate by location and season, so availability of the ${foundItem.name} specifically can vary. Check our catering page or contact your local Saladworks to confirm what's available for group orders.`
        },
        {
          question: `Is the ${foundItem.name} vegetarian?`,
          answer: `Whether the ${foundItem.name} is vegetarian depends on its specific ingredients â€” see the description above for what's included. Saladworks allows substitutions, so you can typically customize most ${foundCategory.title.toLowerCase()} to fit vegetarian or vegan preferences.`
        },
      ]} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// STATE MENU PAGE
// ---------------------------------------------------------------------------
function StateMenuPage({ stateSlug }: { stateSlug: string }) {
  const data = getStateMenuData(stateSlug)
  if (!data) notFound()

  const { state, categories } = data
  const dataDate = getDataDate()
  const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  const fallbackImg = "/hot-honey-chicken-bowl.webp"
  const allStates = getAllStates()
  const year = new Date().getFullYear()
  const locations = getStateLocations(stateSlug)

  const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const
  const DAY_LABEL: Record<string, string> = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' }

  const restaurantSchemas = locations.map(loc => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": `Saladworks - ${loc.name}`,
    "servesCuisine": ["Salads", "Wraps", "Soups"],
    "telephone": loc.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": loc.address,
      "addressLocality": loc.city,
      "addressRegion": state.code,
      "postalCode": loc.postalCode,
      "addressCountry": "US"
    },
    ...(loc.latitude !== undefined && loc.longitude !== undefined
      ? { "geo": { "@type": "GeoCoordinates", "latitude": loc.latitude, "longitude": loc.longitude } }
      : {}),
    "openingHoursSpecification": DAY_ORDER.flatMap(day => {
      const h = loc.hours?.[day]
      return h && 'open' in h
        ? [{ "@type": "OpeningHoursSpecification", "dayOfWeek": DAY_LABEL[day], "opens": h.open, "closes": h.close }]
        : []
    }),
    "parentOrganization": { "@type": "Organization", "name": "Saladworks" }
  }))

  // Compute stats
  const allPrices = categories.flatMap(c => c.items.map(i => i.price))
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0)
  const minMenuPrice = allPrices.length > 0 ? Math.min(...allPrices).toFixed(2) : '0'
  const maxMenuPrice = allPrices.length > 0 ? Math.max(...allPrices).toFixed(2) : '0'
  const avgMenuPrice = allPrices.length > 0 ? (allPrices.reduce((a, b) => a + b, 0) / allPrices.length).toFixed(2) : '0'

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Saladworks Menu in ${state.name}`,
    "url": `https://saladworksmenu.us/menu/${state.slug}`,
    "numberOfItems": totalItems,
    "itemListElement": categories.flatMap((cat, ci) =>
      cat.items.map((item, ii) => ({
        "@type": "ListItem",
        "position": ci * 100 + ii + 1,
        "item": { "@type": "Product", "name": item.name, "description": item.description, "offers": { "@type": "AggregateOffer", "priceCurrency": "USD", "lowPrice": item.minPrice ?? item.price, "highPrice": item.maxPrice ?? item.price, "availability": "https://schema.org/InStock" } }
      }))
    )
  }

  const faqs = [
    { question: `How much does Saladworks cost in ${state.name}?`, answer: `Based on real data from ${state.locationCount} ${state.name} locations, a typical meal at Saladworks costs $${avgMenuPrice}. Menu items range from $${minMenuPrice} to $${maxMenuPrice}. Prices include salads, protein bowls, wraps, soups, and more.` },
    { question: `What is the cheapest item at Saladworks in ${state.name}?`, answer: `The most affordable items at Saladworks in ${state.name} start at $${minMenuPrice}. Beverages and kids' meals are also budget-friendly options.` },
    { question: `What is the most expensive item at Saladworks in ${state.name}?`, answer: `The highest-priced item in ${state.name} is around $${maxMenuPrice}. Premium protein bowls and signature salads are typically among the priciest options.` },
    { question: `How many Saladworks restaurants are in ${state.name}?`, answer: `There are ${state.locationCount} Saladworks locations in ${state.name}. The prices on this page are aggregated from all ${state.locationCount} of them to give you the most accurate local pricing.` },
    { question: `Are Saladworks prices different in ${state.name} compared to other states?`, answer: `Yes. Saladworks menu prices vary by state based on local rent, labor costs, and market conditions. ${state.name} prices shown here are pulled directly from real ${state.name} local restaurants and may differ from national average guides or prices in other states.` },
    { question: `Does Saladworks offer discounts or coupons in ${state.name}?`, answer: `Saladworks occasionally offers discounts through their loyalty program and local promotions. Check our coupons page for the latest deals available in ${state.name}.` },
  ]

  // Group consecutive days sharing identical hours: "Monâ€“Fri: 10:30 AM â€“ 9:00 PM"
  const hourGroups = (loc: (typeof locations)[number]): string[] => {
    const groups: { start: string; end: string; text: string }[] = []
    for (const day of DAY_ORDER) {
      const h = loc.hours?.[day]
      const text = h && 'open' in h ? `${formatTime12(h.open)} â€“ ${formatTime12(h.close)}` : 'Closed'
      const label = DAY_LABEL[day].slice(0, 3)
      const last = groups[groups.length - 1]
      if (last && last.text === text) {
        last.end = label
      } else {
        groups.push({ start: label, end: label, text })
      }
    }
    return groups.map(g => `${g.start === g.end ? g.start : `${g.start}â€“${g.end}`}: ${g.text}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <JsonLd data={itemListSchema} />
      {restaurantSchemas.length > 0 && <JsonLd data={restaurantSchemas} />}

      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Menu & Prices", href: "/menu" },
        { label: `Saladworks ${state.name} Menu Prices`, href: "#" }
      ]} />

      {/* Gradient Hero */}
      <section className="bg-gradient-to-r from-brand-deep via-[#2d1a0a] to-brand-deep pt-14 pb-12 px-4" data-updated={dataDate}>
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-[32px] md:text-[48px] font-black text-white mb-3 tracking-tight leading-tight">
            Saladworks Menu Prices in {state.name} ({year})
          </h1>
          <p className="text-brand-orange text-[18px] md:text-[22px] font-black mb-4">
            Real Local Prices - Updated {prettyDate}
          </p>
          <p className="text-gray-300 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
            {totalItems} menu items with real {state.name} prices sourced from {state.locationCount} location{state.locationCount > 1 ? 's' : ''} - actual local prices, verified {prettyDate}.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[13px] font-bold border border-white/20">
              ðŸ“ {state.locationCount} {state.name} Location{state.locationCount > 1 ? 's' : ''}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[13px] font-bold border border-white/20">
              ðŸ’° From ${minMenuPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[13px] font-bold border border-white/20">
              ðŸ”¥ Up to ${maxMenuPrice}
            </span>
          </div>
        </div>
      </section>

      {/* Date Bar */}
      <div className="bg-brand-orange text-white text-center py-2.5 text-[13px] font-bold flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          ðŸ“… Price Guide Updated: <span className="bg-white text-brand-orange px-2.5 py-0.5 rounded-md font-black text-[12px]">{prettyDate}</span>
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center gap-1.5">
          âœ… Real {state.name} prices from {state.locationCount} location{state.locationCount > 1 ? 's' : ''}
        </span>
      </div>

      {categories.map((category) => {
        const catPrices = category.items.map(i => i.price)
        const catMin = Math.min(...catPrices).toFixed(2)
        const catMax = Math.max(...catPrices).toFixed(2)
        return (
          <section key={category.slug} id={category.slug} className="py-12 border-t border-gray-200/60" data-updated={dataDate}>
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-[28px] md:text-[32px] font-black text-site-black mb-2 tracking-tight">Saladworks {category.name} Prices in {state.name}</h2>
              <p className="text-gray-500 text-[15px] mb-8">{category.items.length} items â€¢ ${catMin}â€“${catMax} â€¢ Updated {prettyDate}</p>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10">
                {category.items.slice(0, 8).map((item) => {
                  const hasRange = item.minPrice !== undefined && item.maxPrice !== undefined && item.minPrice !== item.maxPrice
                  const rangeText = hasRange ? `$${item.minPrice!.toFixed(2)}â€“$${item.maxPrice!.toFixed(2)}` : undefined
                  return (
                    <FoodCard
                      key={item.chainProductId}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      priceRangeText={rangeText}
                      calories={item.calories ?? null}
                      image={item.image || fallbackImg}
                      category={category.name}
                      href={`/menu/${state.slug}/${item.slug}`}
                    />
                  )
                })}
              </div>
              
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-deep border-b-0">
                      <th className="py-4 px-6 font-bold text-[13px] text-white uppercase tracking-wider">Menu Item</th>
                      <th className="py-4 px-6 font-bold text-[13px] text-white uppercase tracking-wider text-center hidden sm:table-cell">Calories</th>
                      <th className="py-4 px-6 font-bold text-[13px] text-white uppercase tracking-wider text-right w-40">Price Range</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {category.items.map((item) => {
                      const hasRange = item.minPrice !== undefined && item.maxPrice !== undefined && item.minPrice !== item.maxPrice
                      const rangeText = hasRange ? `$${item.minPrice!.toFixed(2)}â€“$${item.maxPrice!.toFixed(2)}` : `$${item.price.toFixed(2)}`
                      return (
                        <tr key={item.chainProductId} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 border-0"><Link href={`/menu/${state.slug}/${item.slug}`} className="font-semibold text-site-black hover:text-brand-green transition-colors text-[14px]">{item.name}</Link></td>
                          <td className="py-4 px-6 text-gray-500 text-[14px] text-center border-0 hidden sm:table-cell">{item.calories ? `${item.calories}` : 'Varies'}</td>
                          <td className="py-4 px-6 text-brand-orange font-bold text-right border-0 text-[15px]">{rangeText}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )
      })}

      {/* SEO Content Block */}
      <section className="py-12 border-t border-gray-200/60 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-[26px] font-black text-site-black mb-4">Saladworks Menu Prices in {state.name} ({year})</h2>
          <div className="text-gray-600 text-[16px] leading-[1.8] space-y-4">
            <p>The prices on this page come directly from the Saladworks ordering system, sourced from <strong>{state.locationCount} restaurants</strong> across {state.name}. Unlike most sites that show guessed or outdated prices, every number here was pulled from live menu data.</p>
            <p>Saladworks prices vary by state. A Hand-Cut Salad in {state.name} costs more or less than the same salad in another state. Local rent, labor costs, and market conditions all play a role. This page shows real price data for {state.name} specifically - not national averages.</p>
            <p>In {state.name}, menu items range from <strong>${minMenuPrice}</strong> to <strong>${maxMenuPrice}</strong>. The average item price across {state.locationCount} {state.name} location{state.locationCount > 1 ? 's' : ''} is approximately <strong>${avgMenuPrice}</strong>.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13px] text-amber-800">
              âš ï¸ Prices are averaged across {state.locationCount} {state.name} location{state.locationCount > 1 ? 's' : ''}. Your specific restaurant may charge slightly more or less. Always confirm with your local Saladworks.
            </div>
          </div>
        </div>
      </section>

      {/* Locations & Hours */}
      {locations.length > 0 && (
        <section className="py-14 border-t border-gray-200/60 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-[26px] font-black text-site-black mb-2">Saladworks Locations & Hours in {state.name}</h2>
            <p className="text-gray-500 text-[15px] mb-8">
              All {locations.length} Saladworks location{locations.length > 1 ? 's' : ''} in {state.name} with verified opening hours. Every price on this page comes from these restaurants.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map(loc => (
                <div key={loc.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-black text-site-black text-[15px] mb-1">{loc.city} - {loc.name}</h3>
                  <p className="text-gray-500 text-[13px] mb-3">{loc.address}, {loc.city}, {state.code} {loc.postalCode}</p>
                  <ul className="text-[13px] text-gray-600 space-y-1">
                    {hourGroups(loc).map((line, i) => (
                      <li key={i} className="font-medium">{line}</li>
                    ))}
                  </ul>
                  {loc.phone && <p className="text-brand-orange text-[13px] font-bold mt-3">{loc.phone}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* State Links */}
      <section className="py-16 border-t border-gray-200/60 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-[24px] font-black text-site-black mb-6 text-center">Saladworks Menu Prices by State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allStates.filter(s => s.slug !== state.slug).map(s => (
              <Link key={s.slug} href={`/menu/${s.slug}`} className="px-4 py-3 border border-gray-200 rounded-lg text-center font-semibold text-[14px] text-site-black hover:border-brand-green hover:text-brand-green transition-colors bg-white">{s.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-[28px] font-black text-site-black mb-2">Saladworks {state.name} - Frequently Asked Questions</h2>
        <p className="text-gray-500 text-[15px] mb-8">Based on real data from {state.locationCount} {state.name} locations, updated {prettyDate}.</p>
        <FaqSection faqs={faqs} />
      </section>
    </div>
  )
}



