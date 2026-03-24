"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Search, SlidersHorizontal, MapPin, Microscope, Clock, Star, ChevronRight, FlaskConical, Thermometer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

const categories = ["All", "Blood Test", "X-Ray", "MRI", "CT Scan", "Thyroid", "Diabetes", "Heart", "Full Body"]

const diagnosticTests = [
  { id: 1, name: "Full Body Checkup", cat: "Full Body", price: 1999, originalPrice: 3500, tests: 64, time: "24-48 hrs", popular: true, img: "https://images.unsplash.com/photo-1579152276506-5d5ecf1c9bb5?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Diabetes Screening", cat: "Diabetes", price: 499, originalPrice: 1200, tests: 4, time: "Same day", popular: false, img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, name: "Thyroid Profile (T3 T4 TSH)", cat: "Thyroid", price: 699, originalPrice: 999, tests: 3, time: "24 hrs", popular: true, img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop" },
  { id: 4, name: "Vitamin D & B12 Combo", cat: "Blood Test", price: 1299, originalPrice: 2200, tests: 2, time: "24 hrs", popular: false, img: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, name: "Cardiac Risk Profile", cat: "Heart", price: 1599, originalPrice: 2500, tests: 12, time: "48 hrs", popular: true, img: "https://images.unsplash.com/photo-1576091160550-2173599211d0?q=80&w=2070&auto=format&fit=crop" },
  { id: 6, name: "Chest X-Ray", cat: "X-Ray", price: 599, originalPrice: 800, tests: 1, time: "4 hrs", popular: false, img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop" },
]

export default function DiagnosticsPage() {
  const [filter, setFilter] = useState("All")
  
  const filteredTests = filter === "All" ? diagnosticTests : diagnosticTests.filter(t => t.cat === filter)

  return (
    <DashboardLayout>
      <div className="bg-white border-b px-4 pt-4 pb-3 sticky top-16 z-20 space-y-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
           <h1 className="text-xl font-bold flex items-center gap-2"><Microscope className="w-5 h-5 text-medical-green" /> Diagnostics</h1>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9 rounded-full bg-medical-grey border-none h-12" placeholder="Search tests, labs, collections..." />
          </div>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-medical-grey flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((c) => (
            <button 
              key={c} 
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold flex-shrink-0 transition-all ${filter === c ? "bg-medical-green text-white shadow-md" : "bg-medical-grey text-foreground/70 hover:bg-medical-green/10 hover:text-medical-green"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6 lg:max-w-5xl mx-auto">
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white overflow-hidden relative shadow-lg">
           <div className="relative z-10 max-w-sm">
             <h2 className="text-2xl font-black mb-2 leading-tight">Safe Home Sample Collection</h2>
             <p className="text-sm opacity-90 mb-6 font-medium leading-relaxed">Starting at just ₹99. Certified technicians will collect samples from your home.</p>
             <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-full font-bold h-12 px-8 shadow-sm">Book Now</Button>
           </div>
           <FlaskConical className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20 rotate-12" />
        </div>

        {/* Popular Tests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> {filter === "All" ? "Popular Health Packages" : `${filter} Tests`}
            </h3>
            <span className="text-sm text-medical-green font-bold cursor-pointer hover:underline">View All</span>
          </div>
          
          {filteredTests.length === 0 ? (
             <div className="py-20 text-center text-muted-foreground font-semibold bg-white border border-dashed rounded-3xl">
                No tests found for {filter}.
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredTests.map((t) => (
                <motion.div key={t.id} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-medical-grey/60 p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
                  {t.popular && <div className="absolute top-0 right-0 bg-medical-pink text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-2xl uppercase tracking-wider z-10">Most Popular</div>}
                  <div className="flex gap-4 relative z-0">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-medical-grey group-hover:border-medical-green/30 transition-colors">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="font-black text-base truncate pr-16">{t.name}</h4>
                      <p className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-widest flex items-center gap-1.5 opacity-80"><Clock className="w-3 h-3" /> Reports in {t.time}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xl font-black text-medical-green leading-none">₹{t.price}</span>
                        <span className="text-xs font-semibold text-muted-foreground line-through opacity-70">₹{t.originalPrice}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] font-bold text-medical-red bg-medical-red/10 px-1.5 py-0.5 rounded uppercase tracking-wider">SAVE {Math.round((1 - t.price/t.originalPrice) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-dashed border-medical-grey flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/60 flex items-center gap-1.5">Includes <span className="text-medical-blue bg-medical-blue/10 px-2 py-0.5 rounded-md">{t.tests} tests</span></span>
                    <Link href="/diagnostics/book" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full font-bold px-5 shadow-sm">Book Test</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="space-y-4">
           <h3 className="font-bold text-lg">Browse by Risk</h3>
           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[
                { name: "Heart", icon: Thermometer, color: "bg-red-50 text-red-500" },
                { name: "Sugar", icon: FlaskConical, color: "bg-orange-50 text-orange-500" },
                { name: "Kidney", icon: Microscope, color: "bg-blue-50 text-blue-500" },
                { name: "Liver", icon: FlaskConical, color: "bg-green-50 text-green-500" },
                { name: "Bone", icon: Microscope, color: "bg-medical-grey text-slate-500" },
                { name: "Vitamin", icon: FlaskConical, color: "bg-purple-50 text-purple-500" },
              ].map(c => (
                <div key={c.name} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-center">{c.name}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
