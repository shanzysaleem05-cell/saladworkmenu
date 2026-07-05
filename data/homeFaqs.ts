export interface HomeFaq {
  question: string;
  answer: string;
}

// Single source of truth for the homepage FAQ — used both for the visible
// accordion (components/FAQAccordion.tsx) and the FAQPage JSON-LD (app/page.tsx).
// Keeping these in one place stops the schema and the on-page text from
// drifting apart, which Google's structured-data guidelines flag.
export const homeFaqs: HomeFaq[] = [
  {
    question: "How much does a salad cost at SaladWorks?",
    answer: "SaladWorks salad prices range from $11.99 for Sophie's Salad to $14.99 for the Steakhouse Salad. Signature salads average $12.49–$13.49. Prices may vary by location."
  },
  {
    question: "Does SaladWorks have a kids menu?",
    answer: "Yes. The SaladWorks Kids Works menu includes Kids Bento Box ($7.99), Kids Create Your Own Salad ($6.99), Kids Grilled Cheese ($6.49), and Kids Grilled Chicken Quesadilla ($7.49). All kids meals are under $8."
  },
  {
    question: "Does SaladWorks offer catering?",
    answer: "Yes. SaladWorks offers catering including Salad Bar, Group Trays, Group Bowls, Boxed Meals, Grazer Trays, Sides and Desserts, and Beverages. Catering serves groups of 8–10 people per tray. Contact your local SaladWorks to order."
  },
  {
    question: "Are there vegan and vegetarian options at SaladWorks?",
    answer: "Yes. SaladWorks offers vegan-friendly options including the Tofu Superfood Salad ($12.49), Tofu Superfood Wrap ($11.99), and many salads customizable to vegan on request."
  },
  {
    question: "What is the Pick 2 combo at SaladWorks?",
    answer: "The SaladWorks Pick 2 combo lets you choose any two items from half salads, melts, soups, and wraps. Prices start at $13.49 and go up to $14.99."
  },
  {
    question: "What are SaladWorks hours of operation?",
    answer: "Most SaladWorks locations are open Monday–Thursday 10AM–9PM, Friday–Saturday 10AM–10PM, Sunday 11AM–8PM. Hours vary by location."
  }
];
