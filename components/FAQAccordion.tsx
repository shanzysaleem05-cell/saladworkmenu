import { Plus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How much does a salad cost at SaladWorks?",
    answer: "SaladWorks salad prices range from $11.99 for Sophies Salad to $14.99 for the Steakhouse Salad. Signature salads average $12.49–$13.49. Prices may vary by location."
  },
  {
    question: "Does SaladWorks have a kids menu?",
    answer: "Yes. The SaladWorks Kids Works menu includes Kids Bento Box ($7.99), Kids Create Your Own Salad ($6.99), Kids Grilled Cheese ($6.49), and Kids Grilled Chicken Quesadilla ($7.49). All kids meals are under $8."
  },
  {
    question: "Does SaladWorks offer catering?",
    answer: "Yes. SaladWorks offers catering options including Salad Bar, Group Trays, Group Bowls, Boxed Meals, Grazer Trays, Sides and Desserts, and Beverages. Catering serves groups of 8–10 people per tray. Contact your local SaladWorks to order."
  },
  {
    question: "Are there vegan and vegetarian options at SaladWorks?",
    answer: "Yes. SaladWorks offers several vegetarian and vegan-friendly options including the Tofu Superfood Salad ($12.49), Tofu Superfood Wrap ($11.99), and the Kids Create Your Own Salad. Many salads can be customized to be vegan on request."
  },
  {
    question: "What is the Pick 2 combo at SaladWorks?",
    answer: "The SaladWorks Pick 2 combo lets you choose any two items from a selection of half salads, melts, soups, and wraps. Pick 2 prices start at $13.49 for a Soup combo and go up to $14.99 for a Wrap or Grilled Wrap combo."
  },
  {
    question: "What are SaladWorks hours of operation?",
    answer: "Most SaladWorks locations are open Monday through Thursday 10:00 AM – 9:00 PM, Friday and Saturday 10:00 AM – 10:00 PM, and Sunday 11:00 AM – 8:00 PM. Hours vary by location – always check with your local SaladWorks."
  }
]

export function FAQAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
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
