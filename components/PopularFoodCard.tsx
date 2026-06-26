"use client"

import { motion } from "framer-motion"
import { Star, Flame } from "lucide-react"

interface PopularFoodCardProps {
  name: string;
  price: number;
  image: string;
  categoryLabel: string;
  isPopular?: boolean;
  isLimited?: boolean;
}

export function PopularFoodCard({ 
  name, 
  price, 
  image,
  categoryLabel,
  isPopular = false,
  isLimited = false,
}: PopularFoodCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-site-white rounded-t-[32px] rounded-b-[12px] overflow-hidden flex flex-col h-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100"
    >
      <div className="relative h-[220px] w-full bg-gray-100">
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover rounded-t-[32px]" />
        
        {/* Top left tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isPopular && (
            <span className="flex items-center gap-1 bg-[#FFD700] text-site-black px-2.5 py-1 rounded-sm text-[11px] font-black uppercase tracking-wider shadow-md">
              <Star className="w-3 h-3 fill-site-black" /> Popular
            </span>
          )}
          {isLimited && (
            <span className="flex items-center gap-1 bg-[#FF0000] text-white px-2.5 py-1 rounded-sm text-[11px] font-black uppercase tracking-wider shadow-md">
              <Flame className="w-3 h-3 fill-white" /> Limited
            </span>
          )}
        </div>

        {/* Bottom right price bubble */}
        <div className="absolute -bottom-4 right-4 z-10">
          <span className="bg-white text-site-black px-4 py-1.5 rounded-full text-[15px] font-black shadow-md border border-gray-100">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="p-6 pt-8 flex flex-col flex-1">
        <p className="text-brand-green font-bold text-[11px] uppercase tracking-wider mb-2">{categoryLabel}</p>
        <h3 className="font-extrabold text-[20px] mb-2 text-site-black tracking-tight leading-tight">{name}</h3>
      </div>
    </motion.div>
  )
}
