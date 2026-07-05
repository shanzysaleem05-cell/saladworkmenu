import { Plus } from "lucide-react"
import { homeFaqs } from "@/data/homeFaqs"

export function FAQAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {homeFaqs.map((faq, index) => (
        <details 
          key={index} 
          className="group border border-gray-200 rounded-xl bg-white shadow-sm transition-colors hover:border-brand-orange/30 overflow-hidden"
        >
          <summary className="w-full text-left px-6 py-5 flex items-center justify-between cursor-pointer focus:outline-none list-none [&::-webkit-details-marker]:hidden">
            <h3 className="font-bold text-[16px] text-site-black m-0 transition-colors group-open:text-brand-orange">
              {faq.question}
            </h3>
            <Plus 
              className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-45 group-open:text-brand-orange shrink-0" 
            />
          </summary>
          <div className="px-6 pb-6 pt-2 text-gray-500 text-[15px] leading-relaxed border-t border-gray-50">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
