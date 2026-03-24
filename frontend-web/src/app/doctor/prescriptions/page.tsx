"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Pill, Plus, Search, FileText, CheckCircle2, Clock, Eye, Download, Edit3, Share2, ClipboardList, Thermometer, Wind, Activity, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const recentPrescriptions = [
  { id: 1, patient: "Ramesh Kumar", date: "Today", diagnosis: "Viral Fever", meds: 3, status: "Digital", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" },
  { id: 2, patient: "Sunita Devi", date: "Yesterday", diagnosis: "Post-Op Recovery", meds: 5, status: "Digital", img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114" },
  { id: 3, patient: "Arjun Singh", date: "2 Mar", diagnosis: "Hyperlipidemia", meds: 2, status: "Sent to Pharmacy", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
]

const templates = [
  { name: "General Fever Template", icon: Thermometer, color: "bg-medical-blue/10 text-medical-blue", type: "fever" },
  { name: "Cough & Cold Template", icon: Wind, color: "bg-medical-green/10 text-medical-green", type: "cold" },
  { name: "Hypertension Template", icon: Activity, color: "bg-medical-pink/10 text-medical-pink", type: "bp" },
  { name: "Post-Surgery Template", icon: Zap, color: "bg-amber-100 text-amber-600", type: "surgery" },
]

export default function DoctorPrescriptionsPage() {
  const router = useRouter()

  return (
    <DoctorLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
              <h1 className="text-3xl font-black flex items-center gap-3 italic">
                 <Pill className="w-8 h-8 text-medical-green animate-pulse" /> Rx Terminal
              </h1>
              <p className="text-sm font-bold text-muted-foreground opacity-60 uppercase tracking-widest text-[10px]">Cloud Pharmacy Connector</p>
           </div>
           <Button onClick={() => router.push("/doctor/prescriptions/new")} className="bg-medical-green hover:bg-medical-green/90 text-white rounded-2xl h-14 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-green/20">
              <Plus className="w-5 h-5 mr-2" /> Create New Rx
           </Button>
        </div>

        {/* Templates area */}
        <div className="space-y-4">
           <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Speed Templates</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map(t => (
                 <div 
                   key={t.name} 
                   onClick={() => router.push(`/doctor/prescriptions/new?template=${t.type}`)}
                   className="bg-white border border-medical-grey/50 p-5 rounded-[2rem] flex items-center gap-4 hover:border-medical-green/40 hover:shadow-xl hover:shadow-medical-green/5 transition-all group cursor-pointer"
                 >
                    <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                       <t.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-extrabold text-[10px] uppercase tracking-widest leading-tight">{t.name}</h4>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Recent Digital Prescriptions</h3>
           </div>
           
           <div className="space-y-3">
              {recentPrescriptions.map((r, i) => (
                 <motion.div 
                   key={r.id} 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="bg-white rounded-[1.75rem] border border-medical-grey/60 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-medical-green/40 transition-all group"
                 >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                       <img src={r.img} alt={r.patient} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md group-hover:rotate-6 transition-transform" />
                       <div className="flex-1 min-w-0">
                          <h4 className="font-black text-sm uppercase tracking-tight">{r.patient}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{r.date}</span>
                             <span className="text-[9px] font-black uppercase tracking-widest text-medical-blue bg-medical-blue/10 px-2 py-0.5 rounded-full">{r.diagnosis}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-dashed border-medical-grey/60 pt-4 md:pt-0 md:pl-6">
                       <div className="flex-shrink-0 text-center px-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 mb-0.5">Medications</p>
                          <p className="text-lg font-black text-foreground">{r.meds}</p>
                       </div>
                       
                       <div className="flex gap-2">
                          <button onClick={() => router.push(`/doctor/prescriptions/new?edit=${r.id}`)} className="w-12 h-12 rounded-2xl border border-medical-grey hover:border-medical-pink hover:bg-medical-pink/5 flex items-center justify-center text-muted-foreground hover:text-medical-pink transition-all group/btn">
                             <Edit3 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button className="w-12 h-12 rounded-2xl border border-medical-grey hover:border-medical-blue hover:bg-medical-blue/5 flex items-center justify-center text-muted-foreground hover:text-medical-blue transition-all group/btn">
                             <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button className="w-12 h-12 rounded-2xl border border-medical-grey hover:border-medical-green hover:bg-medical-green/5 flex items-center justify-center text-muted-foreground hover:text-medical-green transition-all group/btn">
                             <Share2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </div>
    </DoctorLayout>
  )
}
