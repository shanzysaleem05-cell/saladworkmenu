"use client"

import { SectionHeading } from "@/components/SectionHeading"
import { CateringCard } from "@/components/CateringCard"
import { cateringPackages } from "@/data/cateringPackages"
import { Button } from "@/components/Button"
import { ClipboardList, CalendarDays, Truck, ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CateringClient() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Catering", href: "/catering" }
      ]} />

      {/* Hero Section */}
      <section className="w-full pt-6 pb-24 bg-site-bg flex flex-col items-center justify-center text-center px-4 border-b border-gray-200">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[32px] md:text-[44px] font-extrabold text-site-black mb-6 tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Salad Works Catering Prices
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-6 max-w-[800px] leading-relaxed"
        >
          Complete guide to saladworks Catering prices, calories, and nutrition facts. Updated: June 2026
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-600 mb-10 max-w-[800px] leading-relaxed"
        >
          Nothing brings a group of people together quite like food – especially when it’s fresh, delicious and prepared just for you. SaladWorks offers a huge selection of salads, wraps, desserts and sides to mix and match so you can put out the perfect spread for any occasion and every taste. The catering menu includes some of the following.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <span className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 bg-site-white shadow-sm">Groups of 10 to 50+</span>
          <span className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 bg-site-white shadow-sm">Customizable Menus</span>
          <span className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 bg-site-white shadow-sm">Fresh Ingredients</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          <Button size="lg" className="rounded-none px-8 h-14 text-base font-bold shadow-md flex items-center gap-2" asChild>
            <a href="https://catering.saladworks.com" target="_blank" rel="noopener noreferrer">
              <ClipboardList className="h-5 w-5" />
              Order Catering
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-none border border-gray-300 bg-site-white text-site-black hover:bg-gray-50 hover:text-site-black px-8 h-14 text-base font-bold shadow-sm flex items-center gap-2" asChild>
            <a href="#packages">
              View Bundles
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </section>

      {/* Catering Menu Navigation */}
      <section className="bg-white pt-16 pb-4 scroll-mt-24" id="catering-menu">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-[42px] font-extrabold text-brand-orange text-center mb-8 lowercase tracking-tight">
            catering menu
          </h2>
          <div className="bg-[#e6eed4] w-full flex flex-wrap justify-center sm:justify-between items-center px-6 py-4 gap-4 md:gap-2">
            {[
              { id: 'salad-bar', label: 'salad bar' }, 
              { id: 'sandwich-trays', label: 'sandwich trays' }, 
              { id: 'group-salads', label: 'group salads' }, 
              { id: 'grazer-boards', label: 'grazer boards' }, 
              { id: 'boxed-lunches', label: 'boxed lunches' }, 
              { id: 'packages', label: 'catering bundles' }
            ].map((tab, idx) => (
              <a key={idx} href={`#${tab.id}`} className="text-site-black font-bold text-[15px] lowercase hover:text-brand-orange transition-colors">
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Salad Bar Section */}
      <section id="salad-bar" className="py-12 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-[28px] font-extrabold text-[#8dc63f] mb-6 lowercase tracking-tight">salad bar</h3>
          <p className="text-gray-600 mb-10 text-[15px] leading-relaxed max-w-5xl">
            Offer your guests a fresh, healthy experience with a SaladWorks salad bar, complete with customizable toppings, gluten free selections, and a variety of fresh, flavorful ingredients for any occasion.
          </p>
          
          <h4 className="text-xl font-bold text-site-black mb-3 lowercase tracking-tight">select your customized salad bar base</h4>
          <p className="text-gray-600 mb-10 text-[15px] leading-relaxed max-w-5xl">
            Choose 1 to 2 fresh salad bases, including <span className="font-bold text-site-black">spring mix, super greens blend, super grains blend, or romaine/iceberg blend</span>, to create the perfect foundation for your meal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <div>
              <h4 className="text-xl font-bold text-site-black lowercase mb-1 tracking-tight">popular proteins</h4>
              <p className="text-gray-400 text-sm lowercase mb-5">select up to 2</p>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 text-[15px] marker:text-gray-400">
                <li>Grilled Chicken <span className="text-brand-orange font-medium">(Fav)</span></li>
                <li>Crispy Chicken</li>
                <li>Roasted Turkey</li>
                <li>Sliced Egg</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-site-black lowercase mb-1 tracking-tight">popular cheeses</h4>
              <p className="text-gray-400 text-sm lowercase mb-5">select up to 2</p>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 text-[15px] marker:text-gray-400">
                <li>Cheddar Cheese <span className="text-brand-orange font-medium">(Fav)</span></li>
                <li>Feta Cheese</li>
                <li>Parmesan</li>
                <li>Provolone</li>
              </ul>
            </div>
          </div>

          <div className="mb-14">
             <h4 className="text-xl font-bold text-site-black lowercase mb-3 tracking-tight">salad bar toppings</h4>
             <p className="text-gray-600 text-[15px] leading-relaxed max-w-5xl">
               Select from an array of yummy fruits, vegetables, housemade croutons, honey roasted pecans and more.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-site-bg border border-gray-100 rounded-xl overflow-hidden flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
              <div className="relative h-64 w-full">
                <Image src="/catering-images/salad-bar.webp" alt="Harvest Salad Bar" fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-site-black mb-3">Harvest Salad Bar</h3>
                <p className="text-gray-600 flex-grow mb-4">Everything you need to build your own salad, including your choices of 2 bases, 2 proteins, 4 vegetables, 2 cheeses, 2 toppings and 2 dressings. Served with honey oat rolls.</p>
                <div className="bg-white border border-gray-200 py-1.5 px-3 rounded-md inline-block self-start font-medium text-xs text-site-black">
                  Serving size: <span className="font-bold text-brand-orange">8-10</span>
                </div>
              </div>
            </div>
            <div className="bg-site-bg border border-gray-100 rounded-xl overflow-hidden flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
              <div className="relative h-64 w-full">
                <Image src="/catering-images/harvest-salad-bar-gluten-free.webp" alt="Gluten Free Harvest Salad Bar" fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-site-black mb-3">Gluten Free Harvest Salad Bar</h3>
                <p className="text-gray-600 flex-grow mb-4">Everything you need to build your own salad, including your choices of 2 bases, 2 proteins, 4 vegetables, 2 cheeses, 2 toppings and 2 dressings.</p>
                <div className="bg-white border border-gray-200 py-1.5 px-3 rounded-md inline-block self-start font-medium text-xs text-site-black">
                  Serving size: <span className="font-bold text-brand-orange">8-10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sandwich Trays Section */}
      <section id="sandwich-trays" className="py-24 bg-site-bg border-t border-gray-200 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Sandwich Trays (Wrap & Melt Trays)" centered subtitle="Assorted sandwich trays are loaded with fresh and delicious flavors. These are perfect for corporate catering lunches, family gatherings and any occasion." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Small Assorted Wrap Tray",
                desc: "Your choice of 5 wraps, cut into halves and served with your choice of dressing. Consider adding sides and desserts to this tray for full enjoyment by all.",
                serving: "5-7",
                image: "/catering-images/small-assorted-wrap-tray.webp"
              },
              {
                title: "Large Assorted Wrap Tray",
                desc: "Your choice of 10 wraps, cut into halves and served with your choice of dressing. Consider adding sides and desserts to this tray for full enjoyment by all.",
                serving: "10",
                image: "/catering-images/small-assorted-wrap-tray.webp"
              },
              {
                title: "Assorted Sandwich Tray",
                desc: "Your choice of 5 sandwiches cut into halves. Consider adding sides and desserts to this tray for a customized SaladWorks experience.",
                serving: "5-7",
                image: "/catering-images/assorted-sandwich-tray.webp"
              },
              {
                title: "Small Assorted Warm Melt Tray",
                desc: "Your choice of 5 warm melts cut into halves. Consider adding sides and desserts to this tray for a customized SaladWorks experience.",
                serving: "5-7",
                image: "/catering-images/small-assorted-warm-melt-tray.webp"
              },
              {
                title: "Large Assorted Warm Melt Tray",
                desc: "Your choice of 10 warm melts cut into halves. Consider adding sides and desserts to this tray for a customized SaladWorks experience.",
                serving: "10",
                image: "/catering-images/small-assorted-warm-melt-tray.webp"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
                <div className="relative h-48 w-full bg-gray-50">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow text-[15px]">{item.desc}</p>
                  <div className="bg-site-bg border border-gray-200 py-1.5 px-3 rounded-md inline-block self-start font-medium text-xs text-site-black">
                    Serving size: <span className="font-bold text-brand-orange">{item.serving}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Salads */}
      <section id="group-salads" className="py-24 bg-white border-t border-gray-200 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Group Salads" centered subtitle="Deliciously fresh and made to share, SaladWorks group salads bring flavor and variety to any gathering. Perfect for every event, big or small." />
          
          <h3 className="text-2xl font-bold text-site-black text-center mt-12 mb-8">Popular Signature Salads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Group Tofu Superfood",
                desc: "SaladWorks Blend with Tofu, Quinoa, Goat Cheese, Pickled Onions, Roasted Butternut Squash, Roasted Brussel Sprouts, and Fuji Apple Cider Vinaigrette.",
                image: "/catering-images/group-tofu-superfood.webp"
              },
              {
                title: "Group Asian Crispy",
                desc: "Your choice of base (Romaine/Iceberg Blend recommended) with sweet chili crispy chicken, Mandarin oranges, sliced cucumbers, carrots, edamame, crispy wonton strips, and your choice of dressing.",
                image: "/catering-images/group-asian-crispy.webp"
              },
              {
                title: "Group Buffalo Bleu",
                desc: "Your choice of base (Romaine/Iceberg Blend recommended) with grilled buffalo chicken, diced tomatoes, sliced banana peppers, bleu cheese, tri-color tortilla strips, and your choice of dressing.",
                image: "/catering-images/group-buffalo-bleu.webp"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-site-bg rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
                <div className="relative h-48 w-full bg-white">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold text-brand-orange mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-site-black text-center mb-8">Popular Premium Salads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Group Fuji Apple Crunch",
                desc: "SaladWorks Blend with Quinoa, Grilled Chicken, Pickled Onions, Dried Cranberries, Goat Cheese, Apple Chips, with your choice of dressing. Serves up to 10.",
                image: "/catering-images/group-fuji-apple-crunch.webp"
              },
              {
                title: "Group Southwest Chicken Caesar",
                desc: "Romaine/Iceberg Blend with Grilled Chicken, Parmesan Cheese, Pepitas, Tortilla Strips, with your choice of dressing. Serves up to 10.",
                image: "/catering-images/group-southwest-chicken-caesar.webp"
              },
              {
                title: "Group Bently",
                desc: "Your choice of base (Romaine/Iceberg Blend recommended) with smoked ham, roasted turkey, provolone cheese, sliced egg, diced tomatoes, and your choice of dressing.",
                image: "/catering-images/group-bently.webp"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-site-bg rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
                <div className="relative h-48 w-full bg-white">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold text-brand-orange mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grazer Boards */}
      <section id="grazer-boards" className="py-24 bg-site-bg border-t border-gray-200 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Grazer Boards" centered subtitle="SaladWorks charcuterie boards are a beautifully arranged selection of premium ingredients perfect for any occasion. These snack platters are ready to serve and elegantly presented." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Meat & Cheese Grazing Board",
                desc: "Includes an assortment of pepperoni, turkey, provolone, pepper jack, cheddar, grapes, strawberries, apples, crackers, and rolls. Served with your choice of 2 dressings.",
                image: "/catering-images/meat-cheese-grazing-board.webp"
              },
              {
                title: "Fruit & Cheese Grazing Board",
                desc: "Includes an assortment of provolone, pepper jack, cheddar, grapes, strawberries, apples, crackers, and rolls.",
                image: "/catering-images/fruit-cheese-grazing-board.webp"
              },
              {
                title: "Vegetable Grazing Board",
                desc: "Includes an assortment of baby carrots, broccoli, cucumbers, roasted Brussels sprouts, cauliflower, and grape tomatoes. Served with your choice of 2 dressings.",
                image: "/catering-images/vegetable-grazing-board.webp"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
                <div className="relative h-56 w-full bg-gray-50">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boxed Lunches */}
      <section id="boxed-lunches" className="py-24 bg-white border-t border-gray-200 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Boxed Lunches" centered subtitle="Individually packaged boxed lunches are the perfect option for grab and go meetings or lunch and learns. With a variety of crave-worthy options they will be a hit at any corporate meeting or event." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Salad or Grain Bowl Boxed Lunch",
                desc: "Each box includes your choice of salad, dressing, and dessert. Served with a honey oat roll.",
                image: "/catering-images/salad-boxed-lunch.webp"
              },
              {
                title: "Salad or Grain Bowl Boxed Lunch (GF)",
                desc: "Each box includes your choice of salad, dressing, and dessert.",
                image: "/catering-images/salad-boxed-lunch-gf.webp"
              },
              {
                title: "Sandwich or Panini Melt Boxed Lunch",
                desc: "Each box comes with your choice of wrap, dressing and dessert. Served with chips and a pickle.",
                image: "/catering-images/wrap-boxed-lunch.webp"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-site-bg rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
                <div className="relative h-56 w-full bg-white">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Bundles */}
      <section id="packages" className="py-24 bg-site-bg border-t border-gray-200 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading 
            title="Catering Bundles – Effortless Group Ordering" 
            subtitle="Effortless catering bundles! These freshly prepared bundles come with your main entree, chips and drinks. Perfect for feeding a crowd!"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
            {cateringPackages.map((pkg) => (
              <CateringCard 
                key={pkg.id}
                name={pkg.name}
                capacity={pkg.capacity}
                price={pkg.price}
                features={pkg.features}
                highlighted={pkg.highlighted}
                buttonText={pkg.buttonText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sides, Desserts & Beverages */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center bg-site-bg rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
              <div className="relative h-64 w-full bg-white">
                <Image src="/catering-images/sides-desserts-serving.webp" alt="Sides and Desserts" fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-orange mb-3">Sides & Desserts</h3>
                <p className="text-gray-600 flex-grow mb-4">Cookie trays and more. Be sure to include a great side or sweet dessert.</p>
                <div className="bg-white border border-gray-200 py-1.5 px-3 rounded-md inline-block font-medium text-xs text-site-black self-center">
                  Serving size: <span className="font-bold text-brand-orange">8-10</span>
                </div>
              </div>
            </div>
            <div className="text-center bg-site-bg rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all">
              <div className="relative h-64 w-full bg-white">
                <Image src="/catering-images/beverages.webp" alt="Beverages" fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-orange mb-3">Beverages</h3>
                <p className="text-gray-600 flex-grow mb-4">No meal is complete without a beverage! Fresh Organic Tractor beverages available.</p>
                <div className="bg-white border border-gray-200 py-1.5 px-3 rounded-md inline-block font-medium text-xs text-site-black self-center">
                  Serving size: <span className="font-bold text-brand-orange">Any Size</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading title="Catering FAQs" centered />
          
          <div className="mt-12 space-y-4">
            {[
              {
                q: "What is included in SaladWorks catering?",
                a: "Delivery includes setup, plates, silverware, napkins and cups if applicable."
              },
              {
                q: "Does SaladWorks deliver?",
                a: "SaladWorks does deliver. Delivery radius, minimum amount to be delivered and delivery fees will vary by location. Please reach out to the location directly for any specific questions regarding delivery fees and requirements."
              },
              {
                q: "Can I order SaladWorks catering online?",
                a: "Orders can be placed online at www.catering.saladworks.com."
              },
              {
                q: "How far in advance do I need to place a catering order?",
                a: "You can order online at www.catering.saladworks.com up to three hours before needing your order. Please call the location directly with any questions and requests."
              },
              {
                q: "Are there vegetarian or gluten-free options available?",
                a: "SaladWorks offers vegetarian and gluten-free options. Use the interactive Allergen & Nutritional Menus at https://saladworks.widget.eagle.bigzpoon.com/home to find the best choices."
              },
              {
                q: "Can I customize my catering order?",
                a: "Please add any customization requests in the notes when placing your orders. You can also contact the location directly with any questions or concerns."
              }
            ].map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg bg-site-bg open:bg-white transition-colors">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-site-black">
                  <h3 className="m-0 text-base">{faq.q}</h3>
                  <span className="ml-4 flex-shrink-0 text-brand-orange group-open:-rotate-180 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
