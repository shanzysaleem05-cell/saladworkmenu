import { menuData } from "@/data/menuData"
import Link from "next/link"
import { ChevronRight, Leaf, Info } from "lucide-react"
import { FoodCard } from "@/components/FoodCard"
import { notFound } from "next/navigation"

export default function MenuDetail({ params }: { params: { item: string } }) {
  // Find the item
  let foundItem: any
  let foundCategory: any

  for (const category of menuData) {
    const item = category.items.find(
      (i) => i.name.toLowerCase().replace(/ /g, "-") === params.item
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

  const fallbackImg = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200"
  const calories = Math.floor(Math.random() * 400) + 200

  return (
    <div className="flex flex-col w-full bg-site-white pb-24">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-4 py-4 flex items-center text-[12px] font-medium text-gray-500">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/menu" className="hover:text-brand-orange transition-colors">Menu</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href={`/menu/${foundCategory.id}`} className="hover:text-brand-orange transition-colors">{foundCategory.title}</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-site-black font-bold">{foundItem.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left: Image */}
          <div className="w-full md:w-1/2 shrink-0">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
              <img src={foundItem.image || fallbackImg} alt={foundItem.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center gap-1 bg-brand-green/10 text-brand-green px-2 py-1 rounded text-[11px] font-bold">
                <Leaf className="w-3 h-3" /> Vegetarian
              </span>
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

            {/* Price / Calories Box */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
              <div className="flex-1 p-6 flex flex-col items-center justify-center border-r border-gray-200 bg-gray-50/50">
                <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">Price (Est.)</span>
                <span className="text-[32px] font-black text-brand-orange">${foundItem.price.toFixed(2)}</span>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50/50">
                <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">Calories</span>
                <span className="text-[32px] font-black text-site-black">{calories}</span>
              </div>
            </div>

            <p className="text-[#6b7280] text-[15px] leading-relaxed mb-8">
              Here is what stands out about the {foundItem.name}: It is completely satisfying, which makes it one of the better options you'll find at SaladWorks. Sitting comfortably in the middle of our menu — it is satisfying enough to be a full meal, and at ${foundItem.price.toFixed(2)} it's not going to hurt your wallet.
            </p>

            {/* Pro Tip */}
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

      {/* Details Section */}
      <section className="container mx-auto px-4 py-12 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Nutrition Facts */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-[20px] font-extrabold text-site-black mb-6 flex items-center gap-2">
              {foundItem.name} — Nutrition Facts
            </h2>
            
            {/* Nutrition Label */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
              <div className="bg-site-black text-site-white p-4">
                <h3 className="font-black text-[24px] tracking-tight leading-none mb-1">Nutrition Facts</h3>
                <p className="text-[12px] text-gray-300">1 serving • {foundItem.name}</p>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-end border-b-[6px] border-site-black pb-2 mb-4">
                  <span className="font-extrabold text-[18px]">Calories</span>
                  <span className="font-black text-[28px] leading-none">{calories}</span>
                </div>
                
                <div className="space-y-2 text-[14px]">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold">Total Fat</span>
                    <span>12g</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold">Sodium</span>
                    <span>450mg</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold">Total Carbohydrate</span>
                    <span>34g</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold">Protein</span>
                    <span>18g</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-4 leading-snug">
                  * Approximate values. May vary by location and preparation.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="#" className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors text-[14px] font-bold text-site-black">
                Full Nutrition Guide <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="#" className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors text-[14px] font-bold text-site-black">
                Complete Price List <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: About & FAQs */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-[24px] font-extrabold text-site-black mb-6">
              About the {foundItem.name} at SaladWorks
            </h2>
            <div className="prose prose-sm text-[#6b7280] mb-12">
              <p className="mb-4 text-[15px] leading-relaxed">
                The {foundItem.name} has been part of the SaladWorks experience for years, and it holds its spot on the menu for good reason. At ${foundItem.price.toFixed(2)}, it sits in a competitive price range for our {foundCategory.title.toLowerCase()} category — an accessible pick that satisfies every craving.
              </p>
              <p className="mb-4 text-[15px] leading-relaxed">
                When it comes to calories, it puts the {foundItem.name} in the lighter end of the SaladWorks menu. That's worth keeping in mind if you're building a multi-item order — especially since it's easy to stack up calories quickly with combos and sides.
              </p>
              <p className="mb-4 text-[15px] leading-relaxed">
                One thing to flag: like most fast-casual food, the sodium count here is worth watching. For the most accurate and up-to-date nutrition information, check directly with your local SaladWorks. Ingredients and preparation can differ by location and customization.
              </p>
            </div>

            <h3 className="text-[20px] font-extrabold text-site-black mb-6">
              Questions about {foundItem.name}
            </h3>
            
            {/* Simple FAQ Accordion mock */}
            <div className="space-y-3">
              {[
                `How much does ${foundItem.name} cost?`,
                `How many calories are in ${foundItem.name}?`,
                `Is ${foundItem.name} available for catering?`,
                `Is ${foundItem.name} vegetarian?`
              ].map((q, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-[14px] text-site-black">{q}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Related Items */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[24px] font-extrabold text-site-black">More {foundCategory.title}</h2>
          <Link href={`/menu/${foundCategory.id}`} className="text-[13px] font-bold text-[#6b7280] hover:text-brand-orange transition-colors flex items-center">
            All {foundCategory.title} <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16">
          {foundCategory.items.slice(0, 4).map((item: any) => (
            <FoodCard 
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              calories={Math.floor(Math.random() * 400) + 200}
              image={item.image || fallbackImg}
              category={foundCategory.title}
            />
          ))}
        </div>

        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[24px] font-extrabold text-site-black">Also Popular at SaladWorks</h2>
          <Link href="/menu" className="text-[13px] font-bold text-[#6b7280] hover:text-brand-orange transition-colors flex items-center">
            Full Menu <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {menuData[0].items.slice(0, 4).map((item: any) => (
            <FoodCard 
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              calories={Math.floor(Math.random() * 400) + 200}
              image={item.image || fallbackImg}
              category={menuData[0].title}
            />
          ))}
        </div>
      </section>

    </div>
  )
}
