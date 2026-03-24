"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Droplet, Heart, Activity, Calendar, Award, MapPin, Search, SlidersHorizontal, ChevronRight, CheckCircle2, MoreVertical, Download, Zap, ShieldCheck, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const donationHistory = [
  { id: 1, type: "Whole Blood", location: "Apollo Blood Center", date: "Jan 12, 2026", status: "Certified", img: "https://images.unsplash.com/photo-1519494080410-f9aa26261834?q=80&w=200" },
  { id: 2, type: "Plasma", location: "Red Cross Gachibowli", date: "Oct 24, 2025", status: "Verified", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200" },
  { id: 3, type: "Whole Blood", location: "City Govt. Hospital", date: "June 15, 2025", status: "Archived", img: "https://images.unsplash.com/photo-1542617300-47677d3419c8?q=80&w=200" },
]

export default function DonationHistoryPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex flex-col gap-1 tracking-tighter">
              <h1 className="text-3xl font-black flex items-center gap-3">
                 <Award className="w-8 h-8 text-medical-red animate-pulse" /> Life Saver Log
              </h1>
              <p className="text-sm font-bold text-muted-foreground opacity-60 uppercase tracking-widest text-[10px]">Your contribution to humanity via blood & organ donation.</p>
           </div>
           <div className="flex items-center gap-3">
              <span className="bg-medical-red/10 text-medical-red text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-medical-red/20 shadow-lg shadow-medical-red/5">BLOOD GROUP: B+</span>
              <Button className="bg-medical-red hover:bg-medical-red/90 text-white rounded-full h-12 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-red/20">+ Donate Now</Button>
           </div>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { label: "Lives Saved", value: "12", icon: Heart, color: "bg-medical-red text-white" },
             { label: "Total Units", value: "4", icon: Droplet, color: "bg-medical-blue text-white" },
             { label: "Donor Rank", value: "Gold", icon: BadgeCheck, color: "bg-medical-green text-white" },
           ].map(stat => (
              <div key={stat.label} className="bg-white border border-medical-grey/60 p-6 rounded-[2.5rem] flex flex-col items-center text-center space-y-2 group hover:border-medical-red/40 transition-all shadow-sm">
                 <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                 </div>
                 <h4 className="text-3xl font-black tracking-tighter">{stat.value}</h4>
                 <p className="text-[10px] font-black uppercase text-muted-foreground opacity-40 tracking-widest uppercase">{stat.label}</p>
              </div>
           ))}
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between border-b pb-4 border-medical-grey/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Your Donations History</h3>
           </div>
           
           <div className="space-y-4">
              {donationHistory.map((d, i) => (
                 <motion.div 
                   key={d.id} 
                   initial={{ opacity: 0, scale: 0.98 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   transition={{ delay: i * 0.05 }}
                   className="bg-white rounded-3xl border border-medical-grey/60 p-6 flex flex-col md:flex-row items-center gap-6 hover:border-medical-red/40 hover:shadow-xl hover:shadow-medical-red/5 transition-all group relative cursor-pointer"
                 >
                    <div className="flex-1 w-full md:w-auto flex items-center gap-4">
                       <img src={d.img} alt={d.type} className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:scale-110 transition-transform flex-shrink-0" />
                       <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-lg tracking-tight truncate leading-tight">{d.type}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-widest mt-0.5">
                             <MapPin className="w-3.5 h-3.5" /> {d.location}
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 self-stretch md:self-auto pt-4 md:pt-0 border-t md:border-t-0 border-dashed border-medical-grey/50">
                       <div className="flex flex-col items-end min-w-[80px]">
                          <p className="text-[10px] font-black text-foreground">{d.date}</p>
                          <p className={`text-[8px] font-black uppercase tracking-widest ${d.status === "Certified" ? "text-medical-green" : "text-muted-foreground opacity-40"}`}>{d.status}</p>
                       </div>
                       <Button variant="outline" size="sm" className="rounded-2xl h-11 px-6 border-medical-grey font-black text-[10px] items-center gap-2 group-hover:border-medical-red group-hover:text-medical-red transition-all shadow-sm">
                          <Download className="w-4 h-4" /> CERTIFICATE
                       </Button>
                       <button className="p-3 rounded-2xl hover:bg-medical-grey transition-colors text-muted-foreground/40"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Motivation Banner */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl ring-8 ring-slate-900/10">
           <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-black leading-tight">Next Donation Date: April 12</h3>
              <p className="text-sm font-medium opacity-60 leading-relaxed max-w-sm">You are eligible to donate whole blood again in 3 months. Your previous donation helped save someone in an emergency.</p>
              <div className="flex gap-4 pt-4">
                 <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-md flex-1 text-center">
                    <p className="text-2xl font-black mb-1 text-medical-red">B+</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 opacity-100">Compatibility</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-md flex-1 text-center">
                    <p className="text-2xl font-black mb-1">90 Days</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 opacity-100">Cooldown</p>
                 </div>
              </div>
           </div>
           <Activity className="absolute -bottom-16 -right-16 w-80 h-80 opacity-5 rotate-12 text-medical-red fill-medical-red" />
        </div>
      </div>
    </DashboardLayout>
  )
}
