"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/SectionHeading"
import { Scissors, Clock, Tag, Check } from "lucide-react"

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button 
      onClick={handleCopy}
      className={`font-bold py-3 w-full rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 ${copied ? 'bg-[#8dc63f] hover:bg-[#7ab133] text-white' : 'bg-brand-orange hover:bg-[#c44e30] text-white'}`}
    >
      {copied ? <><Check className="h-4 w-4" /> Copied!</> : 'Copy Code'}
    </button>
  )
}



export default function CouponsPage() {
  const codes = [
    {
      code: "SWPERK0214",
      title: "Get 2 For 20 Dollars On Signature Or Premium Salads",
      desc: "Get 2 for 20 Dollars on Signature or Premium Salads (must Order 2) at Saladworks.",
      lastUsed: "17h ago",
      verified: "17h ago",
      usesToday: 4,
    },
    {
      code: "SWORKS25",
      title: "$25 Off Catering Order",
      desc: "$25 Off Catering Order at Saladworks w/Code.",
      lastUsed: "6d ago",
      verified: "6d ago",
      usesToday: 2,
    },
    {
      code: "PICK2SDAY",
      title: "$2 Off a Pick 2",
      desc: "$2 Off a Pick 2 at Saladworks w/Code.",
      lastUsed: "1d ago",
      verified: "1d ago",
      usesToday: 1,
    },
    {
      code: "10SALADS",
      title: "$10 Off Storewide",
      desc: "$10 Off Storewide at Saladworks w/Code.",
      lastUsed: "12h ago",
      verified: "12h ago",
      usesToday: 1,
    },
  ]

  const deals = [
    {
      title: "Save on Fresh Favorites with Saladworks Pick 2 Combos",
      used: "19 days ago"
    },
    {
      title: "Shop on Sides and Desserts for as low as $3.09 at Saladworks",
      used: "Active Now"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Hero Section */}
      <section className="bg-site-white py-16 px-4 text-center border-b border-gray-200 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-brand-orange tracking-tight mb-4">
            Saladworks Promo Codes & Coupons June 2026
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Find the best verified discount codes and offers to save on your next fresh meal.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-4xl">
          
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Scissors className="h-6 w-6 text-brand-orange" />
              <h2 className="text-3xl font-extrabold text-site-black">Active Promo Codes</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {codes.map((promo, idx) => (
                <div key={idx} className="bg-white border border-brand-orange/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange"></div>
                  
                  <div className="flex-1 w-full text-center md:text-left">
                    <span className="inline-block bg-orange-100 text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Community Code</span>
                    <h3 className="text-xl font-bold text-site-black mb-2">{promo.title}</h3>
                    <p className="text-gray-600 mb-4">{promo.desc}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Last Verified: {promo.verified}</span>
                      <span>•</span>
                      <span>Uses today: {promo.usesToday}</span>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto flex flex-col items-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                    <div className="border-2 border-dashed border-brand-orange/40 bg-orange-50 text-brand-orange font-black text-xl px-6 py-3 rounded-lg w-full text-center tracking-wider">
                      {promo.code}
                    </div>
                    <CopyButton code={promo.code} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Tag className="h-6 w-6 text-brand-green" />
              <h2 className="text-3xl font-extrabold text-site-black">More Saladworks Deals</h2>
            </div>
            <p className="text-gray-600 mb-8 font-medium">Explore the best Saladworks offers that don't require a code.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deals.map((deal, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                  <div className="bg-brand-green/10 text-brand-green font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Deal</div>
                  <h3 className="text-lg font-bold text-site-black mb-6 flex-1">{deal.title}</h3>
                  <button className="bg-site-black text-white font-bold py-2.5 px-6 w-full rounded-lg hover:bg-gray-800 transition-colors">
                    Get Deal
                  </button>
                  <p className="text-xs text-gray-400 mt-4 font-medium">Last used: {deal.used}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
