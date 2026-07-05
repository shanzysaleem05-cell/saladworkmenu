export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
  categoryImage?: string;
}

export const menuData: MenuCategory[] = [
  {
    id: "featured",
    emoji: "⭐",
    title: "Featured",
    subtitle: "Seasonal highlights",
    categoryImage: "/hot-honey-chicken-bowl.webp",
    items: [
      { id: "f1", name: "Hot Honey Chicken Bowl", image: "/hot-honey-chicken-bowl.webp", description: "A bold and sweet Hot Honey Chicken Bowl featuring crispy chicken drizzled with hot honey sauce, served over fresh greens and grains. One of Saladworks' most popular featured items for 2026.", price: 13.99 },
      { id: "f2", name: "Sweet Chili Shrimp Bowl", image: "/sweet-chili-shrimp-bowl.webp", description: "A vibrant Sweet Chili Shrimp Bowl loaded with plump shrimp tossed in a sweet chili glaze, layered over fresh greens and nutritious grains. A must-try featured bowl at Saladworks.", price: 14.99 },
      { id: "f3", name: "Fire Grilled Steak Bowl", image: "/fire-grilled-steak-bowl.webp", description: "A hearty Fire Grilled Steak Bowl with tender, flame-grilled steak slices served over a fresh bed of greens and grains. A premium, protein-packed featured item at Saladworks.", price: 15.99 },
    ]
  },
  {
    id: "salads",
    emoji: "🥗",
    title: "Salads",
    subtitle: "Signature + custom",
    categoryImage: "/grilled-chicken-caesar.webp",
    items: [
      { id: "s1", name: "Grilled Chicken Caesar", image: "/grilled-chicken-caesar.webp", description: "A timeless Grilled Chicken Caesar Salad with tender grilled chicken breast, crisp romaine lettuce, shaved parmesan cheese, and house croutons tossed in classic Caesar dressing. A Saladworks signature.", price: 12.49 },
      { id: "s2", name: "Avocado Cobb", image: "/avocado-cobb.webp", description: "A loaded Avocado Cobb Salad piled with creamy avocado, crispy bacon, hard-boiled egg, and tangy blue cheese on a bed of fresh mixed greens. A protein-packed salad at Saladworks.", price: 13.49 },
      { id: "s3", name: "Fuji Apple Crunch", image: "/fuji-apple-crunch.webp", description: "A refreshing Fuji Apple Crunch Salad with crisp Fuji apple slices, crunchy candied walnuts, gorgonzola, and mixed greens tossed in a sweet apple vinaigrette. A unique Saladworks specialty.", price: 12.99 },
      { id: "s4", name: "sophies", image: "/sophies.webp", description: "sophies Salad is a Saladworks fan-favorite featuring a fresh combination of premium toppings on a crisp green base. A signature recipe crafted for balanced flavor and great nutrition.", price: 11.99 },
      { id: "s5", name: "Mediterranean Chicken", image: "/mediterranean-chicken.webp", description: "A vibrant Mediterranean Chicken Salad with grilled chicken, feta cheese, kalamata olives, roasted peppers, and cucumbers on fresh greens with a zesty Mediterranean dressing.", price: 12.99 },
      { id: "s6", name: "Southwest Chipotle Ranch", image: "/southwest-chipotle-ranch.webp", description: "A bold Southwest Chipotle Ranch Salad with smoky chipotle chicken, corn, black beans, and crispy tortilla strips drizzled in a creamy chipotle ranch dressing. A spicy Saladworks favorite.", price: 13.49 },
      { id: "s7", name: "Steakhouse Salad", image: "/steakhouse-salad.webp", description: "A premium Saladworks Steakhouse Salad with fire-grilled steak, sharp cheddar, crispy onions, and fresh greens in a bold steakhouse dressing. A hearty, restaurant-quality salad experience.", price: 14.99 },
      { id: "s8", name: "Buffalo Chicken", image: "/buffalo-chicken.webp", description: "A fiery Buffalo Chicken Salad with crispy buffalo-sauced chicken, blue cheese crumbles, celery, and fresh greens. The perfect Saladworks salad for those who love bold, spicy flavors.", price: 12.99 },
      { id: "s9", name: "Chipotle Chicken & Bacon", image: "/chipotle-chicken-and-bacon.webp", description: "A smoky Chipotle Chicken & Bacon Salad featuring seasoned chipotle chicken, crispy bacon, and fresh vegetables on a bed of mixed greens with a zesty chipotle dressing at Saladworks.", price: 13.49 },
      { id: "s10", name: "Bently", image: "/bently.webp", description: "The Bently Salad is a Saladworks signature creation featuring a unique blend of premium toppings and fresh ingredients, offering a gourmet salad experience in every bite.", price: 12.49 },
      { id: "s11", name: "Tofu Superfood", image: "/tofu-superfood.webp", description: "A nutritious Tofu Superfood Salad loaded with protein-rich tofu, superfood greens, seeds, and nutrient-dense toppings. A plant-based powerhouse on the Saladworks menu.", price: 12.49 },
      { id: "s12", name: "Chicken Pesto", image: "/chicken-pesto.webp", description: "A delicious Chicken Pesto Salad with grilled chicken, fresh basil pesto, roasted tomatoes, and parmesan on crisp greens. A flavorful Italian-inspired option at Saladworks.", price: 12.99 },
      { id: "s13", name: "Asian Crispy Chicken", image: "/asian-crispy-chicken.webp", description: "A crunchy Asian Crispy Chicken Salad with golden crispy chicken, edamame, mandarin oranges, wonton strips, and mixed greens tossed in a savory Asian sesame dressing at Saladworks.", price: 13.49 },
      { id: "s14", name: "Southwest Chicken Caesar", image: "/southwest-chicken-caesar.webp", description: "A fusion of classic Caesar and bold Southwest flavors - featuring grilled chicken, corn, black beans, jalapeños, and parmesan in a smoky Caesar dressing. A Saladworks crowd-pleaser.", price: 13.49 },
      { id: "s15", name: "Smoky BBQ Crispy Chicken", image: "/smoky-bbq-crispy-chicken.webp", description: "A bold Smoky BBQ Crispy Chicken Salad with golden crispy chicken drizzled in smoky BBQ sauce, topped with cheddar cheese and fresh greens. A hearty, flavor-packed Saladworks salad.", price: 13.49 },
    ]
  },
  {
    id: "wraps",
    emoji: "🥙",
    title: "Wraps",
    subtitle: "Filled fresh wraps",
    categoryImage: "/grilled-chicken-caesar-wrap.webp",
    items: [
      { id: "w1", name: "Grilled Chicken Caesar Wrap", image: "/grilled-chicken-caesar-wrap.webp", description: "A freshly made Grilled Chicken Caesar Wrap with tender grilled chicken, crisp romaine, shaved parmesan, and classic Caesar dressing wrapped in a warm flour tortilla at Saladworks.", price: 12.49 },
      { id: "w2", name: "Buffalo Bleu Wrap", image: "/buffalo-bleu-wrap.webp", description: "A fiery Buffalo Bleu Wrap with crispy buffalo chicken, tangy blue cheese crumbles, and fresh greens wrapped in a soft tortilla. A bold and satisfying Saladworks wrap option.", price: 12.99 },
      { id: "w3", name: "Black Blue Grilled Wrap", image: "/black-blue-grilled-wrap.webp", description: "A hearty Black Blue Grilled Wrap with seasoned grilled steak or chicken, bold blue cheese, and fresh vegetables in a warm flour tortilla. A premium Saladworks wrap experience.", price: 13.49 },
      { id: "w4", name: "Bently Wrap", image: "/bently-wrap.webp", description: "The signature Bently Wrap featuring a unique gourmet combination of fresh Saladworks ingredients wrapped in a soft flour tortilla. A fan-favorite wrap at Saladworks.", price: 12.49 },
      { id: "w5", name: "Turkey Jalapeno Crunch Wrap", image: "/turkey-jalapeno-crunch-wrap.webp", description: "A spicy Turkey Jalapeno Crunch Wrap with sliced turkey, pickled jalapenos, crispy crunch mix, and fresh greens in a warm tortilla. A satisfying kick for spice lovers at Saladworks.", price: 12.49 },
      { id: "w6", name: "Mediterranean Chicken Wrap", image: "/mediterranean-chicken-wrap.webp", description: "A fresh Mediterranean Chicken Wrap with grilled chicken, feta cheese, olives, roasted peppers, and greens in a soft tortilla with Mediterranean dressing. A healthy Saladworks wrap.", price: 12.99 },
      { id: "w7", name: "Tofu Superfood Wrap", image: "/tofu-superfood-wrap.webp", description: "A plant-based Tofu Superfood Wrap packed with nutritious tofu, supergreens, seeds, and fresh vegetables in a soft flour tortilla. A healthy, vegan-friendly Saladworks wrap.", price: 11.99 },
      { id: "w8", name: "Roasted Turkey Club", image: "/roasted-turkey-club.webp", description: "A classic Roasted Turkey Club Wrap with freshly roasted turkey, crispy bacon, lettuce, tomato, and creamy mayo in a warm flour tortilla. A timeless Saladworks sandwich-style wrap.", price: 12.49 },
      { id: "w9", name: "Cali Chicken Grilled Wrap", image: "/cali-chicken-grilled-wrap.webp", description: "A fresh West Coast-inspired Cali Chicken Grilled Wrap with grilled chicken, avocado, fresh tomato, and greens in a warm flour tortilla. Light, healthy, and delicious at Saladworks.", price: 12.99 },
      { id: "w10", name: "Buffalo Chicken Grilled Wrap", image: "/buffalo-chicken-grilled-wrap.webp", description: "A spicy Buffalo Chicken Grilled Wrap with tender grilled buffalo chicken, cool ranch dressing, and crisp lettuce in a warm flour tortilla. A spicy Saladworks wrap classic.", price: 12.99 },
      { id: "w11", name: "Turkey Cheddar & Bacon", image: "/turkey-cheddar-and-bacon.webp", description: "A hearty Turkey Cheddar & Bacon Wrap with roasted turkey, sharp cheddar cheese, crispy bacon, and fresh greens wrapped in a soft flour tortilla. A filling Saladworks wrap option.", price: 12.49 },
    ]
  },
  {
    id: "melts",
    emoji: "🫓",
    title: "Melts",
    subtitle: "Hot sandwiches",
    categoryImage: "/steak-cheddar-melt.webp",
    items: [
      { id: "m1", name: "Steak Cheddar Melt", image: "/steak-cheddar-melt.webp", description: "A premium Steak Cheddar Melt sandwich with tender grilled steak strips and rich melted sharp cheddar cheese on warm toasted bread. A hearty, satisfying hot melt at Saladworks.", price: 13.99 },
      { id: "m2", name: "Grilled Cheese", image: "/grilled-cheese.webp", description: "A golden, buttery Grilled Cheese Melt with perfectly melted cheese between two slices of crispy toasted bread. A comforting classic on the Saladworks melt menu.", price: 9.99 },
    ]
  },
  {
    id: "soups",
    emoji: "🍲",
    title: "Soups",
    subtitle: "Warm + hearty",
    categoryImage: "/broccoli-cheddar-soup.webp",
    items: [
      { id: "sp1", name: "Broccoli Cheddar Soup", image: "/broccoli-cheddar-soup.webp", description: "A thick and creamy Broccoli Cheddar Soup loaded with tender broccoli florets and rich sharp cheddar cheese. A hearty, comforting soup available in cup or bowl at Saladworks.", price: 4.99 },
      { id: "sp2", name: "Chicken Noodle Soup", image: "/chicken-noodle-soup.webp", description: "A soul-warming classic Chicken Noodle Soup made with tender chicken, egg noodles, and fresh vegetables in a savory broth. Available in cup or bowl - perfect with any Saladworks meal.", price: 4.49 },
      { id: "sp3", name: "Soup of the Day", image: "/soup-of-the-day.webp", description: "Ask about Saladworks' rotating Soup of the Day - a freshly made seasonal soup crafted daily from the finest ingredients. A delicious surprise available in cup or bowl size.", price: 4.99 },
    ]
  },
  {
    id: "kids-works",
    emoji: "👶",
    title: "Kids Works",
    subtitle: "For little ones",
    categoryImage: "/kids-bento-box.webp",
    items: [
      { id: "k1", name: "Kids Bento Box", image: "/kids-bento-box.webp", description: "A fun and nutritious Kids Bento Box featuring a variety of fresh, kid-friendly foods in individual compartments. The perfect balanced meal for younger Saladworks guests.", price: 7.99 },
      { id: "k2", name: "Kids Create Your Own Salad", image: "/kids-create-your-own-salad.webp", description: "Let the little ones build their own salad! Kids can choose their favorite toppings and dressings to create a personalized, healthy meal at Saladworks. Great for developing healthy habits.", price: 6.99 },
      { id: "k3", name: "Kids Grilled Cheese", image: "/kids-grilled-cheese.webp", description: "A golden, crispy kids' grilled cheese with perfectly melted cheese on warm toasted bread. A beloved kids' classic at Saladworks that even the pickiest little eaters will love.", price: 6.49 },
      { id: "k4", name: "Kids Grilled Chicken Quesadilla", image: "/kids-grilled-chicken-quesadilla.webp", description: "A warm and cheesy Kids Grilled Chicken Quesadilla with tender grilled chicken and melted cheese in a crispy flour tortilla. A kid-friendly favorite on the Saladworks kids menu.", price: 7.49 },
    ]
  },
  {
    id: "sides-desserts",
    emoji: "🍪",
    title: "Sides & Desserts",
    subtitle: "Snacks + sweets",
    categoryImage: "/chocolate-chip-cookie.webp",
    items: [
      { id: "sd1", name: "Chocolate Chip Cookie", image: "/chocolate-chip-cookie.webp", description: "A freshly baked Chocolate Chip Cookie with rich melted chocolate chips and a soft, chewy center. The perfect sweet treat to finish your Saladworks meal on a delicious note.", price: 2.49 },
      { id: "sd2", name: "Chocolate Fudge Brownie", image: "/chocolate-fudge-brownie.webp", description: "A decadent Chocolate Fudge Brownie with a dense, rich chocolate interior and a crackly top. A premium dessert option for chocolate lovers at Saladworks.", price: 2.99 },
      { id: "sd3", name: "Crispy Rice Marshmallow Treat", image: "/crispy-rice-marshmallow-treat.webp", description: "A classic Crispy Rice Marshmallow Treat - sweet, chewy, and perfectly crunchy. A nostalgic, crowd-pleasing dessert option available at Saladworks.", price: 2.49 },
      { id: "sd4", name: "Chips", image: "/chips.webp", description: "Crunchy, salty chips - the perfect light snack side to pair with any Saladworks wrap, melt, or salad. A simple, satisfying addition to your meal.", price: 1.99 },
      { id: "sd5", name: "Extra Roll", image: "/extra-roll.webp", description: "A warm, freshly baked dinner roll - soft inside with a golden crust. The perfect addition to any Saladworks soup or salad for a complete and satisfying meal.", price: 1.49 },
      { id: "sd6", name: "16oz Dressing", image: "/16oz-dressing.webp", description: "Take your favorite Saladworks salad dressing home! Available in a 16oz bottle, choose from our signature dressing flavors to enjoy fresh salads at home anytime.", price: 7.99 },
    ]
  },
  {
    id: "beverages",
    emoji: "🥤",
    title: "Beverages",
    subtitle: "Drinks & more",
    categoryImage: "/tractor-fountain-drink.webp",
    items: [
      { id: "b1", name: "Tractor Fountain Drink", image: "/tractor-fountain-drink.webp", description: "A refreshing Tractor Organic fountain drink made with real, certified organic ingredients. Available in various flavors for a clean and delicious beverage at Saladworks.", price: 3.49 },
      { id: "b2", name: "Tractor Gallon Pouch", image: "/tractor-gallon-pouch.webp", description: "A large Tractor Organic gallon pouch perfect for catering or group orders. Made with real organic ingredients and available in delicious flavors at Saladworks.", price: 14.99 },
      { id: "b3", name: "Bottled Water", image: "/bottled-water.webp", description: "Stay hydrated with a refreshing chilled bottled water. The clean, zero-calorie beverage option for health-conscious Saladworks guests.", price: 2.49 },
      { id: "b4", name: "Coke (Bottle)", image: "/coke-(bottle).webp", description: "An ice-cold bottled Coca-Cola - the classic American beverage pairing for any Saladworks meal. Crisp, refreshing, and always satisfying.", price: 2.99 },
      { id: "b5", name: "Diet Coke (Bottle)", image: "/diet-coke-(bottle).webp", description: "A refreshing bottled Diet Coke - a zero-calorie classic cola option for those watching their intake. A perfect beverage companion to your Saladworks order.", price: 2.99 },
      { id: "b6", name: "Sprite (Bottle)", image: "/sprite-(bottle).webp", description: "A crisp and bubbly bottled Sprite - the clean, lemon-lime soda option available at Saladworks. A refreshing and light beverage choice for any meal.", price: 2.99 },
    ]
  },
  {
    id: "pick-2",
    emoji: "✏️",
    title: "Pick 2",
    subtitle: "Your choice of any two items - Menu items may vary by location",
    categoryImage: "/grilled-chicken-caesar.webp",
    items: [
      { id: "p1", name: "Half Create Your Own", image: "/kids-create-your-own-salad.webp", description: "Build your own custom half salad at Saladworks as part of the Pick 2 combo. Choose your base greens and favorite toppings for a personalized, fresh, and healthy half-sized salad. 80–915 cal.", price: 13.99 },
      { id: "p2", name: "Half Premium Salad", image: "/avocado-cobb.webp", description: "Enjoy a half-portion of any Saladworks Premium Salad as part of the Pick 2 combo. Choose from SaladWorks' selection of elevated premium salad recipes crafted with top-quality fresh ingredients. 180–350 cal.", price: 14.49 },
      { id: "p3", name: "Half Signature Salad", image: "/grilled-chicken-caesar.webp", description: "Get a half-size of any Saladworks Signature Salad as part of your Pick 2 combo meal. SaladWorks signature salads are crafted with perfectly balanced flavors and fresh ingredients. 150–350 cal.", price: 13.99 },
      { id: "p4", name: "Half Melt", image: "/steak-cheddar-melt.webp", description: "Pair a half-portion of any hot, toasty Saladworks Melt sandwich as part of your Pick 2 combo. Choose from SaladWorks' selection of signature melts for a warm and satisfying addition. 330–510 cal.", price: 14.49 },
      { id: "p5", name: "Soup", image: "/broccoli-cheddar-soup.webp", description: "Add any freshly made Saladworks soup to your Pick 2 combo. Choose from rotating seasonal soups including Broccoli Cheddar, Chicken Noodle, Tomato Basil, and more. 80–580 cal.", price: 13.49 },
      { id: "p6", name: "Wrap or Grilled Wrap", image: "/grilled-chicken-caesar-wrap.webp", description: "Choose any full Saladworks Wrap or Grilled Wrap as part of the Pick 2 combo. Packed with fresh ingredients and bold flavors, wraps are a satisfying and popular Pick 2 choice. 560–920 cal.", price: 14.99 },
    ]
  }
];
