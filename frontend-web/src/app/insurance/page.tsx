"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ShieldCheck, Heart, Umbrella, FileText, Plus, ChevronRight, Activity, Clock, Zap, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

const policies = [
  { id: 1, name: "Star Health Assurance", number: "POL-BH-9284-01", status: "Active", expiry: "Jan 12, 2027", coverage: 500000, color: "bg-medical-blue", icon: ShieldCheck, premium: "₹1,240/mo" },
  { id: 2, name: "HDFC ERGO Optima", number: "POL-HY-1054-99", status: "Pending", expiry: "Nov 24, 2026", coverage: 1000000, color: "bg-medical-green", icon: Heart, premium: "₹2,100/mo" },
]

export default function InsurancePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 pb-32 tracking-tight">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black flex items-center gap-3">
             <Umbrella className="w-8 h-8 text-medical-blue animate-pulse" /> Health Insurance
          </h1>
          <p className="text-sm font-bold text-muted-foreground opacity-60 italic leading-relaxed">Secure your family with 100% cashless claims at 20,000+ hospitals.</p>
        </div>

        {/* Action zone */}
        <div className="grid grid-cols-2 gap-4">
           <Button className="bg-medical-blue hover:bg-medical-blue/90 text-white rounded-3xl py-10 font-black text-lg flex flex-col gap-1.5 shadow-xl shadow-medical-blue/20 flex-1 h-auto relative overflow-hidden group">
              <Plus className="w-6 h-6 group-hover:scale-125 transition-transform" /> 
              <span>BUY POLICY</span>
              <ShieldCheck className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 rotate-12" />
           </Button>
           <Button variant="outline" className="border-medical-green text-medical-green hover:bg-medical-green/5 rounded-3xl py-10 font-black text-lg flex flex-col gap-1.5 flex-1 h-auto relative overflow-hidden transition-all group">
              <Activity className="w-6 h-6 group-hover:scale-125 transition-transform" /> 
              <span>CLAIMS & SOS</span>
              <Heart className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 rotate-12" />
           </Button>
        </div>

        {/* Existing Policies */}
        <div className="space-y-6">
           <div className="flex items-center justify-between border-b pb-4">
             <h3 className="font-extrabold text-lg uppercase tracking-widest text-muted-foreground/60">Active Policies (2)</h3>
             <span className="text-xs font-black text-medical-blue cursor-pointer">View All ↗</span>
           </div>
           
           <div className="space-y-6">
              {policies.map((p, i) => (
                 <motion.div 
                   key={p.id} 
                   initial={{ opacity: 0, scale: 0.98 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   transition={{ delay: i * 0.1 }}
                   className="bg-white rounded-3xl border border-medical-grey/60 p-6 shadow-sm relative overflow-hidden group hover:border-medical-blue/40 transition-all hover:shadow-xl hover:shadow-medical-blue/5"
                 >
                    <div className="flex items-start justify-between gap-6">
                       <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:rotate-12 transition-transform`}>
                             <p.icon className="w-8 h-8" />
                          </div>
                          <div>
                             <h4 className="font-black text-xl leading-tight">{p.name}</h4>
                             <p className="text-xs font-bold text-muted-foreground mt-0.5 tracking-wider uppercase opacity-60">Policy: {p.number}</p>
                          </div>
                       </div>
                       <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 ${p.status === "Active" ? "bg-medical-green/10 text-medical-green" : "bg-amber-100 text-amber-600"}`}>
                          {p.status === "Active" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />} {p.status}
                       </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-6 p-4 bg-medical-grey/20 rounded-2xl">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Estimated Coverage</p>
                          <p className="text-xl font-black text-foreground">₹{(p.coverage/100000).toFixed(1)} Lakh</p>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Monthly Premium</p>
                          <p className="text-xl font-black text-medical-blue">{p.premium}</p>
                       </div>
                    </div>

                    <div className="mt-8 space-y-4">
                       <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest mb-1.5">
                          <span>Usage Limit</span>
                          <span className="text-muted-foreground">0% used</span>
                       </div>
                       <Progress value={5} className="h-2 rounded-full bg-medical-grey" />
                    </div>

                    <div className="mt-8 pt-6 border-t border-dashed flex justify-between items-center text-xs font-black">
                       <span className="text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Expires: {p.expiry}</span>
                       <button className="text-medical-blue flex items-center gap-2 transition-all hover:translate-x-1 uppercase tracking-widest">Manage Policy <ChevronRight className="w-4 h-4" /></button>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Benefits banner */}
        <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl ring-8 ring-slate-900/10">
           <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-black leading-tight">Link your ABHA with Insurance</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed max-w-sm">Dhanvantri automates your insurance claims by linking ABHA digital health records directly to your insurer.</p>
              <div className="flex gap-4 pt-2">
                 <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex-1 text-center">
                    <p className="text-2xl font-black mb-0.5">3X</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 uppercase">Faster Claims</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex-1 text-center">
                    <p className="text-2xl font-black mb-0.5">0%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 uppercase">Documentation</p>
                 </div>
              </div>
           </div>
           <Zap className="absolute -bottom-8 -right-8 w-64 h-64 opacity-10 rotate-12 text-yellow-500 fill-yellow-500" />
        </div>
      </div>
    </DashboardLayout>
  )
}
