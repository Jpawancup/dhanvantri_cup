"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Users, Search, Plus, Filter, MoreVertical, FileText, Calendar, Mail, Phone, ChevronRight, Activity, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const patients = [
  { id: 1, name: "Ramesh Kumar", age: 45, gender: "Male", lastVisit: "2 days ago", condition: "Hypertension", status: "Active Treatment", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" },
  { id: 2, name: "Sunita Devi", age: 38, gender: "Female", lastVisit: "1 week ago", condition: "Post-Op Recovery", status: "Follow-up", img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114" },
  { id: 3, name: "Arjun Singh", age: 62, gender: "Male", lastVisit: "Yesterday", condition: "Cardiovascular Check", status: "Critical Care", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
  { id: 4, name: "Priya Rao", age: 29, gender: "Female", lastVisit: "3 days ago", condition: "Routine Sync", status: "Stable", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4" },
]

export default function DoctorPatientsPage() {
  const router = useRouter()

  return (
    <DoctorLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
              <h1 className="text-3xl font-black flex items-center gap-3 italic">
                 <Users className="w-8 h-8 text-medical-green animate-pulse" /> My Patients
              </h1>
              <p className="text-sm font-bold text-muted-foreground opacity-60 uppercase tracking-widest text-[10px]">Patient Care Directory</p>
           </div>
           <Button onClick={() => router.push("/doctor/patients/new")} className="bg-medical-green hover:bg-medical-green/90 text-white rounded-2xl h-14 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-green/20">
              <Plus className="w-5 h-5 mr-2" /> New Patient Entry
           </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
           <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:text-medical-green transition-colors" />
              <Input className="pl-11 rounded-2xl bg-white border border-medical-grey/50 h-14 shadow-sm focus:ring-4 focus:ring-medical-green/10 transition-all font-medium text-sm" placeholder="Search by name, ID, or condition..." />
           </div>
           <button className="h-14 px-6 bg-white border border-medical-grey/50 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-medical-grey transition-all">
              <Filter className="w-4 h-4" /> Filters
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {patients.map((p, i) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/doctor/patients/${p.id}`)}
                className="bg-white rounded-[2rem] border border-medical-grey/60 p-6 hover:border-medical-green/40 hover:shadow-2xl hover:shadow-medical-green/5 transition-all group cursor-pointer relative overflow-hidden"
              >
                 <div className="flex items-start justify-between mb-4">
                    <img src={p.img} className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:scale-110 transition-transform" />
                    <div className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${p.status === "Critical Care" ? "bg-red-50 text-red-600 border-red-200" : "bg-medical-green/10 text-medical-green border-medical-green/20"}`}>
                       {p.status}
                    </div>
                 </div>
                 
                 <div className="space-y-1">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter">{p.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{p.gender} • {p.age} Years</p>
                 </div>

                 <div className="mt-4 pt-4 border-t border-dashed border-medical-grey/60 space-y-3">
                    <div className="flex items-center gap-2">
                       <Activity className="w-3.5 h-3.5 text-medical-blue" />
                       <span className="text-[10px] font-black uppercase tracking-tight opacity-70">Condition:</span>
                       <span className="text-[10px] font-black uppercase text-medical-blue">{p.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5 text-medical-green" />
                       <span className="text-[10px] font-black uppercase tracking-tight opacity-70">Last Visit:</span>
                       <span className="text-[10px] font-black uppercase">{p.lastVisit}</span>
                    </div>
                 </div>

                 <div className="mt-6 flex gap-2">
                    <button className="flex-1 bg-medical-grey/30 hover:bg-medical-green hover:text-white rounded-xl py-2.5 text-[9px] font-black uppercase tracking-widest transition-all">Report</button>
                    <button className="flex-1 bg-medical-grey/30 hover:bg-medical-blue hover:text-white rounded-xl py-2.5 text-[9px] font-black uppercase tracking-widest transition-all">Prescribe</button>
                 </div>

                 <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-medical-green" />
                 </div>
              </motion.div>
           ))}

           {/* Add New Placeholder */}
           <motion.div 
              onClick={() => router.push("/doctor/patients/new")}
              className="bg-medical-grey/10 rounded-[2rem] border-2 border-dashed border-medical-grey/60 flex flex-col items-center justify-center p-8 space-y-4 hover:bg-white hover:border-medical-green/40 transition-all group cursor-pointer aspect-square"
           >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform group-hover:text-medical-green"><Plus className="w-8 h-8" /></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">New Patient Onboarding</p>
           </motion.div>
        </div>
      </div>
    </DoctorLayout>
  )
}
