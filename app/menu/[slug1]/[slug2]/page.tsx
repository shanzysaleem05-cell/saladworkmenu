import { isStateSlug, getStateItemData, getStateItemSlugs, getStateSlugs, getDataDate, getStateMenuData, getItemCityPrices, getItemStateComparison, getComparisonStates, getStateHoursSummary } from "@/lib/stateData"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { FoodCard } from "@/components/FoodCard"

type Props = {
  params: { slug1: string; slug2: string }
}

export async function generateStaticParams() {
  const params: { slug1: string; slug2: string }[] = []
  
  const stateSlugs = getStateSlugs()
  for (const stateSlug of stateSlugs) {
    const itemSlugs = getStateItemSlugs(stateSlug)
    for (const itemSlug of itemSlugs) {
      params.push({ slug1: stateSlug, slug2: itemSlug })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug1, slug2 } = params

  if (isStateSlug(slug1)) {
    const data = getStateItemData(slug1, slug2)
    if (!data) return { title: "Item Not Found" }
    const { state, item, category } = data
    const year = new Date().getFullYear()
    const priceText = item.minPrice !== undefined && item.maxPrice !== undefined && item.minPrice !== item.maxPrice
      ? `$${item.minPrice.toFixed(2)}–$${item.maxPrice.toFixed(2)}`
      : `$${item.price.toFixed(2)}`

    return {
      title: { absolute: `${item.name} Price in ${state.name} (${year}) | SaladWorks` },
      description: `The Saladworks ${item.name} costs ${priceText} in ${state.name} (${year}). Real prices sourced directly from ${state.locationCount} ${state.name} locations. See calories, nutrition, and ordering info.`,
      keywords: [
        `Saladworks ${item.name} price ${state.name}`,
        `Saladworks ${item.name} calories`,
        `Saladworks ${item.name} nutrition`,
        `${item.name} Saladworks ${state.name}`,
        `Saladworks menu ${state.name} ${year}`,
        `Is Saladworks ${item.name} healthy`,
        `how much is ${item.name} at Saladworks in ${state.name}`,
      ],
      alternates: { canonical: `https://saladworksmenu.us/menu/${state.slug}/${item.slug}` },
      openGraph: {
        title: `Saladworks ${item.name} - ${priceText} in ${state.name}`,
        description: `Real ${state.name} prices for the Saladworks ${item.name}. ${priceText} across ${state.locationCount} locations.`,
        url: `https://saladworksmenu.us/menu/${state.slug}/${item.slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Saladworks ${item.name} - ${priceText} in ${state.name}`,
        description: `Price, calories & nutrition for ${item.name} at Saladworks ${state.name}.`,
      },
    }
  }

  return { title: "Page Not Found" }
}

export default function Slug2Page({ params }: Props) {
  const { slug1, slug2 } = params

  if (isStateSlug(slug1)) {
    const data = getStateItemData(slug1, slug2)
    if (!data) notFound()

    const { state, item, category } = data
    const dataDate = getDataDate()
    const prettyDate = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    const year = new Date().getFullYear()
    const fallbackImg = "/hot-honey-chicken-bowl.webp"

    const hasPriceRange = item.minPrice !== undefined && item.maxPrice !== undefined && item.minPrice !== item.maxPrice
    const priceRangeText = hasPriceRange ? `$${item.minPrice!.toFixed(2)}–$${item.maxPrice!.toFixed(2)}` : `$${item.price.toFixed(2)}`
    const calDisplay = item.calories ? `${item.calories} Cal` : item.calorieLabel || null

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${item.name} - Saladworks ${state.name}`,
      "image": item.image ? `https://saladworksmenu.us${item.image}` : fallbackImg,
      "description": item.description,
      "brand": { "@type": "Brand", "name": "SaladWorks" },
      "offers": {
        "@type": "AggregateOffer",
        "url": `https://saladworksmenu.us/menu/${state.slug}/${item.slug}`,
        "priceCurrency": "USD",
        "lowPrice": item.minPrice ?? item.price,
        "highPrice": item.maxPrice ?? item.price,
        "offerCount": state.locationCount,
        "availability": "https://schema.org/InStock",
        "areaServed": { "@type": "State", "name": state.name }
      },
      ...(item.calories ? { "nutrition": { "@type": "NutritionInformation", "calories": `${item.calories} calories` } } : {})
    }

    const stateMenuData = getStateMenuData(slug1)
    const currentCategory = stateMenuData?.categories.find(c => c.name === category)
    const relatedItems = currentCategory?.items.filter(i => i.slug !== item.slug).slice(0, 6) || []

    // Compute overall state price stats
    const allPrices = stateMenuData?.categories.flatMap(c => c.items.map(i => i.price)) || []
    const stateAvgPrice = allPrices.length > 0 ? (allPrices.reduce((a, b) => a + b, 0) / allPrices.length).toFixed(2) : null

    // Per-city prices for this item within the state (cheapest first)
    const cityPrices = getItemCityPrices(slug1, slug2)
    const cheapestCity = cityPrices.length > 1 ? cityPrices[0] : null
    const priciestCity = cityPrices.length > 1 ? cityPrices[cityPrices.length - 1] : null
    const itemLocationCount = cityPrices.reduce((sum, c) => sum + c.locationCount, 0)

    // Cross-state comparison for this item
    const { states: allStateStats, nationalAvg } = getItemStateComparison(slug2)
    const comparisonStates = getComparisonStates(slug2, slug1)
    const nationalDiff = nationalAvg > 0 ? Math.round((item.price - nationalAvg) * 100) / 100 : null
    const nationalDiffText = nationalDiff === null || Math.abs(nationalDiff) < 0.01
      ? `matching the national average of $${nationalAvg.toFixed(2)}`
      : nationalDiff > 0
        ? `$${nationalDiff.toFixed(2)} above the national average of $${nationalAvg.toFixed(2)}`
        : `$${Math.abs(nationalDiff).toFixed(2)} below the national average of $${nationalAvg.toFixed(2)}`
    const cheapestState = allStateStats.length > 1 ? allStateStats[0] : null

    // Typical operating hours across the state's locations
    const hoursSummary = getStateHoursSummary(slug1)
    const monthYear = new Date(dataDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })

    const faqs = [
      { question: `How much does ${item.name} cost at Saladworks in ${state.name}?`, answer: `As of ${prettyDate}, the ${item.name} is priced at ${priceRangeText} across ${state.locationCount} Saladworks locations in ${state.name}. The average price is $${item.price.toFixed(2)}. Prices may vary slightly by specific location or third-party delivery apps.` },
      { question: `How many calories are in the Saladworks ${item.name}?`, answer: item.calories ? `The ${item.name} contains approximately ${item.calories} calories per serving. Keep in mind that customizing your order with extra dressings, proteins, or premium toppings will change the total calorie count.` : `Exact calorie information for the ${item.name} varies based on customization and portion size. The standard portion is a moderate-calorie option. Please check with your local ${state.name} store for specific nutritional details.` },
      { question: `Where can I order the ${item.name} in ${state.name}?`, answer: `You can order the ${item.name} at any of the ${state.locationCount} Saladworks locations in ${state.name}, including cities like ${state.cities.slice(0, 3).join(', ')}. Available for dine-in, takeout, and delivery through popular apps.` },
      { question: `Is the Saladworks ${item.name} customizable?`, answer: `Yes! Like most items at Saladworks, the ${item.name} can be heavily customized. You can add extra proteins, swap out the base, change dressings, or remove ingredients to match your dietary preferences at no extra charge for most modifications.` },
      { question: `How does the ${item.name} price in ${state.name} compare to other states?`, answer: `The ${item.name} averages $${item.price.toFixed(2)} in ${state.name}, ${nationalDiffText}. ${cheapestState ? `The cheapest state for this item is ${cheapestState.name} at $${cheapestState.avgPrice.toFixed(2)} on average.` : ''} Prices are pulled directly from real restaurant data in each state, not national estimates.` },
      ...(cheapestCity && priciestCity && cheapestCity.price !== priciestCity.price ? [{ question: `Which city in ${state.name} has the cheapest ${item.name}?`, answer: `${cheapestCity.city} has the lowest average price for the ${item.name} in ${state.name} at $${cheapestCity.price.toFixed(2)}, while ${priciestCity.city} is the most expensive at $${priciestCity.price.toFixed(2)}. Prices are averaged per city from live location menu data as of ${prettyDate}.` }] : []),
      { question: `Does Saladworks offer discounts or coupons for the ${item.name} in ${state.name}?`, answer: `Saladworks occasionally offers promotions and discounts through their loyalty program and local deals. Check our coupons page for the latest discounts available in ${state.name}. Delivery apps may also offer first-time user promos.` },
    ]

    return (
      <div className="flex flex-col w-full bg-site-white" data-updated={dataDate}>
        <JsonLd data={productSchema} />

        {/* SEO-Optimized Breadcrumb */}
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Menu & Prices", href: "/menu" },
          { label: `Saladworks ${state.name} Menu`, href: `/menu/${state.slug}` },
          { label: category, href: `/menu/${state.slug}` },
          { label: `${item.name} Price`, href: "#" }
        ]} />

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

            {/* Left Column - Image + Quick Facts */}
            <div className="w-full md:w-1/2 shrink-0">
              <div className="relative aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
                <Image src={item.image || fallbackImg} alt={`Saladworks ${item.name} in ${state.name} - ${priceRangeText}`} fill priority sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
              </div>

              {/* Quick Facts Card */}
              <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-black text-site-black text-[15px] mb-3">Quick Facts</h3>
                <div className="space-y-3 text-[14px]">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Average Price</span>
                    <span className="font-black text-brand-orange text-[16px]">${item.price.toFixed(2)}</span>
                  </div>
                  {hasPriceRange && (
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Price Range</span>
                      <span className="font-bold text-site-black">{priceRangeText}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Calories</span>
                    <span className="font-bold text-site-black">{calDisplay || 'Varies by portion'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Category</span>
                    <span className="font-bold text-site-black">{category}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">State</span>
                    <span className="font-bold text-site-black">{state.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-bold text-site-black">{prettyDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-brand-orange/10 text-brand-orange px-2 py-1 rounded text-[11px] font-bold">
                  {category}
                </span>
              </div>
              <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
                {item.name}
              </h1>
              <p className="text-[#6b7280] text-[15px] leading-relaxed mb-8">
                {item.description} Available at {state.locationCount} Saladworks location{state.locationCount > 1 ? 's' : ''} in {state.name}, updated {prettyDate}.
              </p>

              <div className="flex border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
                <div className="flex-1 p-6 flex flex-col items-center justify-center border-r border-gray-200 bg-gray-50/50">
                  <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">{hasPriceRange ? 'Price Range' : 'Average Price'}</span>
                  <span className="text-[32px] font-black text-brand-orange">{priceRangeText}</span>
                </div>
                <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50/50">
                  <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">Calories</span>
                  <span className="text-[32px] font-black text-site-black">{calDisplay || 'Varies'}</span>
                </div>
              </div>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                The Saladworks <strong>{item.name}</strong> costs <strong>${item.price.toFixed(2)}</strong> on average in {state.name} as of {monthYear}, available at {itemLocationCount > 0 ? itemLocationCount : state.locationCount} location{(itemLocationCount > 0 ? itemLocationCount : state.locationCount) > 1 ? 's' : ''}{cityPrices.length > 0 ? ` across ${cityPrices.length} cit${cityPrices.length > 1 ? 'ies' : 'y'}` : ''}.
                {cheapestCity && priciestCity && cheapestCity.price !== priciestCity.price ? ` It is cheapest in ${cheapestCity.city} ($${cheapestCity.price.toFixed(2)}) and most expensive in ${priciestCity.city} ($${priciestCity.price.toFixed(2)}).` : ''}
                {nationalAvg > 0 ? ` The ${state.name} price is ${nationalDiffText}.` : ''}
              </p>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                The prices on this page come directly from the Saladworks ordering system, sourced from <strong>{state.locationCount} restaurant{state.locationCount > 1 ? 's' : ''}</strong> across {state.name}. Unlike most sites that show guessed or outdated prices, every number here was pulled from live menu data.
              </p>

              <div className="border-l-4 border-brand-orange bg-brand-orange/5 p-4 rounded-r-lg mb-8">
                <p className="text-site-black text-[14px] italic leading-relaxed">
                  <span className="font-bold text-brand-orange">Pro tip:</span> Prices are averaged across every {state.name} location — your specific restaurant may charge slightly more or less. Always confirm with your local Saladworks.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-semibold">Fresh Ingredients</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-semibold">Customizable</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-semibold">Real {state.name} Pricing</span>
              </div>
            </div>
          </div>

          <div className="mt-16">
              {hasPriceRange && (
                <p className="text-gray-600 text-[16px] leading-relaxed mb-8 max-w-3xl">
                  Saladworks {item.name} prices vary by location in {state.name}. A {item.name} at one location may cost <strong>${item.minPrice!.toFixed(2)}</strong> while another charges <strong>${item.maxPrice!.toFixed(2)}</strong>. Local rent, labor costs, and market conditions all play a role. This page shows real price data for {state.name} specifically - not national averages.
                </p>
              )}

              {/* City-by-City Price Table */}
              {cityPrices.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-[20px] font-black text-site-black mb-4">{item.name} Price by City in {state.name}</h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-brand-deep">
                          <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider">City</th>
                          <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider text-center">Locations</th>
                          <th className="py-3 px-5 font-bold text-[12px] text-white uppercase tracking-wider text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {cityPrices.map((cp, i) => (
                          <tr key={cp.city} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-5 font-semibold text-site-black text-[14px]">
                              {cp.city}
                              {i === 0 && <span className="ml-2 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Cheapest</span>}
                              {i === cityPrices.length - 1 && cp.price > cityPrices[0].price && <span className="ml-2 text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Highest</span>}
                            </td>
                            <td className="py-3 px-5 text-gray-500 text-[14px] text-center">{cp.locationCount}</td>
                            <td className="py-3 px-5 text-brand-orange font-bold text-right text-[15px]">${cp.price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Availability & Hours Context */}
              {hoursSummary && (
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  🕐 The {item.name} is available during all operating hours — Saladworks locations in {state.name} typically open <strong>{hoursSummary.open}</strong> and close at <strong>{hoursSummary.close}</strong> on weekdays. See exact hours for every location on our <Link href="/hours" className="text-brand-orange font-bold hover:underline">hours page</Link>.
                </p>
              )}

              {/* Calorie & Nutrition Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="text-[20px] font-black text-site-black mb-3">
                  {item.name} Calories & Nutrition
                </h3>
                {item.calories ? (
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-4">
                    <div className="shrink-0 w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-[22px] font-black text-brand-orange block leading-none">{item.calories}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Cal</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-[15px] leading-relaxed">
                        The Saladworks {item.name} contains approximately <strong>{item.calories} calories</strong> per serving. This represents the standard preparation without additional customization. Adding extra proteins, dressings, or premium toppings will increase the total calorie count.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
                    Exact calorie information for the {item.name} varies based on customization and portion size. Saladworks allows extensive customization, so your actual calorie intake will depend on your specific ingredient choices. Contact your local {state.name} Saladworks for precise nutritional details.
                  </p>
                )}
                {item.calorieLabel && item.calorieLabel !== 'null' && (
                  <div className="bg-gray-50 rounded-lg p-3 text-[13px] text-gray-500 font-medium">
                    📊 Nutrition Label: {item.calorieLabel}
                  </div>
                )}
              </div>

              {/* Available Sizes / Options */}
              {item.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-[20px] font-black text-site-black mb-4">{item.name} Size Options & Prices in {state.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {item.sizes.map((size, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm text-center hover:border-brand-orange/30 transition-colors">
                        <span className="font-bold text-site-black text-[14px] block mb-1">{size.name}</span>
                        <span className="text-brand-orange font-black text-[20px] block">${size.price.toFixed(2)}</span>
                        {size.calories && <span className="text-gray-400 text-[12px] block mt-1">{size.calories} Cal</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-[24px] font-black text-site-black mb-4">
                  About the {item.name} at Saladworks in {state.name}
                </h2>
                <div className="text-gray-600 text-[16px] leading-[1.8] space-y-5">
                  <p>
                    The <strong>{item.name}</strong> is available at all {state.locationCount} Saladworks locations in {state.name}, including major cities like {state.cities.slice(0, 3).join(', ')}{state.cities.length > 3 ? ' and more' : ''}. Whether you are dining in, ordering takeout, or getting delivery through a third-party app, this {category.toLowerCase()} item offers fresh, high-quality ingredients that Saladworks is known for.
                  </p>
                  <p>
                    <strong>Price & Value in {state.name}:</strong> At an average price of <strong>${item.price.toFixed(2)}</strong>{hasPriceRange ? ` (ranging from $${item.minPrice!.toFixed(2)} to $${item.maxPrice!.toFixed(2)})` : ''}, the {item.name} is {item.price < 8 ? 'one of the more affordable options' : item.price < 14 ? 'a mid-range choice' : 'a premium item'} on the Saladworks menu in {state.name}. {stateAvgPrice ? `For comparison, the average menu item in ${state.name} costs $${stateAvgPrice}.` : ''} Prices were last verified on <strong>{prettyDate}</strong>.
                  </p>
                  <p>
                    <strong>Nutritional & Dietary Profile:</strong> {item.calories ? `With approximately ${item.calories} calories per serving, this item fits well into a balanced diet.` : `Calorie counts for this item vary by customization and exact serving size.`} Like most menu items at Saladworks, you can customize the {item.name} to meet your specific dietary needs, including gluten-free or keto-friendly modifications by swapping out certain ingredients or dressings.
                  </p>
                </div>
              </div>

          </div>
        </section>

        {/* Cross-State Price Comparison (deterministic: neighbors + cheapest + most expensive) */}
        {comparisonStates.length > 0 && (
          <section className="bg-white border-t border-gray-200 py-14">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-[26px] font-black text-site-black mb-2">{item.name} Prices in Nearby & Cheapest States</h2>
              <p className="text-gray-500 text-[15px] mb-8">
                {cheapestState ? `${cheapestState.name} has the cheapest average price for the ${item.name} at $${cheapestState.avgPrice.toFixed(2)}. ` : ''}
                Compare real {item.name} prices across states — every figure is aggregated from live location menus.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {comparisonStates.map((cs) => {
                  const diff = Math.round((cs.avgPrice - item.price) * 100) / 100
                  return (
                    <Link key={cs.slug} href={`/menu/${cs.slug}/${item.slug}`} className="group bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-brand-orange/40 hover:shadow-md transition-all">
                      <h3 className="font-bold text-site-black text-[15px] mb-1 group-hover:text-brand-orange transition-colors">{item.name} in {cs.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-brand-orange text-[20px]">${cs.avgPrice.toFixed(2)}</span>
                        {Math.abs(diff) >= 0.01 && (
                          <span className={`text-[12px] font-bold ${diff < 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {diff < 0 ? '−' : '+'}${Math.abs(diff).toFixed(2)} vs {state.code}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-[12px]">{cs.locationCount} location{cs.locationCount > 1 ? 's' : ''}</span>
                    </Link>
                  )
                })}
              </div>
              <div className="mt-6 text-center">
                <Link href={`/menu/prices-by-state/${item.slug}`} className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-[15px] hover:underline">
                  Compare {item.name} prices in all {allStateStats.length} states <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200 py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-[26px] font-black text-site-black mb-2">More {category} at Saladworks in {state.name}</h2>
              <p className="text-gray-500 text-[15px] mb-8">Compare prices for other {category.toLowerCase()} items available in {state.name}.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {relatedItems.map((ri) => {
                  const riRange = ri.minPrice !== undefined && ri.maxPrice !== undefined && ri.minPrice !== ri.maxPrice
                    ? `$${ri.minPrice.toFixed(2)}–$${ri.maxPrice.toFixed(2)}`
                    : undefined
                  return (
                    <FoodCard
                      key={ri.chainProductId}
                      name={ri.name}
                      description={ri.description}
                      price={ri.price}
                      priceRangeText={riRange}
                      calories={ri.calories ?? null}
                      image={ri.image || fallbackImg}
                      category={category}
                      href={`/menu/${state.slug}/${ri.slug}`}
                    />
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-[28px] font-black text-site-black mb-2">Saladworks {item.name} {state.name} - Frequently Asked Questions</h2>
          <p className="text-gray-500 text-[15px] mb-8">Based on real data from {state.locationCount} {state.name} locations, updated {prettyDate}.</p>
          <FaqSection faqs={faqs} />
        </section>
      </div>
    )
  }

  notFound()
}
