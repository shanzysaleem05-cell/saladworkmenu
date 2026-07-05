export interface CateringFaq {
  question: string;
  answer: string;
}

// Single source of truth for the catering page FAQ — used both for the
// visible accordion (app/catering/CateringClient.tsx) and the FAQPage
// JSON-LD (app/catering/page.tsx). Previously these were two independent,
// completely different Q&A sets, which is exactly what Google's
// structured-data guidelines warn against.
export const cateringFaqs: CateringFaq[] = [
  {
    question: "What is included in SaladWorks catering?",
    answer: "Delivery includes setup, plates, silverware, napkins and cups if applicable."
  },
  {
    question: "Does SaladWorks deliver?",
    answer: "SaladWorks does deliver. Delivery radius, minimum amount to be delivered and delivery fees will vary by location. Please reach out to the location directly for any specific questions regarding delivery fees and requirements."
  },
  {
    question: "Can I order SaladWorks catering online?",
    answer: "Orders can be placed online at www.catering.saladworks.com."
  },
  {
    question: "How far in advance do I need to place a catering order?",
    answer: "You can order online at www.catering.saladworks.com up to three hours before needing your order. Please call the location directly with any questions and requests."
  },
  {
    question: "Are there vegetarian or gluten-free options available?",
    answer: "SaladWorks offers vegetarian and gluten-free options. Use the interactive Allergen & Nutritional Menus at https://saladworks.widget.eagle.bigzpoon.com/home to find the best choices."
  },
  {
    question: "Can I customize my catering order?",
    answer: "Please add any customization requests in the notes when placing your orders. You can also contact the location directly with any questions or concerns."
  }
];
