import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Learn how we use cookies and similar technologies on SaladWorksMenu.us to improve user experience and deliver relevant content.",
  alternates: {
    canonical: "https://saladworksmenu.us/cookies-policy",
  },
}

export default function CookiesPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Cookies Policy", href: "/cookies-policy" }
      ]} />
      
      <div className="py-24 bg-site-bg">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              Cookies Policy
            </h1>
            <p className="text-gray-500 text-lg">Last updated: July 2026</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 text-[15px] text-red-800 rounded-r-lg">
              <strong>Independent Fan Site Disclaimer:</strong> SaladWorksMenu.us is an independent, unofficial fan guide and is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with SaladWorks, LLC or any of its subsidiaries or its affiliates.
            </div>

            <p className="mb-8">
              This Cookies Policy explains what Cookies are and how we use them on SaladWorksMenu.us. You should read this policy so you can understand what type of cookies we use, or the information we collect using Cookies and how that information is used.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">1. What Are Cookies?</h2>
            <p className="mb-8">
              Cookies are small files that are placed on your computer, mobile device, or any other device by a website, containing the details of your browsing history on that website among its many uses. They are widely used to make websites work or work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">We use cookies for several reasons detailed below:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Essential Cookies:</strong> These are cookies that are required for the operation of our website.</li>
              <li><strong>Analytics Cookies:</strong> We use Google Analytics to measure how users interact with website content, which helps us improve our site and your experience.</li>
              <li><strong>Advertising Cookies:</strong> We use advertising networks like Google AdSense and Monumetric. These third-party vendors use cookies to serve ads based on your prior visits to our website or other websites.</li>
            </ul>

            <h2 className="text-2xl font-black text-site-black mb-4">3. Third-Party Cookies</h2>
            <p className="mb-8">
              In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
              <br/><br/>
              This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">4. Managing Cookies</h2>
            <p className="mb-8">
              You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Therefore, it is recommended that you do not disable cookies.
              <br/><br/>
              If you wish to opt out of Google's use of cookies for personalized advertising, you can do so by visiting <a href="https://g.co/adsettings" className="text-brand-orange hover:underline">Google's Ad Settings</a>.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">5. Contact Us</h2>
            <p className="mb-8">
              If you have any questions about our Cookies Policy, please contact us by visiting the <a href="/contact" className="text-brand-orange hover:underline">Contact page</a> on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
