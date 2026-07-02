"use client"

import { useState, useMemo, useEffect } from "react"
import { MapPin, Clock, Search, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"

type StoreHours = {
  open?: string;
  close?: string;
  closed?: boolean;
}

type LocationData = {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone?: string;
  hours: {
    monday: StoreHours;
    tuesday: StoreHours;
    wednesday: StoreHours;
    thursday: StoreHours;
    friday: StoreHours;
    saturday: StoreHours;
    sunday: StoreHours;
  }
}

type StateData = {
  state: { code: string; name: string; slug: string };
  locations: LocationData[];
}

export function HoursClient({ initialData }: { initialData: StateData[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentDay, setCurrentDay] = useState<string>("monday")
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentTime(new Date())
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    setCurrentDay(days[new Date().getDay()])
    
    // Update time every minute to refresh open/closed status
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const checkIsOpen = (dayHours: StoreHours): boolean => {
    if (!currentTime || dayHours.closed || !dayHours.open || !dayHours.close) return false;
    
    const parseTime = (timeStr: string) => {
      const parts = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (!parts) return null;
      let hours = parseInt(parts[1], 10)
      const minutes = parseInt(parts[2], 10)
      const modifier = parts[3].toUpperCase()
      
      if (hours === 12) {
        hours = modifier === 'AM' ? 0 : 12;
      } else if (modifier === 'PM') {
        hours += 12;
      }
      
      const d = new Date(currentTime)
      d.setHours(hours, minutes, 0, 0)
      return d
    }

    try {
      const openTime = parseTime(dayHours.open)
      const closeTime = parseTime(dayHours.close)
      
      if (!openTime || !closeTime) return false;
      return currentTime >= openTime && currentTime <= closeTime;
    } catch(e) {
      return false;
    }
  }

  const [displayLimit, setDisplayLimit] = useState(50)

  // Reset limit on search
  useEffect(() => {
    setDisplayLimit(50)
  }, [searchTerm])

  // Filter Data
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return initialData;

    const term = searchTerm.toLowerCase().trim()
    const result: StateData[] = []

    initialData.forEach(stateGroup => {
      const matchesState = stateGroup.state.name.toLowerCase().includes(term) || stateGroup.state.code.toLowerCase().includes(term)
      
      if (matchesState) {
        result.push(stateGroup)
        return
      }

      const matchingLocations = stateGroup.locations.filter(loc => 
        loc.city.toLowerCase().includes(term) || 
        loc.postalCode.includes(term) || 
        loc.address.toLowerCase().includes(term) ||
        loc.name.toLowerCase().includes(term)
      )

      if (matchingLocations.length > 0) {
        result.push({ ...stateGroup, locations: matchingLocations })
      }
    })

    return result
  }, [searchTerm, initialData])

  const totalFound = filteredData.reduce((acc, curr) => acc + curr.locations.length, 0)

  const formatHours = (day: StoreHours) => {
    if (day.closed) return "Closed"
    // Clean string format, ensuring hyphen instead of em-dash
    return `${day.open} - ${day.close}`
  }

  // Calculate rendering elements respecting the displayLimit
  let renderedLocationsCount = 0;
  const elementsToRender = [];
  
  for (const stateData of filteredData) {
    if (renderedLocationsCount >= displayLimit) break;

    const remainingSlots = displayLimit - renderedLocationsCount;
    const locationsToRender = stateData.locations.slice(0, remainingSlots);
    renderedLocationsCount += locationsToRender.length;

    if (locationsToRender.length === 0) continue;

    elementsToRender.push(
      <div key={stateData.state.code} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        
        {/* State Header */}
        <div className="bg-brand-deep p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-orange" />
              {stateData.state.name} SaladWorks Locations
            </h2>
          </div>
          <Link href={`/menu/${stateData.state.slug}`} className="bg-brand-orange hover:bg-brand-leaf text-white px-5 py-2.5 rounded-lg font-bold transition-colors text-sm text-center">
            View {stateData.state.name} Menu
          </Link>
        </div>

        {/* Locations List */}
        <div className="divide-y divide-gray-100">
          {locationsToRender.map((loc) => {
            const todayHours = loc.hours[currentDay as keyof typeof loc.hours];
            const isOpen = checkIsOpen(todayHours);

            return (
              <div key={loc.id} className="p-6 lg:p-8 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row gap-8">
                  
                  {/* Location Details */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-site-black text-lg">Saladworks {loc.name}</h3>
                      {isOpen ? (
                        <span className="bg-brand-green/10 text-brand-leaf text-[11px] font-black uppercase px-2.5 py-1 rounded-md">Open Now</span>
                      ) : (
                        <span className="bg-red-50 text-red-600 text-[11px] font-black uppercase px-2.5 py-1 rounded-md">Closed</span>
                      )}
                    </div>
                    
                    <address className="not-italic text-gray-500 text-[15px] leading-relaxed mb-4">
                      {loc.address}<br />
                      {loc.city}, {stateData.state.code} {loc.postalCode}
                    </address>

                    <div className="flex flex-wrap gap-3">
                      {loc.phone && (
                        <a href={`tel:${loc.phone}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green hover:text-brand-deep bg-brand-green/5 px-3 py-1.5 rounded-lg transition-colors">
                          <Phone className="w-4 h-4" /> {loc.phone}
                        </a>
                      )}
                      <a href={`https://www.google.com/maps/search/?api=1&query=Saladworks+${encodeURIComponent(loc.address)}+${encodeURIComponent(loc.city)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-site-black bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" /> Directions
                      </a>
                    </div>
                  </div>

                  {/* Hours Table */}
                  <div className="lg:w-2/3">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4 text-site-black font-bold border-b border-gray-200 pb-3">
                        <Clock className="w-4 h-4 text-brand-orange" />
                        Weekly Hours
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                        {[
                          { label: 'Sunday', hours: formatHours(loc.hours.sunday), key: 'sunday' },
                          { label: 'Monday', hours: formatHours(loc.hours.monday), key: 'monday' },
                          { label: 'Tuesday', hours: formatHours(loc.hours.tuesday), key: 'tuesday' },
                          { label: 'Wednesday', hours: formatHours(loc.hours.wednesday), key: 'wednesday' },
                          { label: 'Thursday', hours: formatHours(loc.hours.thursday), key: 'thursday' },
                          { label: 'Friday', hours: formatHours(loc.hours.friday), key: 'friday' },
                          { label: 'Saturday', hours: formatHours(loc.hours.saturday), key: 'saturday' },
                        ].map((day, i) => (
                          <div key={i} className="flex flex-col">
                            <span className={`text-[12px] font-bold uppercase tracking-wider mb-1 ${currentDay === day.key ? 'text-brand-orange' : 'text-gray-400'}`}>
                              {day.label}
                            </span>
                            <span className={`text-[13px] sm:text-[14px] font-semibold ${day.hours === 'Closed' ? 'text-gray-400' : 'text-site-black'} ${currentDay === day.key ? 'text-brand-orange' : ''}`}>
                              {day.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
          
          {stateData.locations.length > locationsToRender.length && (
            <div className="p-6 text-center bg-gray-50">
              <span className="text-gray-500 font-medium text-sm">...and {stateData.locations.length - locationsToRender.length} more locations in {stateData.state.name}</span>
            </div>
          )}
        </div>

      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 flex flex-col md:flex-row gap-4 items-center sticky top-24 z-40">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by City, State, or Zip Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green bg-gray-50 text-[16px] font-medium"
          />
        </div>
        <div className="w-full md:w-auto shrink-0 text-sm font-bold text-gray-500 whitespace-nowrap text-center md:text-left">
          {totalFound} Locations Found
        </div>
      </div>

      {/* Results */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">📍</div>
          <h3 className="text-2xl font-bold text-site-black mb-2">No locations found</h3>
          <p className="text-gray-500">We couldn't find any Saladworks matching "{searchTerm}". Try a different city or state.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {elementsToRender}
          
          {totalFound > displayLimit && (
            <button 
              onClick={() => setDisplayLimit(prev => prev + 50)} 
              className="mx-auto block bg-white border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors font-bold py-3 px-8 rounded-full shadow-sm"
            >
              Load More Locations ({totalFound - displayLimit} remaining)
            </button>
          )}
        </div>
      )}
    </div>
  )
}
