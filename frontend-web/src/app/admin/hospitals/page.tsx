"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { Building2, Plus, Search, MapPin, CheckCircle2, MoreVertical, Server, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import { getData } from "@/services/localDb"

export default function AdminHospitalsPage() {
  const [hospitals, setHospitals] = useState<any[]>([])
  
  useEffect(() => {
    setHospitals(getData("hospitals") || [])
  }, [])

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 tracking-tighter">
             <h1 className="text-3xl font-black flex items-center gap-3">
                <Building2 className="w-8 h-8 text-medical-blue animate-pulse" /> Healthcare Partners
             </h1>
             <p className="text-sm font-bold text-muted-foreground opacity-60">Manage hospital infrastructure and onboarding.</p>
          </div>
          <div className="flex items-center gap-2">
             <Link href="/admin/hospitals/infrastructure">
               <Button variant="outline" className="rounded-full border-medical-grey h-12 px-6 font-black text-xs uppercase tracking-widest shadow-sm">Manage Infrastructure</Button>
             </Link>
             <Link href="/admin/hospitals/add">
               <Button className="bg-medical-blue hover:bg-medical-blue/90 text-white rounded-full h-12 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-blue/20">Onboard Partner</Button>
             </Link>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-xl overflow-hidden relative group p-6">
           <div className="flex items-center gap-4 mb-6">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                <Input className="pl-11 rounded-3xl bg-slate-50 border-none h-12 shadow-sm font-medium text-sm" placeholder="Search hospitals..." />
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {hospitals.map(h => (
               <Link href={`/admin/hospitals/${h.id}`} key={h.id}>
                 <motion.div whileHover={{ scale: 1.02 }} className="border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-medical-blue/30 transition-all cursor-pointer bg-white">
                   <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue overflow-hidden">
                         {h.images && h.images.length > 0 ? (
                            <img src={h.images[0]} alt="" className="w-full h-full object-cover" />
                         ) : (
                            <Building2 className="w-6 h-6" />
                         )}
                       </div>
                       <div>
                         <h3 className="font-black text-lg">{h.name}</h3>
                         <p className="text-xs font-bold text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {h.location}</p>
                       </div>
                     </div>
                     <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase px-3 py-1 rounded-full">{h.status || "Verified"}</span>
                   </div>
                   <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                       <Server className="w-4 h-4" /> {h.bedsAvailable} Auto-Synced Beds
                     </div>
                     <ChevronRight className="w-5 h-5 text-medical-blue" />
                   </div>
                 </motion.div>
               </Link>
             ))}
           </div>
        </div>
      </div>
    </AdminLayout>
  )
}
