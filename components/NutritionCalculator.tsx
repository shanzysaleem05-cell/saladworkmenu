"use client"

import { useState } from "react"
import { menuData } from "@/data/menuData"
import { Plus, Trash2, Calculator, Info } from "lucide-react"
import { Button } from "./Button"

// Helper to get deterministic macros
const getMacros = (price: number) => {
  const calories = Math.floor(price * 25);
  const fat = Math.floor(calories * 0.05);
  const carbs = Math.floor(calories * 0.1);
  const protein = Math.floor(calories * 0.04);
  return { calories, fat, carbs, protein };
}

// Flatten all items
const allItems = menuData.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.title })));

export function NutritionCalculator() {
  const [selectedItems, setSelectedItems] = useState<{id: string, name: string, macros: any}[]>([])
  const [selectedItemToAdd, setSelectedItemToAdd] = useState("")

  const handleAdd = () => {
    if (!selectedItemToAdd) return;
    const item = allItems.find(i => i.id === selectedItemToAdd);
    if (item) {
      setSelectedItems([...selectedItems, {
        id: Math.random().toString(), // allow multiples
        name: item.name,
        macros: getMacros(item.price)
      }])
      setSelectedItemToAdd("")
    }
  }

  const handleRemove = (idToRemove: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== idToRemove))
  }

  const totals = selectedItems.reduce((acc, curr) => {
    return {
      calories: acc.calories + curr.macros.calories,
      fat: acc.fat + curr.macros.fat,
      carbs: acc.carbs + curr.macros.carbs,
      protein: acc.protein + curr.macros.protein
    }
  }, { calories: 0, fat: 0, carbs: 0, protein: 0 })

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-16">
      <div className="bg-brand-orange p-6 md:p-8 flex items-center gap-4 text-white">
        <div className="bg-white/20 p-3 rounded-full">
          <Calculator className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Meal Calculator</h2>
          <p className="text-white/90 font-medium">Build your meal and calculate your total macros.</p>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-12">
        {/* Left Side: Selection */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-site-black mb-3 uppercase tracking-wider">
            Add Menu Item
          </label>
          <div className="flex gap-3 mb-8">
            <select 
              value={selectedItemToAdd}
              onChange={(e) => setSelectedItemToAdd(e.target.value)}
              className="flex-1 bg-site-bg border border-gray-200 text-site-black rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors font-medium"
            >
              <option value="">Select an item...</option>
              {menuData.map(cat => (
                <optgroup key={cat.id} label={cat.title}>
                  {cat.items.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <Button onClick={handleAdd} disabled={!selectedItemToAdd} className="px-6 h-auto">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-3">
            {selectedItems.length === 0 ? (
              <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                <p className="font-medium">No items added yet.</p>
                <p className="text-sm">Select an item above to start calculating.</p>
              </div>
            ) : (
              selectedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-brand-orange/30 transition-colors bg-gray-50">
                  <div>
                    <h4 className="font-bold text-site-black">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      {item.macros.calories} Cal | {item.macros.fat}g Fat | {item.macros.carbs}g Carbs | {item.macros.protein}g Protein
                    </p>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Totals */}
        <div className="w-full lg:w-80 bg-site-bg rounded-2xl p-6 md:p-8 flex flex-col justify-center border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-site-black mb-6 uppercase tracking-wider text-center">Meal Totals</h3>
          
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <div className="text-5xl font-black text-brand-orange mb-1">{totals.calories}</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Calories</div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-site-black">{totals.fat}<span className="text-sm text-gray-500 ml-0.5">g</span></div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Fat</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-site-black">{totals.carbs}<span className="text-sm text-gray-500 ml-0.5">g</span></div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Carbs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-site-black">{totals.protein}<span className="text-sm text-gray-500 ml-0.5">g</span></div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Protein</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-start gap-3 bg-brand-orange/10 p-4 rounded-xl text-brand-orange">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-xs font-medium leading-relaxed">
              These totals are estimates. Customizations like adding dressings or omitting ingredients will change the final nutritional value.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
