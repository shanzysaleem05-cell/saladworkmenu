"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MenuCategoryCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  link: string;
  isActive?: boolean;
}

export function MenuCategoryCard({ emoji, title, subtitle, link, isActive = false }: MenuCategoryCardProps) {
  return (
    <Link href={link}>
      <motion.div 
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "border rounded-xl p-6 flex flex-col items-center text-center cursor-pointer h-full transition-all duration-200 hover:border-brand-green hover:shadow-md",
          isActive ? "bg-brand-green text-site-white border-brand-green" : "bg-site-white border-gray-200"
        )}
      >
        <span className="text-5xl mb-4 inline-block">{emoji}</span>
        <h3 className={cn("font-bold text-lg mb-1", isActive ? "text-site-white" : "text-site-black")}>{title}</h3>
        <p className={cn("text-sm", isActive ? "text-site-white/90" : "text-gray-500")}>{subtitle}</p>
      </motion.div>
    </Link>
  )
}
