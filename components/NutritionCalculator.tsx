"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Check, Info } from "lucide-react"

type Ingredient = {
  id: string
  name: string
  calories: number
  category: "Base" | "Protein" | "Toppings" | "Dressing"
}

const INGREDIENTS: Ingredient[] = [
  { id: "base-1", name: "Super Greens Blend", calories: 30, category: "Base" },
  { id: "base-2", name: "Romaine Lettuce", calories: 15, category: "Base" },
  { id: "base-3", name: "Spinach", calories: 20, category: "Base" },
  { id: "base-4", name: "Radiatore Pasta", calories: 150, category: "Base" },
  
  { id: "pro-1", name: "Grilled Chicken", calories: 110, category: "Protein" },
  { id: "pro-2", name: "Fire-Grilled Steak", calories: 160, category: "Protein" },
  { id: "pro-3", name: "Roasted Turkey", calories: 90, category: "Protein" },
  { id: "pro-4", name: "Tofu", calories: 80, category: "Protein" },
  
  { id: "top-1", name: "Avocado", calories: 90, category: "Toppings" },
  { id: "top-2", name: "Bacon", calories: 70, category: "Toppings" },
  { id: "top-3", name: "Feta Cheese", calories: 80, category: "Toppings" },
  { id: "top-4", name: "Croutons", calories: 60, category: "Toppings" },
  { id: "top-5", name: "Cherry Tomatoes", calories: 10, category: "Toppings" },
  { id: "top-6", name: "Cucumbers", calories: 5, category: "Toppings" },
  { id: "top-7", name: "Hard Boiled Egg", calories: 70, category: "Toppings" },
  { id: "top-8", name: "Roasted Brussels Sprouts", calories: 45, category: "Toppings" },

  { id: "dress-1", name: "Balsamic Vinaigrette", calories: 90, category: "Dressing" },
  { id: "dress-2", name: "Chipotle Ranch", calories: 180, category: "Dressing" },
  { id: "dress-3", name: "Green Goddess", calories: 150, category: "Dressing" },
  { id: "dress-4", name: "Lite Raspberry Vinaigrette", calories: 50, category: "Dressing" },
  { id: "dress-5", name: "Classic Caesar", calories: 210, category: "Dressing" },
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

  const totalCalories = Array.from(selectedIds).reduce((sum, id) => {
    const item = INGREDIENTS.find(i => i.id === id)
    return sum + (item?.calories || 0)
  }, 0)

  const categories = ["Base", "Protein", "Toppings", "Dressing"] as const

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden my-12">
      <div className="bg-brand-deep p-6 text-white text-center">
        <Calculator className="w-10 h-10 mx-auto mb-3 text-brand-orange" />
        <h2 className="text-2xl font-extrabold m-0 text-white">Interactive Nutrition Calculator</h2>
        <p className="text-gray-300 mt-2 text-sm max-w-lg mx-auto leading-relaxed m-0">
          Build your custom Saladworks bowl below to see real-time calorie estimates.
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

      <div className="bg-site-black p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 border-t-4 border-brand-orange">
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
    </div>
  )
}
