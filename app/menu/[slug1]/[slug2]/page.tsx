import { isStateSlug, getStateItemData, getStateItemSlugs, getStateSlugs, getDataDate, getStateMenuData } from "@/lib/stateData"
import Link from "next/link"
import Image from "next/image"
import { MapPin, DollarSign, Flame, Calendar, Store, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

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
    const calText = item.calories ? ` | ${item.calories} Calories` : ''

    return {
      title: `Saladworks ${item.name} Price in ${state.name} (${year}) - ${priceText}${calText}`,
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

    const isVegetarian = category.toLowerCase().includes("salad") || category.toLowerCase().includes("soup")
    const isBeverage = category.toLowerCase().includes("beverage")
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

    const faqs = [
      { question: `How much does ${item.name} cost at Saladworks in ${state.name}?`, answer: `As of ${prettyDate}, the ${item.name} is priced at ${priceRangeText} across ${state.locationCount} Saladworks locations in ${state.name}. The average price is $${item.price.toFixed(2)}. Prices may vary slightly by specific location or third-party delivery apps.` },
      { question: `How many calories are in the Saladworks ${item.name}?`, answer: item.calories ? `The ${item.name} contains approximately ${item.calories} calories per serving. Keep in mind that customizing your order with extra dressings, proteins, or premium toppings will change the total calorie count.` : `Exact calorie information for the ${item.name} varies based on customization and portion size. The standard portion is a moderate-calorie option. Please check with your local ${state.name} store for specific nutritional details.` },
      { question: `Where can I order the ${item.name} in ${state.name}?`, answer: `You can order the ${item.name} at any of the ${state.locationCount} Saladworks locations in ${state.name}, including cities like ${state.cities.slice(0, 3).join(', ')}. Available for dine-in, takeout, and delivery through popular apps.` },
      { question: `Is the Saladworks ${item.name} customizable?`, answer: `Yes! Like most items at Saladworks, the ${item.name} can be heavily customized. You can add extra proteins, swap out the base, change dressings, or remove ingredients to match your dietary preferences at no extra charge for most modifications.` },
      { question: `How does the ${item.name} price in ${state.name} compare to other states?`, answer: `Saladworks menu prices vary by state based on local costs. The ${item.name} in ${state.name} costs ${priceRangeText}. ${stateAvgPrice ? `The overall average menu item price in ${state.name} is $${stateAvgPrice}.` : ''} Prices are pulled directly from real ${state.name} restaurant data, not national estimates.` },
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

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-deep via-[#2d1a0a] to-brand-deep py-10 md:py-14">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h1 className="text-[32px] md:text-[48px] font-black text-white leading-tight tracking-tight mb-3">
              {item.name}
            </h1>
            <p className="text-brand-orange text-[20px] md:text-[26px] font-black mb-3">
              {priceRangeText} in {state.name} | {prettyDate}
            </p>
            <p className="text-gray-300 text-[16px] max-w-2xl mx-auto leading-relaxed mb-6">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[13px] font-bold border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" /> {category}
              </span>
              {calDisplay && (
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[13px] font-bold border border-white/20">
                  <Flame className="w-3.5 h-3.5 text-brand-orange" /> {calDisplay}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[13px] font-bold border border-white/20">
                <Store className="w-3.5 h-3.5 text-brand-orange" /> {state.locationCount} {state.name} Location{state.locationCount > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </section>

        {/* Date Bar */}
        <div className="bg-brand-orange text-white text-center py-2.5 text-[13px] font-bold flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Price Guide Updated: <span className="bg-white text-brand-orange px-2.5 py-0.5 rounded-md font-black text-[12px]">{prettyDate}</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5">
            ✅ Real {state.name} prices from {state.locationCount} location{state.locationCount > 1 ? 's' : ''}
          </span>
        </div>

        {/* Main Content with Sticky Image */}
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
            
            {/* Left Column - Sticky Image */}
            <div className="w-full md:w-5/12 shrink-0 md:sticky md:top-24">
              <div className="relative aspect-square rounded-[20px] overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
                <Image src={item.image || fallbackImg} alt={`Saladworks ${item.name} in ${state.name} - ${priceRangeText}`} fill priority sizes="(max-width: 768px) 100vw, 480px" className="object-cover" />
                {hasPriceRange && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white font-black text-[16px] px-5 py-2 rounded-full shadow-lg border-2 border-white">
                      {priceRangeText}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Quick Info Card under image */}
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
            <div className="w-full md:w-7/12 flex flex-col">
              
              {/* H2: Price Details */}
              <h2 className="text-[26px] md:text-[32px] font-black text-site-black leading-tight tracking-tight mb-4">
                Saladworks {item.name} Price in {state.name} ({year})
              </h2>

              <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
                The prices on this page come directly from the Saladworks ordering system, sourced from <strong>{state.locationCount} restaurant{state.locationCount > 1 ? 's' : ''}</strong> across {state.name}. Unlike most sites that show guessed or outdated prices, every number here was pulled from live menu data.
              </p>

              {hasPriceRange && (
                <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
                  Saladworks {item.name} prices vary by location in {state.name}. A {item.name} at one location may cost <strong>${item.minPrice!.toFixed(2)}</strong> while another charges <strong>${item.maxPrice!.toFixed(2)}</strong>. Local rent, labor costs, and market conditions all play a role. This page shows real price data for {state.name} specifically - not national averages.
                </p>
              )}

              {/* Price Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4 text-center">
                  <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase block mb-1">Average</span>
                  <span className="text-[28px] font-black text-brand-orange block">${item.price.toFixed(2)}</span>
                </div>
                {hasPriceRange && (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase block mb-1">Lowest</span>
                      <span className="text-[28px] font-black text-green-600 block">${item.minPrice!.toFixed(2)}</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase block mb-1">Highest</span>
                      <span className="text-[28px] font-black text-red-500 block">${item.maxPrice!.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

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
                    <strong>Nutritional & Dietary Profile:</strong> {item.calories ? `With approximately ${item.calories} calories per serving, this item fits well into a balanced diet.` : `Calorie counts for this item vary by customization and exact serving size.`} {isVegetarian && !isBeverage ? `As a vegetarian-friendly option, it's perfect for plant-based diets.` : `Like most menu items at Saladworks, you can customize the ${item.name} to meet your specific dietary needs, including gluten-free or keto-friendly modifications by swapping out certain ingredients or dressings.`}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-[13px] text-amber-800">
                ⚠️ Prices are averaged across {state.locationCount} {state.name} location{state.locationCount > 1 ? 's' : ''}. Your specific restaurant may charge slightly more or less. Always confirm with your local Saladworks.
              </div>

            </div>
          </div>
        </section>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200 py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-[26px] font-black text-site-black mb-2">More {category} at Saladworks in {state.name}</h2>
              <p className="text-gray-500 text-[15px] mb-8">Compare prices for other {category.toLowerCase()} items available in {state.name}.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {relatedItems.map((ri) => {
                  const riRange = ri.minPrice !== undefined && ri.maxPrice !== undefined && ri.minPrice !== ri.maxPrice
                    ? `$${ri.minPrice.toFixed(2)}–$${ri.maxPrice.toFixed(2)}`
                    : `$${ri.price.toFixed(2)}`
                  return (
                    <Link key={ri.chainProductId} href={`/menu/${state.slug}/${ri.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      {ri.image ? (
                        <div className="relative aspect-[16/10] bg-gray-100">
                          <Image src={ri.image} alt={`${ri.name} price in ${state.name}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-brand-green/10 to-brand-leaf/10 flex items-center justify-center">
                          <span className="text-brand-green font-bold text-[14px]">Saladworks</span>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-site-black text-[15px] mb-1 group-hover:text-brand-orange transition-colors">{ri.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-brand-orange text-[16px]">{riRange}</span>
                          {ri.calories && <span className="text-gray-400 text-[12px]">{ri.calories} Cal</span>}
                        </div>
                      </div>
                    </Link>
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
