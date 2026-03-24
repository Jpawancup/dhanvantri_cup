"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Pill, Activity, MapPin, Phone, MessageCircle, ChevronRight, CheckCircle2, Truck, Box, Package, Zap, Clock, ShieldCheck, Map, ArrowLeft, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

const trackSteps = [
  { id: 1, label: "Order Placed", date: "10:30 AM", status: "completed", icon: Package },
  { id: 2, label: "Verified by Pharmacist", date: "10:45 AM", status: "completed", icon: ShieldCheck },
  { id: 3, label: "Out for Delivery", date: "11:05 AM", status: "active", icon: Truck },
  { id: 4, label: "Delivered", date: "Est 11:30 AM", status: "upcoming", icon: CheckCircle2 },
]

export default function TrackMedicinePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 pb-32 tracking-tight">
        <div className="flex items-center gap-4">
          <Link href="/medicine">
            <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-medical-grey hover:bg-white hover:border-medical-green transition-all"><ArrowLeft className="w-5 h-5 text-muted-foreground" /></Button>
          </Link>
          <div className="flex flex-col gap-0.5 tracking-tighter">
             <h1 className="text-3xl font-black">Track Order</h1>
             <p className="text-[10px] font-black uppercase text-medical-green tracking-widest flex items-center gap-2 underline underline-offset-4">#DH-9210-45C <CopyIcon className="w-3 h-3" /></p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
           {/* Tracking Steps Column */}
           <div className="flex-1 space-y-8">
              <div className="bg-white rounded-[2.5rem] border border-medical-grey/60 p-10 shadow-sm relative overflow-hidden h-full">
                 <div className="space-y-10 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-medical-grey/50 z-0 border-dashed border" />
                    {trackSteps.map((step) => (
                       <div key={step.id} className="flex gap-10 items-center relative z-10 group">
                          <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all ${step.status === "completed" ? "bg-medical-green text-white shadow-lg shadow-medical-green/20" : step.status === "active" ? "bg-medical-blue text-white shadow-xl shadow-medical-blue/20 ring-8 ring-medical-blue/5 animate-pulse" : "bg-medical-grey text-muted-foreground opacity-40"}`}>
                             <step.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between gap-4">
                                <h4 className={`font-black text-lg tracking-tight ${step.status === "upcoming" ? "opacity-30" : "opacity-100"}`}>{step.label}</h4>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${step.status === "completed" ? "text-medical-green" : step.status === "active" ? "text-medical-blue" : "text-muted-foreground opacity-40"}`}>{step.date}</span>
                             </div>
                             {step.status === "active" && (
                                <p className="text-[10px] font-black text-medical-blue uppercase tracking-widest mt-0.5 flex items-center gap-1.5 animate-in slide-in-from-left duration-700">Live: Arriving in 2.5 km <Activity className="w-3 h-3" /></p>
                             )}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Delivery Details Column */}
           <aside className="w-full md:w-80 space-y-6">
              <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl ring-8 ring-slate-950/5">
                 <div className="relative z-10 space-y-6">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black">Delivery Partner</h3>
                       <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Uber Health Care Fleet</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-4">
                       <div className="relative">
                          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200" className="w-24 h-24 rounded-full border-4 border-white/20 shadow-2xl object-cover" alt="Delivery" />
                          <div className="absolute -bottom-1 -right-1 bg-medical-green p-2 rounded-full border-2 border-slate-950 shadow-lg text-white"><Zap className="w-4 h-4 fill-white" /></div>
                       </div>
                       <div>
                          <h4 className="font-extrabold text-lg uppercase tracking-tight">Karan Singh</h4>
                          <div className="flex items-center justify-center gap-1 text-xs font-black text-yellow-400 mt-0.5">
                             {[0,1,2,3,4].map(i => <StarIcon key={i} className="w-3 h-3 fill-yellow-400" />)} <span className="text-white opacity-80 decoration-white/20 ml-1">4.9 Rating</span>
                          </div>
                       </div>
                       <div className="flex gap-2 w-full pt-4">
                          <Button className="flex-1 bg-white text-slate-900 hover:bg-medical-green hover:text-white rounded-2xl h-14 font-black transition-all shadow-xl active:scale-95"><Phone className="w-5 h-5" /></Button>
                          <Button className="flex-1 bg-white/10 text-white hover:bg-white/20 rounded-2xl h-14 font-black transition-all border border-white/10 active:scale-95"><MessageCircle className="w-5 h-5" /></Button>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -bottom-16 -left-16 w-64 h-64 opacity-10 rotate-12 text-medical-blue fill-medical-blue" />
              </div>

              <div className="bg-white rounded-3xl p-8 border border-medical-grey/60 space-y-6 shadow-sm group hover:border-medical-green transition-all">
                 <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Delivery to</h4>
                    <p className="font-black text-sm leading-snug flex items-center gap-3">
                       <MapPin className="w-5 h-5 text-medical-red" /> H-12, Green Park Avenue, New Delhi, 110016
                    </p>
                 </div>
                 <div className="pt-6 border-t border-dashed border-medical-grey/50">
                    <Button variant="ghost" className="w-full text-xs font-black text-medical-blue uppercase tracking-widest flex items-center justify-between px-0 hover:bg-transparent hover:translate-x-1 transition-all">
                       <span>Edit Delivery Details</span>
                       <ChevronRight className="w-4 h-4" />
                    </Button>
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}
