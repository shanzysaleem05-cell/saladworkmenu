import { SectionHeading } from "@/components/SectionHeading"
import { ContactForm } from "@/components/ContactForm"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | SaladWorks",
  description: "Get in touch with SaladWorks. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Hero Section */}
      <section className="bg-site-bg py-16 px-4 text-center border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-site-black tracking-tight mb-4">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-site-bg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Form Side */}
            <div className="w-full lg:w-3/5">
              <SectionHeading title="Send us a message" />
              <ContactForm />
            </div>
            
            {/* Info Side */}
            <div className="w-full lg:w-2/5 flex flex-col">
              <SectionHeading title="Get in touch" />
              
              <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-site-black text-lg mb-1">Our Location</h3>
                    <p className="text-gray-500">123 Fresh Avenue<br/>Food City, FC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-site-black text-lg mb-1">Phone Number</h3>
                    <p className="text-gray-500">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-site-black text-lg mb-1">Email Address</h3>
                    <p className="text-gray-500">hello@saladworks.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-site-black text-lg mb-1">Operating Hours</h3>
                    <p className="text-gray-500">Mon-Fri: 10am - 9pm<br/>Sat-Sun: 11am - 8pm</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-gray-100 w-full h-64 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                <div className="text-center p-4">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2 opacity-50" />
                  <span className="text-gray-500 text-sm font-medium">Interactive Google Map<br/>(Placeholder)</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
