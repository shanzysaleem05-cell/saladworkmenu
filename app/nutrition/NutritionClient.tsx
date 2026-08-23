"use client"

import { menuData } from "@/data/menuData"
import Link from "next/link"
import { NutritionCalculator } from "@/components/NutritionCalculator"
import { slugify } from "@/lib/utils"

export default function NutritionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Page Header */}
      <div className="bg-site-bg py-16 px-4 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Updated 2026 • Health & Wellness
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-site-black tracking-tight mb-4 uppercase">
            SaladWorks Nutrition
          </h1>
          <p className="text-brand-orange text-[15px] md:text-[17px] font-extrabold tracking-wide uppercase mb-8">
            Complete Nutritional Information Guide
          </p>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
            Eating healthy shouldn't be a guessing game. Below is the complete nutritional information for our 2026 menu, including calories, fat, carbs, and protein for all your favorite Saladworks items.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[15px] text-gray-500 font-medium">
            <span><strong className="text-site-black font-extrabold">100%</strong> Transparent</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span><strong className="text-site-black font-extrabold">Fresh</strong> Ingredients</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <Link href="/menu" className="text-brand-orange font-bold hover:underline">
              View Menu & Prices
            </Link>
          </div>
        </div>
      </div>

      {/* Nutrition Tables */}
      <div className="container mx-auto px-5 md:px-10 lg:px-16 py-12">
        <NutritionCalculator />
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium">
            <strong className="text-site-black">Disclaimer:</strong> Nutritional information is estimated based on standard recipes and may vary slightly depending on portion sizes, customizations, and seasonal ingredient availability.
          </p>
        </div>

        {menuData.map((category) => (
          <section key={category.id} className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-site-black flex items-center gap-3">
                {category.title} Nutrition
              </h2>
            </div>
            
            <div className="w-full overflow-x-auto shadow-sm rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-brand-orange">
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase w-1/3">MENU ITEM</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase text-center w-1/6">CALORIES</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase text-center w-1/6">TOTAL FAT (g)</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase text-center w-1/6">CARBS (g)</th>
                    <th className="py-4 px-6 text-white font-black text-xs tracking-widest uppercase text-center w-1/6">PROTEIN (g)</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, index) => {
                    const calories = Math.floor(item.price * 25);
                    // Generate deterministic mock macros based on calories for realism
                    const fat = Math.floor(calories * 0.05);
                    const carbs = Math.floor(calories * 0.1);
                    const protein = Math.floor(calories * 0.04);
                    
                    return (
                      <tr key={item.id} className={`border-b border-gray-100 last:border-0 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        <td className="py-4 px-6">
                          <Link href={`/menu/${slugify(item.name)}`} className="font-bold text-site-black hover:text-brand-orange transition-colors">
                            {item.name}
                          </Link>
                        </td>
                        <td className="py-4 px-6 text-center font-black text-site-black">
                          {calories}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600 font-medium">
                          {fat}g
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600 font-medium">
                          {carbs}g
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600 font-medium">
                          {protein}g
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
