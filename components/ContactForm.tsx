"use client"

import { useState } from "react"
import { Button } from "./Button"
import { CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => setStatus("idle"), 5000)
    }, 1000)
  }

  if (status === "success") {
    return (
      <div className="bg-brand-mint/20 border border-brand-green/30 rounded-xl p-8 flex flex-col items-center text-center py-12">
        <CheckCircle2 className="h-12 w-12 text-brand-green mb-4" />
        <h3 className="text-2xl font-bold text-brand-green mb-2">Message Sent!</h3>
        <p className="text-site-black">Thank you for reaching out. Our team will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-site-black mb-2">Full Name</label>
          <input 
            type="text" 
            id="name" 
            required 
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all bg-site-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-site-black mb-2">Email Address</label>
          <input 
            type="email" 
            id="email" 
            required 
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all bg-site-white"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-site-black mb-2">Subject</label>
        <input 
          type="text" 
          id="subject" 
          required 
          className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all bg-site-white"
          placeholder="How can we help you?"
        />
      </div>
      
      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-medium text-site-black mb-2">Message</label>
        <textarea 
          id="message" 
          rows={5} 
          required 
          className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all bg-site-white resize-none"
          placeholder="Write your message here..."
        ></textarea>
      </div>
      
      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
