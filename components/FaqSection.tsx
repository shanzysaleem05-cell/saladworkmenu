"use client"

import React, { useState } from "react"
import { JsonLd } from "./JsonLd"

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <JsonLd data={schema} />
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-black text-site-black mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="font-extrabold text-site-black text-lg">{faq.question}</span>
                <span className="text-brand-green ml-4 transition-transform duration-300 flex-shrink-0" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
