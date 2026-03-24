"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { ArrowLeft, User, Calendar, Mail, Phone, Activity, FileText, ChevronRight, History, ShieldCheck, Star, Edit3, HeartPulse, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"

export default function PatientDetailPage() {
  const router = useRouter()
  const params = useParams()
  
  const patient = {
    id: params.id,
    name: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    lastVisit: "2 days ago",
    condition: "Hypertension",
    status: "Active Treatment",
    phone: "+91 99887 66554",
    email: "ramesh.kumar@gmail.com",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  }

  const visitHistory = [
    { date: "15 Mar", time: "10:30 AM", type: "Video Call", reason: "Follow-up for meds", status: "Completed" },
    { date: "02 Mar", time: "05:00 PM", type: "In-Person", reason: "Severe Headache", status: "Completed" },
    { date: "12 Feb", time: "09:15 AM", type: "Video Call", reason: "Consultation Request", status: "Completed" },
  ]

  return (
    <DoctorLayout>
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-3 bg-white border border-medical-grey/60 rounded-xl hover:bg-medical-grey transition-all shadow-sm">
                 <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                 <h1 className="text-2xl font-black italic tracking-tighter">Medical Profile</h1>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">ID: #PAT-{patient.id}0023</p>
              </div>
           </div>
           <div className="flex gap-2">
              <Button variant="outline" className="rounded-2xl border-medical-grey px-6 h-12 font-black uppercase text-xs tracking-widest"><Edit3 className="w-4 h-4 mr-2" /> Note</Button>
              <Button className="rounded-2xl bg-medical-green hover:bg-medical-green/90 text-white px-8 h-12 font-black uppercase text-xs tracking-widest shadow-xl shadow-medical-green/20">Prescribe</Button>
           </div>
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-[2.5rem] border border-medical-grey/60 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
           <div className="relative flex-shrink-0">
              <img src={patient.img} className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] object-cover border-4 border-medical-grey/40 shadow-2xl" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-medical-blue rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-xl">
                 <ShieldCheck className="w-5 h-5" />
              </div>
           </div>
           <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-1">
                 <h2 className="text-4xl font-black italic tracking-tighter uppercase">{patient.name}</h2>
                 <p className="text-sm font-black text-medical-green uppercase tracking-[0.2em]">{patient.condition} • {patient.status}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                 <span className="flex items-center gap-2 text-xs font-bold opacity-60 bg-medical-grey/30 px-4 py-2 rounded-2xl"><User className="w-3.5 h-3.5" /> {patient.gender}, {patient.age}</span>
                 <span className="flex items-center gap-2 text-xs font-bold opacity-60 bg-medical-grey/30 px-4 py-2 rounded-2xl"><Phone className="w-3.5 h-3.5" /> {patient.phone}</span>
                 <span className="flex items-center gap-2 text-xs font-bold opacity-60 bg-medical-grey/30 px-4 py-2 rounded-2xl"><Mail className="w-3.5 h-3.5" /> {patient.email}</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Timeline History */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-medical-grey/60 shadow-sm space-y-8">
                 <h3 className="font-extrabold text-lg uppercase tracking-widest flex items-center gap-3">
                    <History className="w-6 h-6 text-medical-green" /> Consultation History
                 </h3>
                 <div className="space-y-6 relative ml-4 border-l-2 border-dashed border-medical-grey/60 pl-8">
                    {visitHistory.map((v, i) => (
                       <div key={i} className="relative group">
                          <div className="absolute -left-11 top-1 w-6 h-6 bg-white border-4 border-medical-green rounded-full shadow-[0_0_15px_#34c759] z-10 group-hover:scale-125 transition-transform" />
                          <div className="bg-medical-grey/20 p-5 rounded-2xl border border-medical-grey/40 hover:bg-white hover:shadow-xl hover:border-medical-green transition-all cursor-pointer">
                             <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase text-medical-green tracking-widest">{v.date} • {v.time}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest bg-medical-green text-white px-2 py-0.5 rounded-full">{v.status}</span>
                             </div>
                             <h4 className="font-black text-sm uppercase tracking-tight mb-1">{v.reason}</h4>
                             <p className="text-[10px] font-black text-muted-foreground opacity-60 uppercase">{v.type} Consultation</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Metrics Sidebar */}
           <aside className="space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl text-white">
                 <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-6 italic">Vital Bio-Metrics</h3>
                 <div className="space-y-6">
                    {[
                      { label: "Blood Pressure", val: "124/85", unit: "mmHg", color: "text-medical-blue" },
                      { label: "Heart Rate", val: "72", unit: "bpm", color: "text-medical-pink" },
                      { label: "Sugar Level", val: "105", unit: "mg/dL", color: "text-amber-500" },
                      { label: "SpO2 Oxygen", val: "99", unit: "Percent", color: "text-medical-green" }
                    ].map((m, i) => (
                      <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                         <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{m.label}</span>
                         <div className="text-right">
                           <p className={`text-xl font-black ${m.color} tracking-tighter leading-none`}>{m.val}</p>
                           <p className="text-[8px] font-bold opacity-30 uppercase mt-1">{m.unit}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-medical-green/5 rounded-[2.5rem] p-8 border border-medical-green/20">
                 <h3 className="font-black text-sm uppercase tracking-widest text-medical-green mb-4 italic">Next Step</h3>
                 <p className="text-xs font-bold text-medical-green/60 mb-6">Patient requires a standard BP checkup every month.</p>
                 <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-2xl h-12 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-medical-green/20">Schedule Checkup</Button>
              </div>
           </aside>
        </div>
      </div>
    </DoctorLayout>
  )
}
