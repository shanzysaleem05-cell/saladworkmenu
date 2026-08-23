import { SectionHeading } from "@/components/SectionHeading"
import { ContactForm } from "@/components/ContactForm"
import { Mail, Info, ExternalLink, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata = {
  title: "Contact Us | SaladWorks",
  description: "Get in touch with the SaladWorksMenu.us team. We'd love to hear your feedback.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Hero Section */}
      <section className="bg-site-bg py-16 px-4 text-center border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-site-black tracking-tight mb-4">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a question, feedback, or want to report an inaccuracy? We're here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-site-bg">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Info Side (Left - 40%) */}
            <div className="w-full lg:w-2/5 flex flex-col order-2 lg:order-1">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-10 shadow-sm">
                <div className="flex gap-3">
                  <Info className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 text-lg mb-2">Important Notice</h3>
                    <p className="text-red-700 text-[15px] leading-relaxed">
                      Please note that we are <strong>not affiliated with SaladWorks</strong>. For official restaurant inquiries, locations, reservations, or complaints, please contact SaladWorks directly through their official website.
                    </p>
                  </div>
                </div>
              </div>

              <SectionHeading title="Email Us Directly" />
              <div className="flex items-center gap-4 mb-10 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-site-black text-[15px] mb-1">Email</h3>
                  <a href="mailto:contact@saladworksmenu.us" className="text-brand-orange hover:underline font-bold text-[15px] sm:text-lg block break-all">contact@saladworksmenu.us</a>
                  <p className="text-[12px] text-gray-500 mt-1">We typically respond within 24-48 hours.</p>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-site-black text-xl mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-brand-orange" />
                  What we can help with:
                </h3>
                <ul className="space-y-3 text-gray-600 text-[15px]">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange font-bold mt-0.5">•</span>
                    Website feedback or suggestions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange font-bold mt-0.5">•</span>
                    Menu information updates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange font-bold mt-0.5">•</span>
                    Pricing corrections for specific states
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange font-bold mt-0.5">•</span>
                    Advertising inquiries
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-site-black text-xl mb-4">For Official Information</h3>
                <p className="text-gray-600 text-[15px] mb-4">
                  If you need to contact the actual restaurant chain regarding:
                </p>
                <ul className="space-y-2 text-gray-600 text-[15px] mb-6">
                  <li>- Food quality or service complaints</li>
                  <li>- Employment or career opportunities</li>
                  <li>- Official corporate inquiries</li>
                </ul>
                <a href="https://saladworks.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-site-black font-bold py-3 px-5 rounded-lg transition-colors text-[14px]">
                  Visit Official Website <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Form Side (Right - 60%) */}
            <div className="w-full lg:w-3/5 order-1 lg:order-2">
              <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
                <h2 className="text-[28px] sm:text-[32px] font-black text-site-black mb-2">Hello, Salad Lover! 👋</h2>
                <p className="text-gray-500 mb-8 text-[15px] sm:text-[16px]">Drop us a message below and our team will get back to you as soon as possible.</p>
                <ContactForm />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
