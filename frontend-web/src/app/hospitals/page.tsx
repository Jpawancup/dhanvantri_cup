"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import HospitalCard from "@/components/cards/HospitalCard"
import { MOCK_HOSPITALS as hospitals } from "@/store/mockStore"
import { Search, SlidersHorizontal, MapPin, Building2, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"

const types = ["All", "Multi-Specialty", "Super-Specialty", "General", "Clinic", "Diagnostic Center"]

export default function HospitalsPage() {
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const allHospitalsList = [...hospitals, ...hospitals] 
  const filteredHospitals = allHospitalsList.filter(h => {
    const matchesFilter = filter === "All" || h.type === filter
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <DashboardLayout>
      {/* Search Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b px-4 py-4 md:px-6 md:pt-6 md:pb-6 sticky top-16 z-20 space-y-4 md:space-y-6 shadow-sm ring-1 ring-medical-grey/40">
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full mb-1">
           <h1 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-2 md:gap-3 italic">
             <Building2 className="w-6 h-6 md:w-7 md:h-7 text-medical-blue animate-pulse" /> Medical Hub
           </h1>
           <div className="flex items-center gap-1.5 md:gap-2 text-[10px] font-black uppercase tracking-widest text-medical-blue bg-medical-blue/10 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl cursor-pointer hover:bg-medical-blue hover:text-white transition-all shadow-sm">
             <Navigation className="w-3.5 h-3.5" /> Near Me
           </div>
        </div>
        
        <div className="flex gap-2 md:gap-4 max-w-4xl mx-auto w-full">
          <div className="relative flex-1 group">
             <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-medical-blue transition-colors opacity-40 group-focus-within:opacity-100" />
             <Input 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-9 md:pl-11 rounded-2xl bg-medical-grey/50 border-none h-11 md:h-14 focus-visible:ring-2 focus-visible:ring-medical-blue/30 text-sm font-bold tracking-tight shadow-inner" 
               placeholder="Search hospitals or clinics..." 
             />
          </div>
          <Button variant="outline" className="rounded-2xl w-11 h-11 md:w-14 md:h-14 border-medical-grey/60 flex-shrink-0 hover:bg-medical-grey transition-all shadow-sm p-0 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5 opacity-40" />
          </Button>
        </div>

        {/* Type chips */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2 max-w-4xl mx-auto w-full no-scrollbar">
          {types.map((t) => (
            <button 
              key={t}
              onClick={() => setFilter(t)} 
              className={`px-4 py-2 md:px-6 md:py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex-shrink-0 transition-all border-2 ${filter === t ? "bg-medical-blue border-medical-blue text-white shadow-xl shadow-medical-blue/20 scale-[1.02] md:scale-105" : "bg-white border-medical-grey/50 text-foreground/40 hover:border-medical-blue/30 hover:text-medical-blue"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-24">
        {/* Location banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-medical-blue/5 to-transparent px-5 py-4 rounded-2xl border border-medical-blue/10 text-sm shadow-sm">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                 <MapPin className="w-5 h-5 text-medical-red" />
              </div>
              <span className="text-foreground/80 font-medium">Ready to serve in <span className="font-black text-medical-blue">Bangalore, Karnataka</span></span>
           </div>
           <button className="text-xs font-black text-medical-blue uppercase tracking-widest hover:underline">Change</button>
        </div>

        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{filteredHospitals.length} hospitals discovered</p>
        </div>

        {/* Hospital Card Grid */}
        {filteredHospitals.length > 0 ? (
          <motion.div
             initial="hidden"
             animate="show"
             variants={{ show: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredHospitals.map((h, idx) => (
              <motion.div key={`${h.id}-${idx}`} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <HospitalCard hospital={h} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-medical-grey/60">
             <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
             <h3 className="text-lg font-black text-foreground">No hospitals found</h3>
             <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
