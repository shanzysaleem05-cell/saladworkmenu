"use client"

import { motion } from "framer-motion"
import { ArrowRight, Leaf, Flame } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { slugify } from "@/lib/utils"

interface FoodCardProps {
  name: string;
  description: string;
  price: number;
  priceRangeText?: string;
  image: string;
  category?: string;
  calories?: number | string | null;
  isVeg?: boolean;
  isSpicy?: boolean;
  href?: string;
}

export function FoodCard({
  name,
  description,
  price,
  priceRangeText,
  image,
  category = "Salads",
  calories = null,
  isVeg = true,
  isSpicy = false,
  href
}: FoodCardProps) {
  return (
    <Link href={href || `/menu/${slugify(name)}`} className="block h-full group">
      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-site-white border border-gray-200 rounded-[16px] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300"
      >
        <div className="relative h-[150px] w-full bg-gray-100">
          <Image 
            src={image} 
            alt={name} 
            title={name} 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover" 
          />
          
          {/* Top left tags */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {isVeg && (
              <span className="flex items-center gap-1 bg-brand-green text-site-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
                <Leaf className="w-2.5 h-2.5" /> Veg
              </span>
            )}
            {isSpicy && (
              <span className="flex items-center gap-1 bg-brand-orange text-site-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
                <Flame className="w-2.5 h-2.5" /> Spicy
              </span>
            )}
          </div>

          {/* Top right tag */}
          <div className="absolute top-2 right-2">
            <span className="bg-[#3a1d1d]/90 text-site-white px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-extrabold text-[15px] mb-1.5 text-site-black tracking-tight group-hover:text-brand-orange transition-colors">{name}</h3>
          <p className="text-[#6b7280] text-[12px] leading-snug mb-4 flex-1 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Avg Price</span>
              <span className="font-black text-brand-orange text-[22px] tracking-tight leading-none">{priceRangeText || `$${price.toFixed(2)}`}</span>
            </div>
            <span className="text-[#9ca3af] text-[12px] font-medium">{calories ? `${calories} cal` : 'Varies'}</span>
          </div>

          <div className="w-full text-brand-orange font-bold text-[13px] group-hover:text-[#c44e30] transition-colors flex items-center justify-center gap-1 mt-auto">
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
