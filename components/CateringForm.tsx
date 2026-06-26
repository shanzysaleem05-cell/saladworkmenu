"use client"

import { Button } from "./Button"
import { useState, useRef } from "react"
import { submitCateringQuote } from "@/app/catering/actions"

export function CateringForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await submitCateringQuote(formData)
      if (res.success) {
        setStatus("success")
        if (formRef.current) formRef.current.reset()
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <form ref={formRef} className="mt-12 bg-site-white border border-gray-200 rounded-xl p-8 shadow-sm" onSubmit={handleSubmit}>
      {status === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
          Quote request sent! A catering specialist will contact you within 24 hours.
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          Something went wrong. Please try again or email us at contact@saladworksmenu.us
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-site-black mb-2">Full Name</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 peer" placeholder="Jane Doe" />
          <p className="text-red-500 text-xs mt-1 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Please enter your full name</p>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-site-black mb-2">Email Address</label>
          <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 peer" placeholder="jane@company.com" />
          <p className="text-red-500 text-xs mt-1 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Please enter a valid email address</p>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-site-black mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" required minLength={10} className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 peer" placeholder="(555) 123-4567" />
          <p className="text-red-500 text-xs mt-1 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Please enter a valid phone number (at least 10 digits)</p>
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-site-black mb-2">Event Date</label>
          <input type="date" id="eventDate" name="eventDate" required min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 peer" />
          <p className="text-red-500 text-xs mt-1 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Please select a future date</p>
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-site-black mb-2">Number of Guests</label>
          <input type="number" id="guests" name="guests" min="10" required className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 peer" placeholder="25" />
          <p className="text-red-500 text-xs mt-1 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Minimum 10 guests required</p>
        </div>
        <div>
          <label htmlFor="package" className="block text-sm font-medium text-site-black mb-2">Package Selection</label>
          <select id="package" name="package" required className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none">
            <option value="basic">Basic Package (Up to 10)</option>
            <option value="party">Party Package (Up to 25)</option>
            <option value="corporate">Corporate Package (Up to 50)</option>
            <option value="custom">Custom Order</option>
          </select>
        </div>
      </div>
      
      <div className="mb-8">
        <label htmlFor="requests" className="block text-sm font-medium text-site-black mb-2">Special Requests / Dietary Needs</label>
        <textarea id="requests" name="requests" rows={4} className="w-full px-4 py-3 rounded-md border border-gray-200 bg-site-white focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none resize-none" placeholder="E.g., 5 vegetarian wraps, 2 gluten-free options..."></textarea>
      </div>
      
      <Button size="lg" className="w-full" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Request"}
      </Button>
    </form>
  )
}
