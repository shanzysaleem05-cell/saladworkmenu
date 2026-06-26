import { SectionHeading } from "@/components/SectionHeading"
import { AlertTriangle, BookOpen, ShieldCheck, Mail, CheckCircle, Target, Users } from "lucide-react"
import Link from "next/link"

export default function AboutClient() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Hero Section */}
      <section className="bg-site-bg py-16 px-4 text-center border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-site-black tracking-tight mb-6">
            About SaladWorksMenu.us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your most trusted, independent online resource for accurate SaladWorks menu prices, comprehensive nutrition facts, and the latest promotional deals.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Important Transparency Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12 shadow-sm flex gap-4 items-start">
            <AlertTriangle className="text-amber-600 h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Transparency & Legal Disclaimer</h2>
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>SaladWorksMenu.us is an independent informational blog.</strong> We are strictly a fan-run community and are <strong>not affiliated with, endorsed by, or sponsored by SaladWorks, LLC</strong> or any of its subsidiaries. All company names, brand names, trademarks, and logos are the property of their respective owners. Our platform exists solely to provide well-researched, publicly accessible information to consumers. For official information or to place an online order, please visit the official website at saladworks.com.
              </p>
            </div>
          </div>

          {/* Who We Are & Mission */}
          <div className="prose prose-lg text-gray-700 max-w-none mb-16">
            <h2 className="text-3xl font-bold text-site-black mb-6 flex items-center gap-3">
              <Target className="text-brand-orange h-8 w-8" />
              Who We Are & Our Mission
            </h2>
            <p>
              Welcome to <strong>SaladWorksMenu.us</strong>. As passionate food enthusiasts and health-conscious eaters, we realized how difficult it could be to find a centralized, up-to-date list of menu prices and nutritional information for fast-casual dining. Prices often vary by location, and finding exact calorie counts or allergen data can take hours of digging.
            </p>
            <p>
              Our mission is simple: <strong>To empower consumers with accurate, comprehensive, and accessible dining data.</strong> Whether you are tracking your daily macros, searching for vegan-friendly options, or trying to feed your family on a budget, our blog provides the tools and insights you need to make informed dietary and financial decisions.
            </p>
          </div>

          {/* Our Editorial Standards (E-E-A-T) */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-site-black mb-8 flex items-center gap-3">
              <ShieldCheck className="text-brand-orange h-8 w-8" />
              Our Editorial Standards & Methodology
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              To ensure our content meets the highest standards of accuracy and trustworthiness (following Google's E-E-A-T guidelines), we employ a rigorous research methodology:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-site-bg p-6 rounded-xl border border-gray-100">
                <CheckCircle className="text-brand-green h-6 w-6 mb-4" />
                <h3 className="text-xl font-bold text-site-black mb-2">First-Hand Data Collection</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our team regularly visits physical restaurant locations and reviews digital receipts to cross-reference menu prices across different states, ensuring our price estimates reflect real-world costs.
                </p>
              </div>
              
              <div className="bg-site-bg p-6 rounded-xl border border-gray-100">
                <BookOpen className="text-brand-green h-6 w-6 mb-4" />
                <h3 className="text-xl font-bold text-site-black mb-2">Nutritional Accuracy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All calorie, macronutrient, and allergen data published on our blog is meticulously analyzed and cross-referenced with official nutrition PDFs and health databases to ensure your dietary safety.
                </p>
              </div>

              <div className="bg-site-bg p-6 rounded-xl border border-gray-100">
                <Users className="text-brand-green h-6 w-6 mb-4" />
                <h3 className="text-xl font-bold text-site-black mb-2">Community Driven</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We rely on our active readership. If a user spots a regional price difference or a menu update, we verify the submission and update our national database within 24-48 hours.
                </p>
              </div>

              <div className="bg-site-bg p-6 rounded-xl border border-gray-100">
                <ShieldCheck className="text-brand-green h-6 w-6 mb-4" />
                <h3 className="text-xl font-bold text-site-black mb-2">Original Content</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We strictly prohibit AI-generated filler or scraped content. Every article, guide, and review on SaladWorksMenu.us is written by human food experts who genuinely care about the brand.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Feedback */}
          <div className="bg-brand-deep rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <Mail className="h-12 w-12 text-brand-orange mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold text-white mb-4">Help Us Stay Accurate</h2>
            <p className="text-white leading-relaxed mb-8 max-w-2xl mx-auto">
              The restaurant industry moves fast. If you notice an outdated price, a new seasonal item, or have questions regarding our content, our editorial team wants to hear from you. Your feedback is what makes this blog a reliable resource for thousands of monthly readers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-brand-orange text-white font-bold px-8 py-3 rounded-lg shadow-sm hover:bg-[#c44e30] transition-colors">
                Contact the Editor
              </Link>
              <Link href="/menu" className="bg-white text-site-black font-bold px-8 py-3 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                View the Menu
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}
