import Link from "next/link"

export function Footer() {
  const links = [
    { label: "Privacy Policy", href: "/legal#privacy" },
    { label: "Terms & Conditions", href: "/legal#terms" },
    { label: "Disclaimer", href: "/legal#disclaimer" },
    { label: "DMCA", href: "/legal#dmca" },
    { label: "Affiliate Disclosure", href: "/legal#affiliate" },
    { label: "Cookies Policy", href: "/legal#cookies" },
    { label: "Accessibility", href: "/legal#accessibility" },
  ]

  return (
    <footer className="w-full flex flex-col mt-auto">
      {/* Top section with links */}
      <div className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          {links.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href} 
              className="text-[#4b5563] hover:text-[#D85A3B] text-[14px] font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom section with copyright */}
      <div className="bg-[#D85A3B] py-4 px-4 text-center">
        <p className="text-white text-[14px] font-bold tracking-wide">
          © 2026 SaladWorks Menu Prices 2026: Full Nutrition & Calories Guide
        </p>
      </div>
    </footer>
  )
}
