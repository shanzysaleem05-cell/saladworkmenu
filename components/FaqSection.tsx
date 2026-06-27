import React from "react"
import { JsonLd } from "./JsonLd"
import { Plus } from "lucide-react"

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
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
            <details 
              key={index} 
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-colors hover:border-brand-orange/30"
            >
              <summary className="w-full text-left px-6 py-5 flex justify-between items-center cursor-pointer focus:outline-none list-none [&::-webkit-details-marker]:hidden">
                <span className="font-extrabold text-site-black text-lg transition-colors group-open:text-brand-orange">{faq.question}</span>
                <Plus 
                  className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-45 group-open:text-brand-orange shrink-0" 
                />
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-50">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
