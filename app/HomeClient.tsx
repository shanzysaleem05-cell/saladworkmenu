"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Leaf, ShieldCheck, MapPin, Gift, HelpCircle, Smartphone, Star, ChevronRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/Button"
import { FAQAccordion } from "@/components/FAQAccordion"
import { FoodCard } from "@/components/FoodCard"
import { menuData } from "@/data/menuData"

export default function HomeClient() {
  const [isOpen, setIsOpen] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      
      // Sunday=0, Monday=1, ..., Saturday=6
      if (day >= 1 && day <= 4) { // Mon-Thu 10am-9pm
        setIsOpen(hour >= 10 && hour < 21)
      } else if (day === 5 || day === 6) { // Fri-Sat 10am-10pm
        setIsOpen(hour >= 10 && hour < 22)
      } else if (day === 0) { // Sun 11am-8pm
        setIsOpen(hour >= 11 && hour < 20)
      }
    }
    checkOpenStatus()
    const interval = setInterval(checkOpenStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 3000)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hidden Date for SEO */}
      <time 
        dateTime="2026-06-01" 
        className="hidden"
        itemProp="dateModified"
      >
        2026-06-01
      </time>

      {/* Section 1: Hero */}
      <section className="w-full pt-16 pb-24 bg-site-bg flex flex-col items-center justify-center text-center px-4">
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[32px] md:text-[44px] font-extrabold text-site-black mb-6 tracking-tight leading-tight max-w-3xl mx-auto"
        >
          SaladWorks Menu Prices 2026 <br />
          Complete Guide
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-[800px] leading-relaxed"
        >
          Discover the latest SaladWorks <Link href="/menu" className="font-semibold text-brand-orange hover:underline">menu prices</Link>, verified calorie 
          counts, and complete nutritional facts for 2026. From custom 
          lunch combos starting at $10.49 and classic wraps to unlimited 
          soup and salad deals, this independent guide helps visitors 
          plan a delicious, value-packed SaladWorks dining experience.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <span className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 bg-site-white shadow-sm">19 Categories</span>
          <span className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 bg-site-white shadow-sm">304+ Menu Items</span>
          <span className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 bg-site-white shadow-sm">Prices Verified</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          <Button size="lg" className="rounded-none px-8 h-14 text-base font-bold shadow-md flex items-center gap-2" asChild>
            <Link href="/menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              View Complete Menu & Prices
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-none border border-gray-300 bg-site-white text-site-black hover:bg-gray-50 hover:text-site-black px-8 h-14 text-base font-bold shadow-sm flex items-center gap-2" asChild>
            <Link href="/menu#deals">
              Get Coupons & Save
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Section 2: What Makes Us Special */}
      <section className="py-20 bg-site-bg border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="text-center mb-10 w-full flex flex-col items-center">
            <h2 className="text-[30px] md:text-[38px] lg:text-[44px] font-extrabold text-site-black tracking-tight leading-tight md:whitespace-nowrap max-w-none">
              The Complete SaladWorks Menu Guide for 2026
            </h2>
          </div>
          
          <div className="space-y-6 text-[#4b5563] text-lg leading-relaxed font-medium text-center max-w-[1000px] mx-auto">
            <p>
              SaladWorks is known for generous portions and fresh daily 
              preparation. Guests love pairing items from the <Link href="/menu" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">full menu</Link> with SaladWorks' famous <Link href="/menu#salads" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">signature salads and dressings</Link>. SaladWorks prepares dressings fresh every morning and provides complete <Link href="/menu#nutrition" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">nutrition details</Link> for full transparency.
            </p>
            <p>
              SaladWorks offers great value through their <Link href="/menu" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">lunch specials</Link> and popular <Link href="/menu#pick-2" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">Pick 2 Combo</Link> deals. Enjoy rotating <Link href="/blog" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">seasonal specials</Link> for limited-time recipes, or order SaladWorks <Link href="/catering" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">catering packages</Link> for your next office gathering or family celebration.
            </p>
            <p>
              SaladWorks caters to all dietary needs with their <Link href="/menu" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">gluten-free menu</Link> and <Link href="/menu" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">vegetarian menu</Link>. Enjoy your favorites at home with convenient delivery & to-go options, or customize your meal entirely with the <Link href="/menu" className="font-semibold text-brand-orange underline underline-offset-4 decoration-[1.5px] hover:text-[#c44e30] hover:decoration-[#c44e30] transition-colors">build your own salad</Link> feature.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Sections Banner */}
      <div className="bg-[#fefce8] border-b border-t border-[#fde047] py-3 px-4 flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-amber-800 text-center">
          Prices and calories are estimates for 2026. They may vary by location and customization. Always verify at your local SaladWorks.
        </span>
      </div>

      {/* Menu Categories */}
      {menuData.map((category, index) => {
        const bgColor = index % 2 === 0 ? "bg-site-bg" : "bg-site-white";

        return (
          <section key={category.id} className={`py-24 ${bgColor}`} id={category.id}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                  <h2 className="text-[32px] md:text-[40px] font-extrabold text-site-black tracking-tight leading-tight mb-2">
                    {category.title} — Prices & Calories
                  </h2>
                  <p className="text-[#6b7280] text-lg">{category.subtitle}</p>
                </div>
                <Link href={`/menu#${category.id}`} className="inline-flex items-center text-brand-orange font-bold hover:text-[#c44e30] transition-colors whitespace-nowrap">
                  All {category.title} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
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
                          <h3 className="font-bold text-site-black text-[13px] leading-tight m-0">{opt.label}</h3>
                          <span className="text-brand-orange text-[11px] font-bold mt-0.5">{opt.cal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
                {category.items.slice(0, 4).map((item) => (
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
            </div>
          </section>
        );
      })}

      {/* Section: Coupons & Deals */}
      <section className="py-24 bg-white" id="deals">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block bg-brand-orange text-white text-xs font-black px-4 py-1.5 uppercase tracking-widest mb-5">
              🏷️ Limited Time Offers
            </span>
            <h2 className="text-[36px] md:text-[48px] font-black text-site-black leading-tight tracking-tight">
              Limited Time Offers
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
              Online-only deals refreshed weekly. Save big on salads, wraps & more.
            </p>
          </div>

          <p className="text-center text-sm italic text-gray-400 mb-8 max-w-2xl mx-auto">
            Coupon codes below are sourced from SaladWorks promotions and may expire. Always verify code validity at checkout before ordering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { code: "FRESH20", title: "20% Off Your Entire Order", desc: "Use this code at checkout. Valid on all menu items.", badge: "POPULAR" },
              { code: "PICK2SDAY", title: "$2 Off a Pick 2 Combo", desc: "Mix & match any 2 items from our combo menu.", badge: "" },
              { code: "SWPERK0214", title: "2 Signature Salads for $20", desc: "Must order 2 qualifying Signature or Premium salads.", badge: "HOT DEAL" },
              { code: "10SALADS", title: "$10 Off Storewide", desc: "Valid on any order across the entire menu.", badge: "" },
            ].map((c, i) => (
              <div key={i} className="flex items-stretch gap-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group">
                <div className="bg-brand-orange w-3 shrink-0 group-hover:w-4 transition-all"></div>
                <div className="flex-1 bg-white p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      {c.badge && <span className="inline-block bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-widest px-2 py-0.5 mb-2">{c.badge}</span>}
                      <h3 className="font-black text-site-black text-lg leading-tight m-0">{c.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{c.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex-1 border-2 border-dashed border-brand-orange/40 bg-orange-50 px-4 py-2 font-black text-brand-orange tracking-widest text-center">
                      {c.code}
                    </div>
                    <button 
                      onClick={() => handleCopyCode(c.code)}
                      className="bg-brand-orange text-white font-bold px-5 py-2 hover:bg-[#c44e30] transition-colors text-sm shrink-0 min-w-[120px]"
                    >
                      {copiedCode === c.code ? "Code copied!" : "Copy Code"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/coupons" className="inline-flex items-center gap-2 text-brand-orange font-bold text-[15px] hover:text-[#c44e30] transition-colors">
              View All Coupons & Deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: SaladWorks Rewards */}
      <section className="py-0 bg-site-black">
        <div className="flex flex-col lg:flex-row min-h-[480px]">
          <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-20">
            <span className="inline-block border border-brand-orange text-brand-orange text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-8 w-fit">
              SaladWorks Rewards
            </span>
            <h2 className="text-[36px] md:text-[52px] font-black text-white leading-tight tracking-tight mb-6">
              SaladWorks Rewards
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
              Earn 1 point for every $1 you spend. Unlock free offers, exclusive deals, and stay up to date with the freshest news from SaladWorks.
            </p>
            <a 
              href="https://saladworks.com/rewards" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-black px-8 py-4 hover:bg-[#c44e30] transition-colors w-fit text-[15px]"
            >
              Join Rewards Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex-1 bg-[#111] flex flex-col justify-center gap-0 divide-y divide-white/10">
            {[
              { icon: <Smartphone className="w-7 h-7" />, num: "01", title: "Download App", desc: "Available on iOS & Android for free." },
              { icon: <Star className="w-7 h-7" />, num: "02", title: "Earn Points", desc: "1 point per $1 spent on every order." },
              { icon: <Gift className="w-7 h-7" />, num: "03", title: "Get Rewards", desc: "Redeem points for free food & exclusive perks." },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-6 px-10 py-8 hover:bg-white/5 transition-colors group">
                <div className="text-brand-orange opacity-40 font-black text-4xl w-12 shrink-0">{step.num}</div>
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-all">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-black text-white text-lg m-0">{step.title}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Hours of Operation */}
      <section className="py-24 bg-site-bg">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-6">
              🕐 Store Hours
            </span>
            <h2 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              Store Hours
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
              Hours may vary by location. Please contact your nearest SaladWorks to confirm current hours.
            </p>
            <div className={`inline-flex items-center gap-3 bg-white border rounded-xl px-6 py-3 shadow-sm ${isOpen ? 'border-green-200' : 'border-red-200'}`}>
              <span className={`w-3 h-3 rounded-full shrink-0 ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="font-bold text-site-black text-sm">{isOpen ? 'Currently Open' : 'Currently Closed'}</span>
              <span className="text-gray-400 text-sm ml-4">Local Time Check</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { day: "Monday",    hours: "10:00 AM – 09:00 PM" },
              { day: "Tuesday",   hours: "10:00 AM – 09:00 PM" },
              { day: "Wednesday", hours: "10:00 AM – 09:00 PM" },
              { day: "Thursday",  hours: "10:00 AM – 09:00 PM" },
              { day: "Friday",    hours: "10:00 AM – 10:00 PM" },
              { day: "Saturday",  hours: "10:00 AM – 10:00 PM" },
              { day: "Sunday",    hours: "11:00 AM – 08:00 PM" },
            ].map((row) => (
              <div
                key={row.day}
                className="flex items-center justify-between px-6 py-5 rounded-xl border transition-all bg-white border-gray-200 shadow-sm hover:border-brand-orange/30 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-green-500"></span>
                  <span className="font-bold text-site-black text-[16px]">{row.day}</span>
                </div>
                <span className="font-black text-[15px] text-brand-orange">
                  {row.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Catering Overview */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block bg-brand-orange text-white text-xs font-black px-4 py-1.5 uppercase tracking-widest mb-5">
              SaladWorks Catering
            </span>
            <h2 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              SaladWorks Catering
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From corporate lunches to family celebrations, SaladWorks catering brings fresh, customizable food directly to your event.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { title: "Salad Bar", desc: "Custom base, proteins, dressings", serving: "8–10" },
              { title: "Group Trays", desc: "Wraps, sandwiches & panini melts", serving: "8–10" },
              { title: "Group Bowls", desc: "Salad or grain bowls to share", serving: "8–10" },
              { title: "Boxed Meals", desc: "Individual freshly boxed meals", serving: "Any size" },
              { title: "Group Side Salads", desc: "Side salads for the whole group", serving: "8–10" },
              { title: "Grazer Trays", desc: "Pick-and-choose favorite bites", serving: "8–10" },
              { title: "Sides & Desserts", desc: "Cookies, sides & sweet treats", serving: "8–10" },
              { title: "Beverages", desc: "Complete your meal with drinks", serving: "Any size" },
            ].map((item, i) => (
              <div key={i} className="bg-site-bg border border-gray-100 rounded-xl p-5 hover:border-brand-orange/30 hover:shadow-md transition-all">
                <h3 className="font-black text-site-black text-base mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{item.desc}</p>
                {item.serving && <span className="text-xs font-bold text-brand-orange">Serves {item.serving}</span>}
              </div>
            ))}
          </div>

          <div className="text-center flex flex-col items-center justify-center gap-4">
            <Link href="/catering" className="inline-flex items-center gap-2 bg-brand-orange text-white font-black px-8 py-4 hover:bg-[#c44e30] transition-colors text-[15px]">
              Explore Full Catering Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/catering" className="text-brand-orange font-bold text-sm hover:underline mt-2">
              Learn more about SaladWorks catering options →
            </Link>
          </div>
        </div>
      </section>

      {/* Section: FAQ */}
      <section className="py-24 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-brand-orange/10 text-brand-orange px-3 py-1.5 rounded-full text-[12px] font-extrabold uppercase tracking-widest mb-4 inline-block">Got Questions?</span>
            <h2 className="text-[36px] md:text-[44px] font-black text-site-black tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#6b7280] mt-4 max-w-2xl mx-auto">Everything you need to know about SaladWorks ingredients, catering, and dietary options.</p>
          </div>
          
          <FAQAccordion />
          
        </div>
      </section>
    </div>
  )
}
