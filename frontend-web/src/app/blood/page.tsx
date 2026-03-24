"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Droplet, Search, SlidersHorizontal, MapPin, Phone, MessageSquare, Building2, ChevronRight, Activity, Clock, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const filterTypes = ["All", "Blood Bank", "Platelets", "Plasma", "RBC", "WBC", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

const bloodBanks = [
  { id: 1, name: "City Red Cross Blood Center", type: "Blood Bank", distance: "3.2 km", stocks: ["B+", "O+", "A+"], platelets: "High", plasma: "Medium", phone: "1800-419-1066", status: "Open 24/7", img: "https://images.unsplash.com/photo-1519494080410-f9aa26261834?q=80&w=2053&auto=format&fit=crop" },
  { id: 2, name: "Apollo Blood Bank", type: "Blood Bank", distance: "2.1 km", stocks: ["A+", "AB+", "O-"], platelets: "Low", plasma: "High", phone: "040-23607777", status: "Open 24/7", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop" },
  { id: 3, name: "Max Care Blood Center", type: "Blood Bank", distance: "5.4 km", stocks: ["B-", "A-", "AB-"], platelets: "Out of Stock", plasma: "Low", phone: "011-26510050", status: "Closing in 2h", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" },
]

export default function BloodBankPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedBank, setSelectedBank] = useState<any>(null)

  const filteredBanks = activeFilter === "All" || activeFilter === "Blood Bank" ? bloodBanks : bloodBanks.filter(b => 
    b.stocks.includes(activeFilter) || 
    (activeFilter === "Platelets" && b.platelets !== "Out of Stock") ||
    (activeFilter === "Plasma" && b.plasma !== "Out of Stock")
  )

  return (
    <DashboardLayout>
      <div className="bg-white border-b px-4 pt-4 pb-3 sticky top-16 z-20 space-y-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
           <h1 className="text-xl font-bold flex items-center gap-2"><Droplet className="w-5 h-5 text-medical-red fill-medical-red" /> Blood Centers</h1>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9 rounded-full bg-medical-grey border-none h-12" placeholder="Search blood banks, hospitals..." />
          </div>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-medical-grey flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filterTypes.map((t) => (
            <button 
              key={t} 
              onClick={() => setActiveFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-black flex-shrink-0 transition-all ${activeFilter === t ? "bg-medical-red text-white shadow-md shadow-medical-red/20" : "bg-medical-grey text-foreground/70 hover:bg-medical-red/10 hover:text-medical-red"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24 lg:max-w-5xl mx-auto">
        {/* Emergency Alert Banner */}
        <div className="bg-medical-red/10 border-2 border-medical-red/20 rounded-3xl p-6 md:p-8 text-medical-red overflow-hidden relative shadow-lg ring-4 ring-medical-red/5">
           <div className="relative z-10 max-w-sm">
             <h2 className="text-2xl font-black mb-2 flex items-center gap-2 uppercase tracking-tighter"><Activity className="w-6 h-6 animate-pulse" /> Critical Urgency?</h2>
             <p className="text-sm font-bold opacity-90 mb-6 leading-relaxed">Request blood units immediately through city-wide distress call. All available donors will be notified.</p>
             <Button className="bg-medical-red hover:bg-medical-red/90 text-white rounded-full font-black h-12 px-8 shadow-xl shadow-medical-red/30">RAISE SOS REQUEST</Button>
           </div>
           <Droplet className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
        </div>

        {/* Categories Grid */}
        <div className="space-y-4">
           <h3 className="font-extrabold text-xl flex items-center gap-2"><Building2 className="w-5 h-5 text-medical-red" /> Nearby Blood Centers</h3>
           
           {filteredBanks.length === 0 ? (
             <div className="py-20 text-center text-muted-foreground font-semibold bg-white border border-dashed rounded-3xl">
                No blood centers found with {activeFilter}.
             </div>
           ) : (
             <div className="space-y-4">
                {filteredBanks.map((bank) => (
                  <motion.div key={bank.id} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-medical-grey/60 p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-medical-grey group-hover:border-medical-red/30 transition-colors">
                        <img src={bank.img} alt={bank.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <h4 className="font-black text-base truncate">{bank.name}</h4>
                        <p className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-widest flex items-center gap-1.5 opacity-80"><MapPin className="w-3 h-3 text-medical-red" /> {bank.distance} • <Clock className="w-3 h-3" /> {bank.status}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1.5">
                           {bank.stocks.map(s => (
                             <span key={s} className="bg-medical-red text-white text-[10px] font-black px-2 py-0.5 rounded-md leading-none">{s}</span>
                           ))}
                           <span className="bg-orange-500/10 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-md leading-none">Platelets: {bank.platelets}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-dashed border-medical-grey flex items-center justify-between gap-3">
                      <Button 
                        onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${bank.phone}`; }}
                        variant="outline" 
                        className="flex-1 rounded-full border-medical-red/50 text-medical-red hover:bg-medical-red/5 font-black text-xs h-12 shadow-sm"
                      >
                         <Phone className="w-4 h-4 mr-2" /> Call Center
                      </Button>
                      <Button 
                        onClick={(e) => { e.stopPropagation(); setSelectedBank(bank); }}
                        className="flex-1 bg-medical-red hover:bg-medical-red/90 text-white rounded-full font-black text-xs h-12 shadow-sm"
                      >
                         <ChevronRight className="w-4 h-4 mr-2" /> View Stock
                      </Button>
                    </div>
                  </motion.div>
                ))}
             </div>
           )}
        </div>

        {/* Benefits of Donating */}
        <div className="bg-gradient-to-br from-medical-red to-rose-700 rounded-3xl p-8 md:p-12 text-white text-center space-y-5 shadow-xl shadow-medical-red/20 mx-2 md:mx-0">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-md shadow-inner">
               <Droplet className="w-10 h-10 text-white fill-white" />
            </div>
            <h3 className="text-3xl font-black">Be a Life Saver</h3>
            <p className="text-sm opacity-90 leading-relaxed font-bold max-w-sm mx-auto">Your single donation can save up to 3 lives. Register as a donor and get certified health reports + priority benefits.</p>
            <Button className="bg-white text-medical-red hover:bg-white/90 rounded-full font-black px-10 h-14 text-sm shadow-lg mt-2 tracking-widest">REGISTER AS DONOR</Button>
        </div>
      </div>

      <Dialog open={!!selectedBank} onOpenChange={() => setSelectedBank(null)}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl border-none shadow-2xl overflow-hidden p-0">
          <div className="relative h-40">
            <img src={selectedBank?.img} className="w-full h-full object-cover" alt="Blood Bank" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setSelectedBank(null)} 
              className="absolute top-4 right-4 rounded-full bg-white/20 border-none text-white hover:bg-white/40"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="absolute bottom-4 left-6">
              <h2 className="text-white text-xl font-black leading-tight">{selectedBank?.name}</h2>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-medical-red" /> {selectedBank?.distance}</p>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-medical-grey/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Blood Types Available</span>
                <div className="flex flex-wrap justify-center gap-1.5">
                   {selectedBank?.stocks.map((s: string) => (
                      <span key={s} className="bg-medical-red text-white text-xs font-black px-2 py-1 rounded-md">{s}</span>
                   ))}
                </div>
              </div>
              <div className="bg-medical-grey/30 rounded-2xl p-4 flex flex-col justify-center space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-muted-foreground">Platelets</span>
                  <span className={selectedBank?.platelets === "High" ? "text-medical-green" : selectedBank?.platelets === "Low" ? "text-orange-500" : "text-medical-red"}>{selectedBank?.platelets}</span>
                </div>
                <div className="h-px bg-medical-grey w-full" />
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-muted-foreground">Plasma</span>
                  <span className={selectedBank?.plasma === "High" ? "text-medical-green" : selectedBank?.plasma === "Low" ? "text-orange-500" : "text-medical-red"}>{selectedBank?.plasma}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => window.location.href=`tel:${selectedBank?.phone}`} className="w-full bg-medical-red text-white hover:bg-medical-red/90 h-14 rounded-full font-black tracking-widest shadow-xl shadow-medical-red/20">
              <Phone className="w-5 h-5 mr-2" />
              CALL TO RESERVE: {selectedBank?.phone}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
