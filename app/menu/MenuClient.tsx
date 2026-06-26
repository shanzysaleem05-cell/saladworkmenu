"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { menuData } from "@/data/menuData"
import { SectionHeading } from "@/components/SectionHeading"
import { FoodCard } from "@/components/FoodCard"
import Link from "next/link"

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id)

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuData.map(c => document.getElementById(c.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(menuData[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 120 // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Page Header */}
      <div className="bg-site-bg py-16 px-4 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Updated 2026 • US Locations
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-site-black tracking-tight mb-4 uppercase">
            SaladWorks Menu 2026
          </h1>
          <p className="text-brand-orange text-[15px] md:text-[17px] font-extrabold tracking-wide uppercase mb-8">
            Full Menu With Prices & Calories — All 50+ Items
          </p>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
            The complete SaladWorks menu for 2026 — every item across 8 categories with estimated prices and calorie counts. Browse signature salads, warm grain bowls, wraps, soups, and more. Updated regularly.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[15px] text-gray-500 font-medium">
            <span><strong className="text-site-black font-extrabold">50+</strong> menu items</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span><strong className="text-site-black font-extrabold">8</strong> categories</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>Prices from <strong className="text-site-black font-extrabold">$2.99</strong></span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>100% free & unofficial</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-site-bg border-b border-gray-200 py-6 px-4 overflow-x-auto scrollbar-hide">
        <div className="container mx-auto flex gap-2 min-w-max md:justify-center">
          {menuData.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                activeCategory === category.id 
                  ? "bg-brand-orange text-site-white border-brand-orange shadow-md" 
                  : "bg-site-white text-site-black border-gray-200 hover:bg-orange-50 hover:text-brand-orange hover:border-brand-orange"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Create Your Own Section */}
        <section id="create-your-own" className="scroll-mt-32 mb-16">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-site-black tracking-tight mb-4">
              Create Your Own
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Create your own salad or wrap for just <strong className="text-site-black font-extrabold">$9.99!</strong> Start by choosing a base, five of your favorite fresh toppings, then add premium proteins and top with the perfect dressing!
            </p>
          </div>

          <div className="w-full overflow-x-auto shadow-sm rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-brand-orange">
                  <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-1/4">STEP</th>
                  <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-3/4">AVAILABLE OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="py-6 px-6 align-top">
                    <span className="font-extrabold text-site-black text-lg block mb-1">1. Choose Base</span>
                    <span className="text-gray-400 text-[13px] font-medium uppercase tracking-wider">Mix and Match</span>
                  </td>
                  <td className="py-6 px-6 align-top text-gray-700 text-[15px] leading-relaxed">
                    Saladworks Blend, Spring Mix, Chopped Kale, Baby Spinach, Radiatore Pasta, Romaine / Iceberg Blend
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-6 px-6 align-top">
                    <span className="font-extrabold text-site-black text-lg block mb-1">2. Up to 5 Ingredients</span>
                    <span className="text-gray-400 text-[13px] font-medium uppercase tracking-wider">Included in $9.99</span>
                  </td>
                  <td className="py-6 px-6 align-top text-gray-700 text-[15px] leading-relaxed">
                    Choose from over 30+ fresh vegetables, fruits, cheeses, and crunchies available daily at our salad bar!
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="py-6 px-6 align-top">
                    <span className="font-extrabold text-site-black text-lg block mb-1">3. Premium Toppings</span>
                    <span className="text-gray-400 text-[13px] font-medium uppercase tracking-wider">Extra Charge</span>
                  </td>
                  <td className="py-6 px-6 align-top text-gray-700 text-[15px] leading-relaxed">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      <span>• Egg</span>
                      <span>• Pepperoni</span>
                      <span>• Tofu</span>
                      <span>• Bacon</span>
                      <span>• Ham</span>
                      <span>• Turkey</span>
                      <span>• Avocado</span>
                      <span>• Buffalo Chicken</span>
                      <span>• Grilled Chicken</span>
                      <span>• Smoky BBQ Chicken</span>
                      <span>• Crispy Chicken</span>
                      <span>• Sweet Chili Chicken</span>
                      <span>• Shrimp</span>
                      <span>• Warm Roasted Chicken</span>
                      <span>• Fire-Grilled Steak</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-6 px-6 align-top">
                    <span className="font-extrabold text-site-black text-lg block mb-1">4. Top with Dressing</span>
                    <span className="text-gray-400 text-[13px] font-medium uppercase tracking-wider">Tossed or on the side</span>
                  </td>
                  <td className="py-6 px-6 align-top text-gray-700 text-[15px] leading-relaxed">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <span>• Housemade Ranch</span>
                      <span>• Housemade Creamy Garlic Herb</span>
                      <span>• Balsamic Vinaigrette</span>
                      <span>• Fuji Apple Cider Vinaigrette</span>
                      <span>• Housemade Chipotle Caesar</span>
                      <span>• Housemade Lemon Tahini Vinaigrette</span>
                      <span>• Classic Caesar</span>
                      <span>• Housemade Chipotle Ranch</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {menuData.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32 mb-16 last:mb-0">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-site-black flex items-center gap-3 border-b border-gray-200 pb-4">
                {category.title}
              </h2>
              <p className="text-gray-500 mt-2 text-lg font-medium">{category.subtitle}</p>
            </div>
            
            {category.id === "pick-2" && (
              <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-6 mb-10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="font-black text-site-black text-xl mb-1">Your Choice of Any Two</h3>
                    <p className="text-gray-500 text-sm">Mix and match from the options below to build your perfect Pick 2 meal. Menu items may vary by location.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
                    {[
                      { label: "Half Create Your Own", cal: "80–915 cal" },
                      { label: "Half Premium Salad", cal: "180–350 cal" },
                      { label: "Half Signature Salad", cal: "150–350 cal" },
                      { label: "Half Melt", cal: "330–510 cal" },
                      { label: "Soup", cal: "80–580 cal" },
                      { label: "Wrap or Grilled Wrap", cal: "560–920 cal" },
                    ].map((opt, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex flex-col">
                        <span className="font-bold text-site-black text-[13px] leading-tight">{opt.label}</span>
                        <span className="text-brand-orange text-[11px] font-bold mt-0.5">{opt.cal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
              {category.items.map((item) => (
                <FoodCard 
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  calories={Math.floor(item.price * 25)}
                  image={item.image || category.categoryImage || "/hot-honey-chicken-bowl.webp"}
                  category={category.title}
                  isVeg={category.id === "salads" || category.id === "soups"}
                  isSpicy={false}
                />
              ))}
            </div>
            
            <div className="w-full overflow-x-auto shadow-sm rounded-t-xl rounded-b-lg border border-gray-200 bg-white">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-brand-orange">
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-1/4">{category.title.toUpperCase()} ITEM</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-1/6">PRICE</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-1/6">CALORIES</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-5/12">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 last:border-0 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="py-6 px-6 align-top">
                        <Link href={`/menu/${item.name.toLowerCase().replace(/ /g, '-')}`} className="font-extrabold text-site-black hover:text-brand-orange transition-colors">
                          {item.name}*
                        </Link>
                      </td>
                      <td className="py-6 px-6 align-top font-black text-site-black text-[15px]">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-6 px-6 align-top text-gray-500 font-medium text-[14px]">
                        {Math.floor(item.price * 25)} cal
                      </td>
                      <td className="py-6 px-6 align-top text-gray-700 text-[14px] leading-relaxed">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
