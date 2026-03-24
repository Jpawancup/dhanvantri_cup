"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import DoctorCard from "@/components/cards/DoctorCard"
import { doctors } from "@/services/mockData"
import { Search, SlidersHorizontal, MapPin, Star, Stethoscope, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"

const specs = ["All", "Cardiologist", "Neurologist", "Orthopedic", "Gynecologist", "Pediatrician", "Dermatologist", "ENT", "Psychiatrist"]

export default function FindDoctorsPage() {
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const allDoctorsList = [...doctors, ...doctors] 
  const filteredDoctors = allDoctorsList.filter(doc => {
    const matchesFilter = filter === "All" || doc.specialization === filter
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <DashboardLayout>
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-md border-b px-4 py-3 md:pt-4 md:pb-4 sticky top-16 z-20 space-y-3 md:space-y-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full mb-1">
           <h1 className="text-xl font-black text-foreground flex items-center gap-2">
             <Stethoscope className="w-6 h-6 text-medical-green" /> Find Specialists
           </h1>
           <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-medical-green bg-medical-green/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-medical-green hover:text-white transition-all">
             <Star className="w-3 h-3 fill-current" /> Top Rated
           </div>
        </div>

        <div className="flex gap-2 max-w-7xl mx-auto w-full">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-medical-green transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-2xl bg-medical-grey border-none h-11 focus-visible:ring-2 focus-visible:ring-medical-green/30 text-sm font-medium" 
              placeholder="Search doctors, symptoms or specializations..." 
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-2xl w-11 h-11 border-medical-grey flex-shrink-0 hover:bg-medical-grey transition-all">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Specialization chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 max-w-7xl mx-auto w-full">
          {specs.map((s) => (
            <button 
              key={s} 
              onClick={() => setFilter(s)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest flex-shrink-0 transition-all border-2 ${filter === s ? "bg-medical-green border-medical-green text-white shadow-lg shadow-medical-green/20" : "bg-white border-medical-grey/50 text-foreground/60 hover:border-medical-green/30 hover:text-medical-green"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-7xl mx-auto pb-24">
        {/* Location banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-medical-green/5 to-transparent px-5 py-4 rounded-2xl border border-medical-green/10 text-sm shadow-sm">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                 <MapPin className="w-5 h-5 text-medical-red" />
              </div>
              <span className="text-foreground/80 font-medium">Showing doctors near <span className="font-black text-medical-green">Mumbai, Maharashtra</span></span>
           </div>
           <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-medical-blue" />
              <button className="text-xs font-black text-medical-blue uppercase tracking-widest hover:underline">Change</button>
           </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{filteredDoctors.length} specialists found</p>
        </div>

        {/* Doctor Cards */}
        {filteredDoctors.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredDoctors.map((doc, idx) => (
              <motion.div key={`${doc.id}-${idx}`} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <DoctorCard doctor={doc} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-medical-grey/60">
             <Stethoscope className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
             <h3 className="text-lg font-black text-foreground">No specialists found</h3>
             <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
