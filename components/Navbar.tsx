"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false) // Hide on scroll down
        } else {
          setIsVisible(true) // Show on scroll up
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const links = [
    { href: "/menu", label: "Menu & Prices" },
    { href: "/hours", label: "Hours & Locations" },
    { href: "/catering", label: "Catering" },
    { href: "/nutrition", label: "Nutrition" },
    { href: "/coupons", label: "Deals & Coupons" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className={`w-full flex flex-col sticky top-0 left-0 right-0 z-[9999] bg-white shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Top Section: Title & Subtitle */}
      <div className="py-4 md:py-6 text-center px-4">
        <Link href="/" title="SaladWorks Menu Home" className="inline-block">
          <span className="block text-[28px] sm:text-4xl md:text-[42px] whitespace-nowrap font-black text-brand-orange tracking-tight mb-2 hover:opacity-90 transition-opacity">
            SaladWorks Menu
          </span>
        </Link>
        <p className="text-[#333333] font-medium text-[15px] md:text-base">
          Full Information About SaladWorks Menu 2026
        </p>
      </div>

      {/* Bottom Section: Navigation Bar */}
      <div className="bg-brand-orange">
        <div className="container mx-auto px-4">
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-4">
            {links.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                title={link.label}
                className="text-white text-[15px] font-medium hover:text-white/80 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden justify-between items-center py-3">
            <span className="text-white font-bold text-lg tracking-wide uppercase">Menu</span>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-orange border-t border-white/20 shadow-xl z-50">
          <nav className="flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                title={link.label}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white px-6 py-3 text-[15px] font-medium hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
