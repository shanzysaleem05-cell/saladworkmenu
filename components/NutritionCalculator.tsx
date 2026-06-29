"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Check, Info } from "lucide-react"

type Ingredient = {
  id: string
  name: string
  calories: number
  protein: number // in grams
  fat: number // in grams
  carbs: number // in grams
  category: "Base" | "Protein" | "Toppings" | "Dressing"
}

// Rough estimations for macros
const INGREDIENTS: Ingredient[] = [
  { id: "base-1", name: "Super Greens Blend", calories: 30, protein: 2, fat: 0, carbs: 5, category: "Base" },
  { id: "base-2", name: "Romaine Lettuce", calories: 15, protein: 1, fat: 0, carbs: 3, category: "Base" },
  { id: "base-3", name: "Spinach", calories: 20, protein: 3, fat: 0, carbs: 3, category: "Base" },
  { id: "base-4", name: "Radiatore Pasta", calories: 150, protein: 5, fat: 1, carbs: 30, category: "Base" },
  
  { id: "pro-1", name: "Grilled Chicken", calories: 110, protein: 22, fat: 2, carbs: 0, category: "Protein" },
  { id: "pro-2", name: "Fire-Grilled Steak", calories: 160, protein: 18, fat: 9, carbs: 1, category: "Protein" },
  { id: "pro-3", name: "Roasted Turkey", calories: 90, protein: 16, fat: 2, carbs: 1, category: "Protein" },
  { id: "pro-4", name: "Tofu", calories: 80, protein: 9, fat: 4, carbs: 2, category: "Protein" },
  
  { id: "top-1", name: "Avocado", calories: 90, protein: 1, fat: 8, carbs: 4, category: "Toppings" },
  { id: "top-2", name: "Bacon", calories: 70, protein: 5, fat: 5, carbs: 0, category: "Toppings" },
  { id: "top-3", name: "Feta Cheese", calories: 80, protein: 4, fat: 6, carbs: 1, category: "Toppings" },
  { id: "top-4", name: "Croutons", calories: 60, protein: 1, fat: 2, carbs: 9, category: "Toppings" },
  { id: "top-5", name: "Cherry Tomatoes", calories: 10, protein: 0.5, fat: 0, carbs: 2, category: "Toppings" },
  { id: "top-6", name: "Cucumbers", calories: 5, protein: 0.2, fat: 0, carbs: 1, category: "Toppings" },
  { id: "top-7", name: "Hard Boiled Egg", calories: 70, protein: 6, fat: 5, carbs: 0, category: "Toppings" },
  { id: "top-8", name: "Roasted Brussels Sprouts", calories: 45, protein: 2, fat: 1, carbs: 7, category: "Toppings" },

  { id: "dress-1", name: "Balsamic Vinaigrette", calories: 90, protein: 0, fat: 8, carbs: 4, category: "Dressing" },
  { id: "dress-2", name: "Chipotle Ranch", calories: 180, protein: 1, fat: 18, carbs: 2, category: "Dressing" },
  { id: "dress-3", name: "Green Goddess", calories: 150, protein: 1, fat: 15, carbs: 2, category: "Dressing" },
  { id: "dress-4", name: "Lite Raspberry Vinaigrette", calories: 50, protein: 0, fat: 1, carbs: 10, category: "Dressing" },
  { id: "dress-5", name: "Classic Caesar", calories: 210, protein: 2, fat: 22, carbs: 2, category: "Dressing" },
]

export function NutritionCalculator() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleIngredient = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  let totalCalories = 0
  let totalProtein = 0
  let totalFat = 0
  let totalCarbs = 0

  Array.from(selectedIds).forEach(id => {
    const item = INGREDIENTS.find(i => i.id === id)
    if (item) {
      totalCalories += item.calories
      totalProtein += item.protein
      totalFat += item.fat
      totalCarbs += item.carbs
    }
  })

  // Calculate calories from each macro (Protein/Carbs = 4 cal/g, Fat = 9 cal/g)
  const calFromProtein = Math.round(totalProtein * 4)
  const calFromFat = Math.round(totalFat * 9)
  const calFromCarbs = Math.round(totalCarbs * 4)
  
  // Recalculate total from macros to ensure percentages add up nicely, 
  // though it might differ slightly from the sum of item.calories due to rounding
  const macroTotalCal = calFromProtein + calFromFat + calFromCarbs
  
  const getPct = (macroCal: number) => {
    if (macroTotalCal === 0) return 0
    return ((macroCal / macroTotalCal) * 100).toFixed(1)
  }

  const categories = ["Base", "Protein", "Toppings", "Dressing"] as const

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden my-12">
      <div className="bg-brand-deep p-6 text-white text-center">
        <Calculator className="w-10 h-10 mx-auto mb-3 text-brand-orange" />
        <h2 className="text-2xl font-extrabold m-0 text-white">Interactive Nutrition Calculator</h2>
        <p className="text-gray-300 mt-2 text-sm max-w-lg mx-auto leading-relaxed m-0">
          Build your custom Saladworks bowl below to see real-time calorie and macro estimates.
        </p>
      </div>

      <div className="p-6 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-lg font-bold text-site-black mb-4 border-b border-gray-200 pb-2">
                {category}
              </h3>
              <div className="space-y-2">
                {INGREDIENTS.filter(i => i.category === category).map(item => {
                  const isSelected = selectedIds.has(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleIngredient(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? "bg-brand-green/10 border-brand-green text-brand-green font-bold shadow-sm" 
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          isSelected ? "bg-brand-green border-brand-green text-white" : "border-gray-300"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        {item.name}
                      </span>
                      <span className={`text-sm ${isSelected ? "text-brand-green" : "text-gray-400"}`}>
                        {item.calories} cal
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-site-black p-6 flex flex-col items-center justify-between gap-6 border-t-4 border-brand-orange">
        
        {/* Top section: Summary & Total Calories */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-lg font-bold m-0">Your Custom Bowl</h3>
            <p className="text-gray-400 text-sm m-0">{selectedIds.size} ingredients selected</p>
          </div>
          <div className="text-center sm:text-right">
            <motion.div 
              key={totalCalories}
              initial={{ scale: 1.2, color: "#D85A3B" }}
              animate={{ scale: 1, color: "#fff" }}
              className="text-4xl font-black text-white"
            >
              {totalCalories}
            </motion.div>
            <span className="text-brand-orange font-bold text-sm uppercase tracking-wider">Total Calories</span>
          </div>
        </div>

        {/* Bottom section: Macros Breakdown */}
        {macroTotalCal > 0 && (
          <div className="w-full pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Calories from Protein</div>
              <div className="text-white font-medium">
                {calFromProtein} <span className="text-brand-green text-sm ml-1">({getPct(calFromProtein)}%)</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">{totalProtein.toFixed(1)}g total</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Calories from Fat</div>
              <div className="text-white font-medium">
                {calFromFat} <span className="text-brand-orange text-sm ml-1">({getPct(calFromFat)}%)</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">{totalFat.toFixed(1)}g total</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Calories from Carbs</div>
              <div className="text-white font-medium">
                {calFromCarbs} <span className="text-blue-400 text-sm ml-1">({getPct(calFromCarbs)}%)</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">{totalCarbs.toFixed(1)}g total</div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
