import fs from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StateInfo {
  code: string
  slug: string
  name: string
  locationCount: number
  cities: string[]
}

export interface StateMenuItem {
  chainProductId: number
  name: string
  description: string
  slug: string
  price: number // average price
  minPrice?: number
  maxPrice?: number
  calories: number
  calorieLabel: string
  image?: string
  sizes: { name: string; price: number; calories: number }[]
}

export interface StateMenuCategory {
  name: string
  slug: string
  items: StateMenuItem[]
}

export interface LocationHours {
  monday: { open: string; close: string } | { closed: true }
  tuesday: { open: string; close: string } | { closed: true }
  wednesday: { open: string; close: string } | { closed: true }
  thursday: { open: string; close: string } | { closed: true }
  friday: { open: string; close: string } | { closed: true }
  saturday: { open: string; close: string } | { closed: true }
  sunday: { open: string; close: string } | { closed: true }
}

export interface StateLocation {
  id: string
  name: string
  city: string
  address: string
  phone: string
  postalCode: string
  hours: LocationHours
  latitude?: number
  longitude?: number
}

export interface CityItemPrice {
  city: string
  price: number
  locationCount: number
}

export interface StateItemStats {
  code: string
  slug: string
  name: string
  locationCount: number
  avgPrice: number
  minPrice: number
  maxPrice: number
}

// ---------------------------------------------------------------------------
// State mapping
// ---------------------------------------------------------------------------

const STATE_MAP: Record<string, { slug: string; name: string }> = {
  'CA': { slug: 'california', name: 'California' },
  'CT': { slug: 'connecticut', name: 'Connecticut' },
  'DC': { slug: 'washington-dc', name: 'Washington D.C.' },
  'DE': { slug: 'delaware', name: 'Delaware' },
  'FL': { slug: 'florida', name: 'Florida' },
  'IN': { slug: 'indiana', name: 'Indiana' },
  'KS': { slug: 'kansas', name: 'Kansas' },
  'MD': { slug: 'maryland', name: 'Maryland' },
  'MN': { slug: 'minnesota', name: 'Minnesota' },
  'NC': { slug: 'north-carolina', name: 'North Carolina' },
  'NJ': { slug: 'new-jersey', name: 'New Jersey' },
  'NY': { slug: 'new-york', name: 'New York' },
  'PA': { slug: 'pennsylvania', name: 'Pennsylvania' },
  'TN': { slug: 'tennessee', name: 'Tennessee' },
  'TX': { slug: 'texas', name: 'Texas' },
  'VA': { slug: 'virginia', name: 'Virginia' },
}

const SLUG_TO_STATE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_MAP).map(([code, { slug }]) => [slug, code])
)

/**
 * Geographic neighbors, restricted to states present in STATE_MAP.
 * Used for deterministic cross-state linking (never random — random links
 * change every build and hurt crawl consistency).
 */
const NEIGHBOR_MAP: Record<string, string[]> = {
  'CA': [],
  'CT': ['NY'],
  'DC': ['MD', 'VA'],
  'DE': ['MD', 'NJ', 'PA'],
  'FL': [],
  'IN': [],
  'KS': [],
  'MD': ['DC', 'DE', 'PA', 'VA'],
  'MN': [],
  'NC': ['TN', 'VA'],
  'NJ': ['DE', 'NY', 'PA'],
  'NY': ['CT', 'NJ', 'PA'],
  'PA': ['DE', 'MD', 'NJ', 'NY'],
  'TN': ['NC', 'VA'],
  'TX': [],
  'VA': ['DC', 'MD', 'NC', 'TN'],
}

// ---------------------------------------------------------------------------
// Image mapping (OLO data has no images)
// ---------------------------------------------------------------------------

const IMAGE_MAP: Record<string, string> = {
  // --- Items without a real-menu-name upload (kept from the original map) ---
  'Grilled Chicken Caesar Salad': '/grilled-chicken-caesar.webp',
  'Avocado Cobb Salad': '/avocado-cobb.webp',
  'Fuji Apple Crunch Salad': '/fuji-apple-crunch.webp',
  "Sophie's Salad": '/sophies.webp',
  'Mediterranean Chicken Salad': '/mediterranean-chicken.webp',
  'NEW Mediterranean Chicken Salad': '/mediterranean-chicken.webp',
  'Southwest Chipotle Ranch Salad': '/southwest-chipotle-ranch.webp',
  'Buffalo Bleu Salad': '/buffalo-chicken.webp',
  'Bently Salad': '/bently.webp',
  'Tofu Superfood Salad': '/tofu-superfood.webp',
  'Asian Crispy Chicken Salad': '/asian-crispy-chicken.webp',
  'Southwest Chicken Caesar Salad': '/southwest-chicken-caesar.webp',
  'Smoky BBQ Chicken Salad': '/smoky-bbq-crispy-chicken.webp',
  'Roasted Turkey Club Salad': '/roasted-turkey-club.webp',
  'NEW Steak & Cheddar Melt': '/steak-cheddar-melt.webp',
  'Black & Blue Grilled Wrap': '/black-blue-grilled-wrap.webp',
  'Turkey Jalapeno Crunch Grilled Wrap': '/turkey-jalapeno-crunch-wrap.webp',

  // --- Mapped directly from real OLO item names (July 2026 image batch) ---
  '16oz Dressing': '/16oz-dressing.webp',
  'Apple Chips': '/Apple-Chips.webp',
  'Baked Potato Soup': '/Baked-Potato-Soup.webp',
  "Beachin' Bowl": '/Beachin-Bowl.webp',
  "Bee's Knees": '/Bees-Knees.webp',
  'Bermuda Bowl': '/Bermuda-Bowl.webp',
  'Bottled Coke®': '/Bottled-Coke.webp',
  'Bottled Coke® Zero': '/Bottled-Coke-Zero.webp',
  'Bottled Diet Coke®': '/Bottled-Diet-Coke.webp',
  'Bottled Gold Peak® Green Tea': '/Bottled-Gold-Peak-Green-Tea.webp',
  'Bottled Gold Peak® Lemon Tea': '/Bottled-Gold-Peak-Lemon-Tea.webp',
  'Bottled Gold Peak® Peach Tea': '/Bottled-Gold-Peak-Peach-Tea.webp',
  'Bottled Gold Peak® Raspberry Tea': '/Bottled-Gold-Peak-Raspberry-Tea.webp',
  'Bottled Gold Peak® Sweet Tea': '/Bottled-Gold-Peak-Sweet-Tea.webp',
  'Bottled Green Tea': '/Bottled-Green-Tea.webp',
  'Bottled Lemon Tea': '/Bottled-Lemon-Tea.webp',
  'Bottled Sprite®': '/Bottled-Sprite.webp',
  'Bottled Unsweetened Tea': '/Bottled-Unsweetened-Tea.webp',
  'Bottled Water': '/bottled-water.webp',
  'Bravocado': '/Bravocado.webp',
  'Broccoli Cheddar Soup': '/broccoli-cheddar-soup.webp',
  'Buffalo Chicken': '/buffalo-chicken.webp',
  'Buffalo Chicken Grilled Wrap': '/buffalo-chicken-grilled-wrap.webp',
  'Build Your Own Bowl': '/Build-Your-Own-Bowl.webp',
  'Butterfly Flower Refresher': '/Butterfly-Flower-Refresher.webp',
  'Cali Chicken Grilled Wrap': '/cali-chicken-grilled-wrap.webp',
  'Chicken Noodle Soup': '/chicken-noodle-soup.webp',
  'Chicken Pesto': '/chicken-pesto.webp',
  'Chicken Poblano Soup': '/Chicken-Poblano-Soup.webp',
  'Chicken Tortilla Soup': '/Chicken-Tortilla-Soup.webp',
  'Chipotle Chicken and Bacon': '/chipotle-chicken-and-bacon.webp',
  'Chocolate Chip Cookie': '/chocolate-chip-cookie.webp',
  'Chocolate Explosion Smoothie': '/Chocolate-Explosion-Smoothie.webp',
  'Chocolate Fudge Brownie': '/chocolate-fudge-brownie.webp',
  'Chocolate Whey Protein Bites': '/Chocolate-Whey-Protein-Bites.webp',
  'Chocolate Whey Protein Bites with Coconut Flakes': '/Chocolate-Whey-Protein-Bites-with-Coconut-Flakes.webp',
  'Classic Bowl': '/Classic-Bowl.webp',
  'Cold Brew': '/Cold-Brew.webp',
  'Creamy Tomato Soup': '/Creamy-Tomato-Soup.webp',
  'Crispy Rice Marshmallow Treat': '/crispy-rice-marshmallow-treat.webp',
  'Detox Smoothie': '/Detox-Smoothie.webp',
  'Everything Avo': '/Everything-Avo.webp',
  'Extra Roll': '/extra-roll.webp',
  'Fire-Grilled Steak Bowl': '/fire-grilled-steak-bowl.webp',
  'Fountain Beverage': '/Fountain-Beverage.webp',
  'Frutella Bowl': '/Frutella-Bowl.webp',
  'Frutta Bowl': '/Frutta-Bowl.webp',
  'Glow Up Smoothie': '/Glow-Up-Smoothie.webp',
  'Green Machine Smoothie': '/Green-Machine-Smoothie.webp',
  'Grilled Cheese': '/grilled-cheese.webp',
  'Hot Honey Chicken Bowl': '/hot-honey-chicken-bowl.webp',
  'Hulk Bowl': '/Hulk-Bowl.webp',
  'Italian Wedding Soup': '/Italian-Wedding-Soup.webp',
  'Kids Bento Box': '/kids-bento-box.webp',
  'Kids Create Your Own Salad': '/kids-create-your-own-salad.webp',
  'Kids Grilled Cheese': '/kids-grilled-cheese.webp',
  'Kids Grilled Chicken Quesadilla': '/kids-grilled-chicken-quesadilla.webp',
  'Lasagna with Chicken Sausage Soup': '/Lasagna-with-Chicken-Sausage-Soup.webp',
  'Macadamia Nut Cookie': '/Macadamia-Nut-Cookie.webp',
  'Mango Green Tea Refresher': '/Mango-Green-Tea-Refresher.webp',
  'Mango Strawberry Smoothie': '/Mango-Strawberry-Smoothie.webp',
  "Miss Vickie's® BBQ Chips": '/Miss-Vickies-BBQ-Chips.webp',
  "Miss Vickie's® Jalapeño Chips": '/Miss-Vickies-Jalapeño-Chips.webp',
  'Muscle Up Bowl': '/Muscle-Up-Bowl.webp',
  'NEW Iced Lavender Matcha Latte': '/new-Iced-Lavender-Matcha-Latte.webp',
  'NEW Matcha Cloud Smoothie': '/Matcha-Cloud-Smoothie.webp',
  'NEW Steakhouse Salad': '/steakhouse-salad.webp',
  'Organic Berry Patch - Tractor Beverage Co.': '/Organic-Berry-Patch-Tractor-Beverage-Co.webp',
  'Organic Farmers Punch - Tractor Beverage Co.': '/Organic-Farmers-Punch-Tractor-Beverage-Co.webp',
  'Organic Lemonade - Tractor Beverage Co.': '/Organic-Lemonade-Tractor-Beverage-Co.webp',
  'Organic Strawberry Dragonfruit - Tractor Beverage Co.': '/Organic-Strawberry-Dragonfruit-Tractor-Beverage-Co.webp',
  'Organic Sweet Black Tea - Tractor Beverage Co.': '/Organic-Sweet-Black-Tea-Tractor-Beverage-Co.webp',
  'PB & N': '/PB-and-N.webp',
  'Peanut Butter Cookie': '/Peanut-Butter-Cookie.webp',
  'Pink Flamingo Smoothie': '/Pink-Flamingo-Smoothie.webp',
  'Savory Avocado': '/Savory-Avocado.webp',
  'Smart Water': '/Smart-Water.webp',
  'Southwest Corn Chowder with Bacon': '/Southwest-Corn-Chowder-with-Bacon.webp',
  'Spring Vegetable Soup': '/Spring-Vegetable-Soup.webp',
  'Strawberry Coconut Milk Refresher': '/Strawberry-Coconut-Milk-Refresher.webp',
  'Strawberry Dragonfruit Refresher': '/Strawberry-Dragonfruit-Refresher.webp',
  'Strawberry Lemonade Refresher': '/Strawberry-Lemonade-Refresher.webp',
  'Strawbrie': '/Strawbrie.webp',
  'Sweet Chili Shrimp Bowl': '/sweet-chili-shrimp-bowl.webp',
  'Sweet Cream Cold Brew': '/Sweet-Cream-Cold-Brew.webp',
  'The Family Bundle': '/The-Family-Bundle.webp',
  'Tropical Smoothie': '/Tropical-Smoothie.webp',
  'Turkey Cheddar and Bacon': '/turkey-cheddar-and-bacon.webp',
  'Vanilla Plant Protein Bites': '/Vanilla-Plant-Protein-Bites.webp',
  'Vanilla Plant Protein Bites with Coconut Flakes': '/Vanilla-Plant-Protein-Bites-with-Coconut-Flakes.webp',
  'Vanilla Whey Protein Bites': '/Vanilla-Whey-Protein-Bites.webp',
  'Vanilla Whey Protein Bites with Coconut Flakes': '/Vanilla-Whey-Protein-Bites-with-Coconut-Flakes.webp',
}

// ---------------------------------------------------------------------------
// Category ordering & filtering
// ---------------------------------------------------------------------------

const CATEGORY_ORDER: string[] = [
  'Protein Bowls',
  'Salads & Wraps',
  'Melts',
  'Grilled Wraps',
  'Soups',
  'Kids Works',
  'Sides & Desserts',
  'Drinks',
  'Family Meals',
]

const HIDDEN_CATEGORIES = new Set([
  'Would you like Utensils?',
  'Pick 2',
  'GLP-1',
  'High Protein',
  'Create Your Own',
])

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[®™©]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function itemSlugify(name: string): string {
  // Strip leading "NEW " for cleaner slugs but keep in display name
  const cleaned = name.replace(/^NEW\s+/i, '')
  return slugify(cleaned)
}

function findImage(itemName: string): string | undefined {
  // Exact match only. A loose substring fallback used to live here, but
  // verified against every real item name it never produced a correct match
  // it didn't already get via exact key — it only ever misfired (e.g. "Cold
  // Brew" matching inside "Nutella Mocha Cold Brew" and showing the wrong
  // photo). No image is more honest than a wrong one.
  return IMAGE_MAP[itemName]
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// ---------------------------------------------------------------------------
// Data directory paths
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), 'data', 'saladworks-data')
const MENUS_DIR = path.join(DATA_DIR, 'menus')
const LOCATIONS_DIR = path.join(DATA_DIR, 'locations')
const INDEX_FILE = path.join(DATA_DIR, 'index.json')

// ---------------------------------------------------------------------------
// Caching
// ---------------------------------------------------------------------------

interface IndexLocation {
  id: string
  state: string
  city: string
  oloSlug: string | null
  hasMenu: boolean
}

interface IndexData {
  generatedAt: string
  count: number
  withMenu: number
  locations: IndexLocation[]
}

interface MenuItemRaw {
  id: number
  chainProductId: number
  name: string
  description: string
  price: number | null
  priceFromOptions: boolean
  calories: number | null
  calorieLabel: string
  sizes: Array<{ name: string; price: number; calories: number | null }>
  optionGroupIds?: number[]
}

interface MenuCategoryRaw {
  id: number
  name: string
  items: MenuItemRaw[]
}

interface MenuDataRaw {
  slug: string
  name: string
  address: { state: string; city: string; [key: string]: unknown }
  categories: MenuCategoryRaw[]
  [key: string]: unknown
}

interface LocationDataRaw {
  id: string
  name: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  phone: string
  hours: LocationHours
  oloSlug: string | null
  hasMenu: boolean
  [key: string]: unknown
}

let _menuCache: Map<string, MenuDataRaw> | null = null
let _locationCache: Map<string, LocationDataRaw> | null = null
let _indexCache: IndexData | null = null

function loadIndex(): IndexData {
  if (_indexCache) return _indexCache
  try {
    const raw = fs.readFileSync(INDEX_FILE, 'utf-8')
    _indexCache = JSON.parse(raw) as IndexData
    return _indexCache
  } catch (err) {
    console.error('Failed to load index.json:', err)
    _indexCache = { generatedAt: '', count: 0, withMenu: 0, locations: [] }
    return _indexCache
  }
}

function loadAllMenus(): Map<string, MenuDataRaw> {
  if (_menuCache) return _menuCache
  _menuCache = new Map()

  try {
    const files = fs.readdirSync(MENUS_DIR).filter(f => f.endsWith('.json'))
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(MENUS_DIR, file), 'utf-8')
        const data = JSON.parse(raw) as MenuDataRaw
        // Key by the OLO slug (filename without .json)
        const slug = file.replace('.json', '')
        _menuCache.set(slug, data)
      } catch {
        // Skip unreadable menu files
      }
    }
  } catch {
    // Menus directory missing
  }

  return _menuCache
}

function loadAllLocations(): Map<string, LocationDataRaw> {
  if (_locationCache) return _locationCache
  _locationCache = new Map()

  try {
    const files = fs.readdirSync(LOCATIONS_DIR).filter(f => f.endsWith('.json'))
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(LOCATIONS_DIR, file), 'utf-8')
        const data = JSON.parse(raw) as LocationDataRaw
        _locationCache.set(data.id, data)
      } catch {
        // Skip unreadable location files
      }
    }
  } catch {
    // Locations directory missing
  }

  return _locationCache
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Get all index locations that have a menu and belong to a given state code. */
function getIndexLocationsForState(stateCode: string): IndexLocation[] {
  const index = loadIndex()
  return index.locations.filter(
    l => l.state === stateCode && l.hasMenu && l.oloSlug
  )
}

/** Build StateInfo for a given state code. */
function buildStateInfo(stateCode: string): StateInfo | null {
  const mapping = STATE_MAP[stateCode]
  if (!mapping) return null

  const locs = getIndexLocationsForState(stateCode)
  if (locs.length === 0) return null

  const cities = Array.from(new Set(locs.map(l => l.city))).sort()

  return {
    code: stateCode,
    slug: mapping.slug,
    name: mapping.name,
    locationCount: locs.length,
    cities,
  }
}

/** Aggregate items by chainProductId, averaging prices across locations. */
function aggregateMenus(
  oloSlugs: string[]
): StateMenuCategory[] {
  const menus = loadAllMenus()

  // Collect all categories across locations, keyed by category name
  const categoryMap = new Map<
    string,
    Map<
      number, // chainProductId
      {
        name: string
        description: string
        prices: number[]
        calories: number | null
        calorieLabel: string
        sizes: Array<{ name: string; price: number; calories: number | null }>
      }
    >
  >()

  for (const oloSlug of oloSlugs) {
    const menu = menus.get(oloSlug)
    if (!menu?.categories) continue

    for (const cat of menu.categories) {
      if (HIDDEN_CATEGORIES.has(cat.name)) continue

      if (!categoryMap.has(cat.name)) {
        categoryMap.set(cat.name, new Map())
      }
      const itemMap = categoryMap.get(cat.name)!

      for (const item of cat.items) {
        // Skip items with null price
        if (item.price === null) continue

        if (itemMap.has(item.chainProductId)) {
          const existing = itemMap.get(item.chainProductId)!
          existing.prices.push(item.price)
          // Keep latest non-empty description
          if (item.description && !existing.description) {
            existing.description = item.description
          }
          // Keep non-null calories
          if (item.calories !== null && existing.calories === null) {
            existing.calories = item.calories
            existing.calorieLabel = item.calorieLabel
          }
          // Keep larger sizes array
          if (item.sizes.length > existing.sizes.length) {
            existing.sizes = item.sizes
          }
        } else {
          itemMap.set(item.chainProductId, {
            name: item.name,
            description: item.description,
            prices: [item.price],
            calories: item.calories,
            calorieLabel: item.calorieLabel,
            sizes: [...item.sizes],
          })
        }
      }
    }
  }

  // Sort categories by defined order, then alphabetically for extras
  const categoryNames = Array.from(categoryMap.keys())
  categoryNames.sort((a, b) => {
    const idxA = CATEGORY_ORDER.indexOf(a)
    const idxB = CATEGORY_ORDER.indexOf(b)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return a.localeCompare(b)
  })

  const result: StateMenuCategory[] = []

  for (const catName of categoryNames) {
    const itemMap = categoryMap.get(catName)!
    const items: StateMenuItem[] = []

    for (const [chainProductId, data] of Array.from(itemMap)) {
      const avgPrice = round2(
        data.prices.reduce((sum, p) => sum + p, 0) / data.prices.length
      )
      const minPrice = Math.min(...data.prices)
      const maxPrice = Math.max(...data.prices)
      const image = findImage(data.name)

      items.push({
        chainProductId,
        name: data.name,
        slug: itemSlugify(data.name),
        description: data.description,
        price: avgPrice,
        minPrice,
        maxPrice,
        calories: data.calories,
        calorieLabel: data.calorieLabel,
        sizes: data.sizes,
        ...(image ? { image } : {}),
      })
    }

    // Sort items by name within category
    items.sort((a, b) => a.name.localeCompare(b.name))

    result.push({
      name: catName,
      slug: slugify(catName),
      items,
    })
  }

  return result
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Fallback if index.json is missing or has no generatedAt.
 */
const DATA_DATE_FALLBACK = '2026-07-01'

/**
 * Returns the date the menu/pricing data was last genuinely updated (YYYY-MM-DD),
 * taken from index.json's generatedAt — written by the scraper each time the data
 * is actually regenerated. This feeds sitemap <lastmod>, schema dateModified, and
 * the visible "prices as of" stamps. Never replace this with a rolling/offset
 * date: consistently-fake lastmod makes Google distrust it for the whole domain.
 */
export function getDataDate(): string {
  const generatedAt = loadIndex().generatedAt
  if (generatedAt && /^\d{4}-\d{2}-\d{2}/.test(generatedAt)) {
    return generatedAt.slice(0, 10)
  }
  return DATA_DATE_FALLBACK
}

/**
 * Returns list of all states that have menu data, sorted alphabetically by name.
 */
export function getAllStates(): StateInfo[] {
  const states: StateInfo[] = []

  for (const stateCode of Object.keys(STATE_MAP)) {
    const info = buildStateInfo(stateCode)
    if (info) states.push(info)
  }

  return states.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Returns slugs for all states with menu data.
 */
export function getStateSlugs(): string[] {
  return getAllStates().map(s => s.slug)
}

/**
 * Returns true if the slug matches a valid state slug.
 */
export function isStateSlug(slug: string): boolean {
  return slug in SLUG_TO_STATE
}

/**
 * Returns aggregated menu data for a specific state.
 * Reads all menu JSONs for locations in the state, averages prices for
 * the same item (matched by chainProductId), and returns structured data.
 */
const _stateMenuDataCache = new Map<
  string,
  { state: StateInfo; categories: StateMenuCategory[] } | null
>()

export function getStateMenuData(
  stateSlug: string
): { state: StateInfo; categories: StateMenuCategory[] } | null {
  if (_stateMenuDataCache.has(stateSlug)) {
    return _stateMenuDataCache.get(stateSlug)!
  }

  const stateCode = SLUG_TO_STATE[stateSlug]
  if (!stateCode) {
    _stateMenuDataCache.set(stateSlug, null)
    return null
  }

  const stateInfo = buildStateInfo(stateCode)
  if (!stateInfo) {
    _stateMenuDataCache.set(stateSlug, null)
    return null
  }

  const indexLocs = getIndexLocationsForState(stateCode)
  const oloSlugs = indexLocs.map(l => l.oloSlug!)

  const categories = aggregateMenus(oloSlugs)

  const result = { state: stateInfo, categories }
  _stateMenuDataCache.set(stateSlug, result)
  return result
}

/**
 * Returns data for a specific menu item in a specific state.
 */
export function getStateItemData(
  stateSlug: string,
  itemSlug: string
): { state: StateInfo; item: StateMenuItem; category: string } | null {
  const menuData = getStateMenuData(stateSlug)
  if (!menuData) return null

  for (const cat of menuData.categories) {
    const item = cat.items.find(i => i.slug === itemSlug)
    if (item) {
      return { state: menuData.state, item, category: cat.name }
    }
  }

  return null
}

/**
 * Returns all item slugs for a given state.
 */
export function getStateItemSlugs(stateSlug: string): string[] {
  const menuData = getStateMenuData(stateSlug)
  if (!menuData) return []

  const slugs: string[] = []
  for (const cat of menuData.categories) {
    for (const item of cat.items) {
      slugs.push(item.slug)
    }
  }
  return slugs
}

/**
 * Returns national averages - prices averaged across ALL locations.
 */
export function getNationalAverages(): { categories: StateMenuCategory[] } {
  const index = loadIndex()
  const allSlugs = index.locations
    .filter(l => l.hasMenu && l.oloSlug)
    .map(l => l.oloSlug!)

  const categories = aggregateMenus(allSlugs)
  return { categories }
}

/**
 * Returns all locations in a state with their hours and address info.
 */
export function getStateLocations(stateSlug: string): StateLocation[] {
  const stateCode = SLUG_TO_STATE[stateSlug]
  if (!stateCode) return []

  const index = loadIndex()
  const locations = loadAllLocations()
  const result: StateLocation[] = []

  const stateLocs = index.locations.filter(l => l.state === stateCode)

  for (const loc of stateLocs) {
    const detail = locations.get(loc.id)
    if (!detail) continue

    result.push({
      id: detail.id,
      name: detail.name,
      city: detail.city,
      address: [detail.address1, detail.address2].filter(Boolean).join(', '),
      phone: detail.phone,
      postalCode: detail.postalCode,
      hours: detail.hours,
      ...(typeof detail.latitude === 'number' ? { latitude: detail.latitude } : {}),
      ...(typeof detail.longitude === 'number' ? { longitude: detail.longitude } : {}),
    })
  }

  return result.sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
}

/**
 * Returns all states with their locations and hours data.
 */
export function getAllStateHoursData(): Array<{
  state: StateInfo
  locations: StateLocation[]
}> {
  const states = getAllStates()
  return states.map(state => ({
    state,
    locations: getStateLocations(state.slug),
  }))
}

// ---------------------------------------------------------------------------
// Per-item aggregate data (city prices, cross-state comparison, hours)
// ---------------------------------------------------------------------------

/** Find an item's price in a single location menu, matched by item slug. */
function findItemPriceInMenu(menu: MenuDataRaw, itemSlug: string): number | null {
  for (const cat of menu.categories ?? []) {
    if (HIDDEN_CATEGORIES.has(cat.name)) continue
    for (const item of cat.items) {
      if (item.price !== null && itemSlugify(item.name) === itemSlug) {
        return item.price
      }
    }
  }
  return null
}

/** Per-location prices for an item within a state: [{ city, price }]. */
function getItemLocationPrices(
  stateCode: string,
  itemSlug: string
): Array<{ city: string; price: number }> {
  const menus = loadAllMenus()
  const result: Array<{ city: string; price: number }> = []

  for (const loc of getIndexLocationsForState(stateCode)) {
    const menu = menus.get(loc.oloSlug!)
    if (!menu) continue
    const price = findItemPriceInMenu(menu, itemSlug)
    if (price !== null) {
      result.push({ city: loc.city, price })
    }
  }

  return result
}

/**
 * Returns per-city average prices for an item in a state, cheapest city first.
 */
export function getItemCityPrices(
  stateSlug: string,
  itemSlug: string
): CityItemPrice[] {
  const stateCode = SLUG_TO_STATE[stateSlug]
  if (!stateCode) return []

  const byCity = new Map<string, number[]>()
  for (const { city, price } of getItemLocationPrices(stateCode, itemSlug)) {
    if (!byCity.has(city)) byCity.set(city, [])
    byCity.get(city)!.push(price)
  }

  const result: CityItemPrice[] = []
  for (const [city, prices] of Array.from(byCity)) {
    result.push({
      city,
      price: round2(prices.reduce((a, b) => a + b, 0) / prices.length),
      locationCount: prices.length,
    })
  }

  return result.sort((a, b) => a.price - b.price || a.city.localeCompare(b.city))
}

const _itemStateComparisonCache = new Map<
  string,
  { states: StateItemStats[]; nationalAvg: number }
>()

/**
 * Returns per-state price stats for an item across every state that carries it
 * (sorted cheapest first), plus the national average across all locations.
 */
export function getItemStateComparison(
  itemSlug: string
): { states: StateItemStats[]; nationalAvg: number } {
  const cached = _itemStateComparisonCache.get(itemSlug)
  if (cached) return cached

  const states: StateItemStats[] = []
  const allPrices: number[] = []

  for (const [code, { slug, name }] of Object.entries(STATE_MAP)) {
    const locPrices = getItemLocationPrices(code, itemSlug)
    if (locPrices.length === 0) continue

    const prices = locPrices.map(p => p.price)
    allPrices.push(...prices)

    states.push({
      code,
      slug,
      name,
      locationCount: locPrices.length,
      avgPrice: round2(prices.reduce((a, b) => a + b, 0) / prices.length),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    })
  }

  states.sort((a, b) => a.avgPrice - b.avgPrice || a.name.localeCompare(b.name))

  const nationalAvg =
    allPrices.length > 0
      ? round2(allPrices.reduce((a, b) => a + b, 0) / allPrices.length)
      : 0

  const result = { states, nationalAvg }
  _itemStateComparisonCache.set(itemSlug, result)
  return result
}

/**
 * Deterministic set of states to cross-link from an item page: geographic
 * neighbors carrying the item, then the 3 cheapest states, then the most
 * expensive state. Never random — the same build always links the same states.
 */
export function getComparisonStates(
  itemSlug: string,
  currentStateSlug: string
): StateItemStats[] {
  const { states } = getItemStateComparison(itemSlug)
  const others = states.filter(s => s.slug !== currentStateSlug)
  if (others.length === 0) return []

  const currentCode = SLUG_TO_STATE[currentStateSlug]
  const neighborCodes = new Set(NEIGHBOR_MAP[currentCode] ?? [])

  const picked: StateItemStats[] = []
  const pickedSlugs = new Set<string>()
  const add = (s: StateItemStats) => {
    if (!pickedSlugs.has(s.slug)) {
      picked.push(s)
      pickedSlugs.add(s.slug)
    }
  }

  // Neighbors first (already price-sorted from getItemStateComparison)
  for (const s of others) {
    if (neighborCodes.has(s.code)) add(s)
  }
  // Cheapest 3
  for (const s of others.slice(0, 3)) add(s)
  // Most expensive
  add(others[others.length - 1])

  return picked
}

/**
 * Returns slugs of items carried in at least 2 states — the set that gets a
 * /menu/prices-by-state/[item] comparison page (single-state items would make
 * thin comparison pages).
 */
export function getComparableItemSlugs(): string[] {
  const stateCount = new Map<string, number>()

  for (const stateSlug of getStateSlugs()) {
    for (const itemSlug of Array.from(new Set(getStateItemSlugs(stateSlug)))) {
      stateCount.set(itemSlug, (stateCount.get(itemSlug) ?? 0) + 1)
    }
  }

  return Array.from(stateCount.entries())
    .filter(([, count]) => count >= 2)
    .map(([slug]) => slug)
    .sort()
}

/**
 * Returns display info for an item from the first state that carries it.
 */
export function findItemAcrossStates(
  itemSlug: string
): { item: StateMenuItem; category: string } | null {
  for (const stateSlug of getStateSlugs()) {
    const data = getStateItemData(stateSlug, itemSlug)
    if (data) return { item: data.item, category: data.category }
  }
  return null
}

/** Format "19:30" as "7:30 PM". */
export function formatTime12(t: string): string {
  const [hStr, mStr] = t.split(':')
  let h = parseInt(hStr, 10)
  if (Number.isNaN(h)) return t
  const suffix = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${mStr ?? '00'} ${suffix}`
}

/**
 * Returns the most common weekday opening and closing time across a state's
 * locations (12-hour formatted), or null if no hours data exists.
 */
export function getStateHoursSummary(
  stateSlug: string
): { open: string; close: string } | null {
  const locations = getStateLocations(stateSlug)
  if (locations.length === 0) return null

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const
  const openCounts = new Map<string, number>()
  const closeCounts = new Map<string, number>()

  for (const loc of locations) {
    for (const day of weekdays) {
      const h = loc.hours?.[day]
      if (h && 'open' in h) {
        openCounts.set(h.open, (openCounts.get(h.open) ?? 0) + 1)
        closeCounts.set(h.close, (closeCounts.get(h.close) ?? 0) + 1)
      }
    }
  }

  const mostCommon = (counts: Map<string, number>): string | null => {
    let best: string | null = null
    let bestCount = 0
    for (const [time, count] of Array.from(counts)) {
      if (count > bestCount || (count === bestCount && best !== null && time < best)) {
        best = time
        bestCount = count
      }
    }
    return best
  }

  const open = mostCommon(openCounts)
  const close = mostCommon(closeCounts)
  if (!open || !close) return null

  return { open: formatTime12(open), close: formatTime12(close) }
}
