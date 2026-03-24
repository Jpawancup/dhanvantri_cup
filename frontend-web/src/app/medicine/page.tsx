"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Pill, Search, SlidersHorizontal, MapPin, Phone, MessageSquare, Building2, ChevronRight, Activity, Clock, ShieldCheck, Zap, ShoppingCart, Apple, Thermometer, FlaskConical, Plus, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

const categories = ["All", "Diabetes", "Heart Care", "Pain Relief", "Ayurvedic", "Skin Care", "Baby Care", "Cold & Cough", "First Aid"]

const products = [
  { id: 1, name: "Metformin 500mg", cat: "Diabetes", price: 120, originalPrice: 150, brand: "Cipla", prescription: true, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop" },
  { id: 2, name: "Paracetamol Case", cat: "Pain Relief", price: 45, originalPrice: 60, brand: "Crocin", prescription: false, img: "https://images.unsplash.com/photo-1550572528-f291309f4ffb?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, name: "Omega 3 Capsules", cat: "Heart Care", price: 899, originalPrice: 1200, brand: "HealthVit", prescription: false, img: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, name: "Aspirin 81mg", cat: "Heart Care", price: 65, originalPrice: 80, brand: "Bayer", prescription: true, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop" },
]

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function MedicinePage() {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [addedItems, setAddedItems] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProducts = activeCategory === "All" ? products : products.filter(p => p.cat === activeCategory)

  const toggleItem = (id: number) => {
    if (addedItems.includes(id)) {
      setAddedItems(addedItems.filter(i => i !== id))
      setCartCount(prev => Math.max(0, prev - 1))
    } else {
      setAddedItems([...addedItems, id])
      setCartCount(prev => prev + 1)
    }
  }

  return (
    <DashboardLayout>
      <div className="bg-white border-b px-4 pt-4 pb-3 sticky top-16 z-20 space-y-3 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9 rounded-full bg-medical-grey border-none h-12" placeholder="Search medicines, devices, wellness..." />
          </div>
          <Button onClick={() => router.push("/medicine/cart")} variant="outline" size="icon" className="rounded-full w-12 h-12 border-medical-grey flex-shrink-0 relative group shadow-sm bg-white">
            <ShoppingCart className="w-5 h-5 group-hover:text-medical-green transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-medical-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((c) => (
            <button 
              key={c} 
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold flex-shrink-0 transition-all ${activeCategory === c ? "bg-medical-green text-white shadow-md shadow-medical-green/20" : "bg-medical-grey text-foreground/70 hover:bg-medical-green/10 hover:text-medical-green"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-8 pb-24 lg:max-w-5xl mx-auto">
        {/* Prescription Header Banner */}
        <div className="bg-gradient-to-r from-medical-green to-medical-blue rounded-[2rem] p-6 text-white overflow-hidden relative shadow-lg ring-4 ring-medical-green/10">
           <div className="relative z-10 flex items-center justify-between gap-6 flex-wrap max-w-lg">
             <div className="flex-1 min-w-[200px] space-y-2">
               <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tighter"><Pill className="w-6 h-6" /> Need Medicines Fast?</h2>
               <p className="text-sm font-bold opacity-90 leading-tight">Upload prescription and we&apos;ll deliver in 60 minutes.</p>
             </div>
             <Button className="bg-white text-medical-green hover:bg-white/90 rounded-full font-black px-8 py-6 text-sm shadow-xl shadow-medical-green/30 tracking-widest leading-none">UPLOAD NOW</Button>
           </div>
           <ShieldCheck className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10 rotate-12" />
        </div>

        {/* Categories Grid (Quick Access) */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 py-4">
           {[
             { name: "Diabetes", icon: FlaskConical, color: "bg-blue-100 text-blue-600" },
             { name: "Heart", icon: Activity, color: "bg-red-100 text-red-600" },
             { name: "Pain", icon: Thermometer, color: "bg-orange-100 text-orange-600" },
             { name: "Ayurvedic", icon: Pill, color: "bg-green-100 text-green-600" },
             { name: "Baby", icon: Apple, color: "bg-pink-100 text-pink-600" },
             { name: "First Aid", icon: Building2, color: "bg-medical-grey text-slate-600" },
             { name: "Vitamins", icon: Zap, color: "bg-purple-100 text-purple-600" },
             { name: "Fitness", icon: Zap, color: "bg-emerald-100 text-emerald-600" },
           ].map(c => (
             <div key={c.name} onClick={() => setActiveCategory(c.name)} className="flex flex-col items-center gap-2 cursor-pointer group">
               <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm ring-2 ring-transparent group-hover:ring-${c.color.split(' ')[0].split('-')[1]}-200`}>
                 <c.icon className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-tight text-center truncate w-full group-hover:text-medical-green transition-colors">{c.name}</span>
             </div>
           ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-4 pt-2">
           <div className="flex items-center justify-between">
             <h3 className="font-extrabold text-xl flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-medical-blue" />
               {activeCategory === "All" ? "Top Sellers" : `${activeCategory} Products`}
             </h3>
             <span className="text-sm text-medical-green font-bold cursor-pointer hover:underline">View All</span>
           </div>
           
           {filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground font-semibold bg-white border border-dashed rounded-3xl">
                 No products found for {activeCategory}.
              </div>
           ) : (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {filteredProducts.map((p) => (
                 <motion.div key={p.id} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-medical-grey/60 p-4 md:p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden flex flex-col h-full hover:border-medical-green/40">
                   <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-sm bg-medical-grey/20 border border-medical-grey/30">
                     <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     {p.prescription && (
                       <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" /> RX REQUIRED
                       </div>
                     )}
                   </div>
                   <div className="flex-1 space-y-1">
                     <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{p.brand}</p>
                     <h4 className="font-black text-sm leading-tight line-clamp-2">{p.name}</h4>
                   </div>
                    <div className="mt-4 pt-4 border-t border-dashed border-medical-grey space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-foreground">₹{p.price}</span>
                        <span className="text-[10px] text-muted-foreground line-through font-bold">₹{p.originalPrice}</span>
                        <span className="text-[10px] font-black text-medical-red bg-medical-red/10 px-1 py-0.5 rounded-sm ml-auto">
                           {(100 - (p.price / p.originalPrice * 100)).toFixed(0)}% OFF
                        </span>
                      </div>
                      <Button 
                        onClick={() => toggleItem(p.id)}
                        className={`w-full rounded-full font-black text-xs h-10 transition-all shadow-sm ${
                          addedItems.includes(p.id) 
                            ? "bg-medical-green text-white shadow-md shadow-medical-green/20" 
                            : "bg-medical-grey text-foreground hover:bg-medical-green hover:text-white"
                        }`}
                      >
                        {addedItems.includes(p.id) ? (
                          <span className="flex items-center gap-1.5 tracking-widest"><CheckCircle className="w-4 h-4" /> ADDED</span>
                        ) : (
                          <span className="flex items-center gap-1.5 tracking-widest"><Plus className="w-4 h-4" /> ADD</span>
                        )}
                      </Button>
                    </div>
                 </motion.div>
               ))}
             </div>
           )}
        </div>

        {/* Home Delivery Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden ring-8 ring-slate-900/10">
           <div className="relative z-10 space-y-2 max-w-lg">
             <h3 className="text-2xl font-black flex items-center gap-3">60 MIN DELIVERY <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" /></h3>
             <p className="text-sm opacity-80 leading-relaxed font-medium">Deliveries from 20,000+ local pharmacies across India. Verified and genuine certificates included.</p>
             <div className="flex gap-4 pt-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold text-medical-green">
                   <ShieldCheck className="w-4 h-4" /> 100% GENUINE
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-medical-blue">
                   <Building2 className="w-4 h-4" /> 20K+ PARTNERS
                </div>
             </div>
           </div>
           <Activity className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10 rotate-12" />
        </div>
      </div>
    </DashboardLayout>
  )
}
