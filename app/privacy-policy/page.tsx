import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we collect, use, and protect your information on our independent SaladWorks fan guide.",
  alternates: {
    canonical: "https://saladworksmenu.us/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy", href: "/privacy-policy" }
      ]} />
      
      <div className="py-24 bg-site-bg">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-lg">Last updated: July 2026</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 text-[15px] text-red-800 rounded-r-lg">
              <strong>Independent Fan Site Disclaimer:</strong> SaladWorksMenu.us is an independent, unofficial fan guide and is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with SaladWorks, LLC or any of its subsidiaries or its affiliates.
            </div>

            <p className="mb-8">
              At SaladWorksMenu.us, accessible from https://saladworksmenu.us, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SaladWorksMenu.us and how we use it.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">1. Information We Collect</h2>
            <p className="mb-8">
              We collect information to provide better services to all our users. The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              <br/><br/>
              If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, for customer service</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-black text-site-black mb-4">3. Log Files</h2>
            <p className="mb-8">
              SaladWorksMenu.us follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">4. Google DoubleClick DART Cookie</h2>
            <p className="mb-8">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL â€“ <a href="https://policies.google.com/technologies/ads" className="text-brand-orange hover:underline">https://policies.google.com/technologies/ads</a>
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">5. Advertising Partners</h2>
            <p className="mb-8">
              Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense and Monumetric. Each of our advertising partners has their own Privacy Policy for their policies on user data.
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on SaladWorksMenu.us, which are sent directly to users' browser.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">6. CCPA Privacy Rights & GDPR Data Protection Rights</h2>
            <p className="mb-8">
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              <br/><br/>
              The right to access â€“ You have the right to request copies of your personal data.<br/>
              The right to rectification â€“ You have the right to request that we correct any information you believe is inaccurate.<br/>
              The right to erasure â€“ You have the right to request that we erase your personal data, under certain conditions.<br/>
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">7. Children's Information</h2>
            <p className="mb-8">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              SaladWorksMenu.us does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
