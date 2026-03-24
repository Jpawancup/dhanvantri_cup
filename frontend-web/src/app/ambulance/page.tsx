"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Ambulance, Search, SlidersHorizontal, MapPin, Phone, MessageSquare, Building2, ChevronRight, Activity, Clock, ShieldCheck, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const ambulanceTypes = [
  { id: 1, name: "Basic Life Support (BLS)", time: "6-8 min", price: 800, desc: "Oxygen, Stretcher, First Aid Kit", icon: Ambulance, color: "bg-medical-blue/10 text-medical-blue" },
  { id: 2, name: "Advanced Life Support (ALS)", time: "8-12 min", price: 2500, desc: "Ventilator, ECG, Paramedic", icon: Zap, color: "bg-medical-green/10 text-medical-green" },
  { id: 3, name: "ICU On Wheels", time: "10-15 min", price: 5000, desc: "Critical Care Team, Full ICU Set", icon: ShieldCheck, color: "bg-medical-red/10 text-medical-red" },
]

export default function AmbulancePage() {
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-medical-red flex items-center gap-2">
              <Ambulance className="w-8 h-8 animate-bounce" /> Emergency Services
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">Request 24/7 medical transportation in seconds.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => router.push("/ambulance/sos")} className="bg-medical-red hover:bg-medical-red/90 text-white rounded-full font-black px-6 shadow-xl shadow-medical-red/30">RAISE SOS</Button>
          </div>
        </div>

        {/* Current Location Card */}
        <div className="bg-white rounded-3xl border border-medical-red/20 p-6 shadow-lg shadow-medical-red/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 flex gap-4">
            <div className="w-12 h-12 bg-medical-red/10 rounded-2xl flex items-center justify-center flex-shrink-0">
               <MapPin className="w-6 h-6 text-medical-red" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Picking up from</p>
              <h3 className="text-lg font-black mt-0.5 leading-tight">H-12, Green Park Avenue, New Delhi</h3>
              <p className="text-xs text-medical-blue font-bold mt-1.5 cursor-pointer hover:underline">Edit Location ↗</p>
            </div>
          </div>
          <div className="flex h-12 gap-2 bg-medical-grey rounded-2xl p-1">
             <button className="flex-1 px-4 text-xs font-bold rounded-xl bg-white shadow-sm text-medical-red">Emergency</button>
             <button className="flex-1 px-4 text-xs font-bold rounded-xl text-muted-foreground hover:bg-white/50 transition-all">Non-Critical</button>
          </div>
        </div>

        {/* Types Grid */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Choose Ambulance Type</h3>
            <span className="text-xs text-muted-foreground font-bold">NEARBY: 12 AMBULANCES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ambulanceTypes.map((type) => (
              <motion.div key={type.id} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-medical-grey/60 p-6 shadow-sm hover:border-medical-red/30 hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl ${type.color} flex items-center justify-center`}>
                    <type.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{type.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{type.desc}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-dashed space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1 font-bold"><Clock className="w-4 h-4" /> ETA: {type.time}</span>
                    <span className="text-medical-green font-black">₹{type.price}</span>
                  </div>
                  <Button onClick={() => router.push("/ambulance/book")} className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-full font-bold py-6 group-hover:bg-medical-red group-hover:text-white transition-colors">
                     BOOK NOW
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pre-hospital Instructions */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
           <div className="relative z-10 space-y-4 max-w-lg">
             <h3 className="text-2xl font-black">Waiting for Ambulance?</h3>
             <ul className="space-y-3">
               {[
                 "Keep the patient in a well-ventilated area.",
                 "Stay on the call with our dispatch team for guidance.",
                 "Gather the patient's ID and current medications.",
                 "Clear the pathway for easy stretcher access."
               ].map((text, i) => (
                 <li key={i} className="flex gap-3 text-sm font-medium opacity-90 leading-relaxed">
                   <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black">{i+1}</div>
                   {text}
                 </li>
               ))}
             </ul>
           </div>
           <Activity className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10" />
        </div>
      </div>
    </DashboardLayout>
  )
}
