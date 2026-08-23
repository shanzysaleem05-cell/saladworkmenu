import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Terms & Conditions of using SaladWorksMenu.us, an independent informational fan guide.",
  alternates: {
    canonical: "https://saladworksmenu.us/terms-and-conditions",
  },
}

export default function TermsConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" }
      ]} />
      
      <div className="py-24 bg-site-bg">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[44px] font-black text-site-black leading-tight tracking-tight mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-500 text-lg">Last updated: July 2026</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 text-[15px] text-red-800 rounded-r-lg">
              <strong>Independent Fan Site Disclaimer:</strong> SaladWorksMenu.us is an independent, unofficial fan guide and is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with SaladWorks, LLC or any of its subsidiaries or its affiliates.
            </div>

            <p className="mb-8">
              Welcome to SaladWorksMenu.us. By accessing this website we assume you accept these terms and conditions. Do not continue to use SaladWorksMenu.us if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">1. Informational Purpose Only</h2>
            <p className="mb-8">
              The content provided on SaladWorksMenu.us is for informational and educational purposes only. We strive to keep the menu, prices, and nutritional information up to date, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on this website. 
              <br/><br/>
              Prices and menu items vary significantly by location and are subject to change without notice. Always contact your local SaladWorks restaurant directly for the most accurate and current information.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-8">
              Unless otherwise stated, SaladWorksMenu.us and/or its licensors own the intellectual property rights for all material on this website (excluding the SaladWorks trademark and brand assets, which belong to SaladWorks, LLC). You may access this from SaladWorksMenu.us for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">3. User Comments and Feedback</h2>
            <p className="mb-8">
              Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. SaladWorksMenu.us does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of SaladWorksMenu.us, its agents, and/or affiliates.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">4. Limitation of Liability</h2>
            <p className="mb-8">
              In no event shall SaladWorksMenu.us, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. SaladWorksMenu.us, including its officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">5. Hyperlinking to our Content</h2>
            <p className="mb-8">
              The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.
            </p>

            <h2 className="text-2xl font-black text-site-black mb-4">6. Indemnification</h2>
            <p className="mb-8">
              You hereby indemnify to the fullest extent SaladWorksMenu.us from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
