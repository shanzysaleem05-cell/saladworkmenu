import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Legal & Privacy Policy",
  description: "Read the SaladWorks Menu & Prices legal terms of service, privacy policy, and cookie policy. We are committed to transparency and user privacy.",
  keywords: ["SaladWorks privacy policy", "SaladWorks terms", "SaladWorks legal"],
  alternates: {
    canonical: "https://saladworksmenu.us/legal",
  },
  openGraph: {
    title: "Legal & Privacy Policy | SaladWorks",
    description: "Read the SaladWorks Menu & Prices legal terms of service, privacy policy, and cookie policy.",
    url: "https://saladworksmenu.us/legal",
  },
}

export default function LegalPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Legal & Privacy Policy - SaladWorks",
    "description": "Terms of service and privacy policy for SaladWorks menu site.",
    "url": "https://saladworksmenu.us/legal",
  }

  const faqs = [
    {
      question: "How do you collect data?",
      answer: "We collect minimal data necessary for site functionality, primarily through standard analytics and cookies to improve user experience."
    },
    {
      question: "Are prices guaranteed to be accurate?",
      answer: "While we strive for 100% accuracy, prices provided are estimates and may vary by location. Please confirm with your local SaladWorks."
    },
    {
      question: "Is this the official SaladWorks website?",
      answer: "This is an informational site providing menu, pricing, and nutritional details. It is intended for educational purposes."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Legal", href: "/legal" }
      ]} />
      
      <div className="py-24 bg-site-bg">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              Legal & Privacy
            </h1>
            <p className="text-gray-500 text-lg">Last updated: 2026</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium">
            <h2 id="terms" className="text-2xl font-black text-site-black mb-4">1. Terms of Use</h2>
            <p className="mb-8">
              By accessing this website, you agree to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>

            <h2 id="privacy" className="text-2xl font-black text-site-black mb-4 mt-8">2. Privacy Policy</h2>
            <p className="mb-8">
              Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you.
            </p>

            <h2 id="disclaimer" className="text-2xl font-black text-site-black mb-4 mt-8">3. Disclaimer</h2>
            <p className="mb-8">
              The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 id="dmca" className="text-2xl font-black text-site-black mb-4 mt-8">4. DMCA (Digital Millennium Copyright Act)</h2>
            <p className="mb-8">
              We respect the intellectual property rights of others. If you believe that any material on our site infringes upon any copyright which you own or control, you may send a notification of such infringement to contact@saladworksmenu.us for prompt removal.
            </p>

            <h2 id="affiliate" className="text-2xl font-black text-site-black mb-4 mt-8">5. Affiliate Disclosure</h2>
            <p className="mb-8">
              This site is a participant in affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking. Any products or services recommended here are chosen based on their value to our readers.
            </p>

            <h2 id="cookies" className="text-2xl font-black text-site-black mb-4 mt-8">6. Cookies Policy</h2>
            <p className="mb-8">
              We use cookies to improve your experience on our website. Cookies help us understand how visitors interact with our site, allowing us to customize content and enhance overall site navigation and performance.
            </p>

            <h2 id="accessibility" className="text-2xl font-black text-site-black mb-4 mt-8">7. Accessibility Statement</h2>
            <p className="mb-8">
              We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to guarantee a seamless browsing experience.
            </p>
          </div>
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </div>
  )
}
