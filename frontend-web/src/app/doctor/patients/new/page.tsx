"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Users, Save, ShieldCheck, ArrowLeft, User, Phone, Mail, MapPin, Calendar, Activity, Upload, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewPatientPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push("/doctor/patients")
    }, 2000)
  }

  return (
    <DoctorLayout>
      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-medical-green rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(52,199,89,0.3)] mb-2">
                 <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center">
                 Patient <span className="text-medical-green">Onboarded</span>
              </h1>
              <p className="text-white/60 font-bold text-center max-w-sm">Saving medical records and generating unique Patient ID...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()} 
                className="p-3 bg-white border border-medical-grey/60 rounded-xl hover:bg-medical-grey transition-all"
              >
                 <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                 <h1 className="text-2xl font-black italic tracking-tighter">New Patient Entry</h1>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Medical Record Management</p>
              </div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Left Section: Personal Info */}
           <div className="space-y-8">
              <div className="bg-white rounded-[2rem] p-8 border border-medical-grey/60 shadow-sm space-y-6">
                 <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
                    <User className="w-5 h-5 text-medical-blue" /> Personal Identity
                 </h3>
                 <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Full Patient Name</label>
                       <Input required className="rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold px-5" placeholder="e.g. Rahul Verma" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Age</label>
                           <Input required type="number" className="rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold px-5" placeholder="e.g. 24" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Gender</label>
                           <select className="w-full h-14 rounded-2xl bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold px-5 outline-none appearance-none cursor-pointer">
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                           </select>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-medical-grey/60 shadow-sm space-y-6">
                 <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-5 h-5 text-medical-green" /> Contact Details
                 </h3>
                 <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Primary Phone</label>
                       <Input required className="rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold px-5" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Email Address</label>
                       <Input className="rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold px-5" placeholder="patient@example.com" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Section: Clinical Info */}
           <div className="space-y-8">
              <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-xl space-y-6 text-white">
                 <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2 opacity-60">
                    <Activity className="w-5 h-5 text-medical-blue" /> Clinical Status
                 </h3>
                 <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-white/40 ml-1">Primary Concern / condition</label>
                       <Input required className="rounded-2xl h-14 bg-white/10 border-white/10 focus:bg-white/20 transition-all font-bold px-5 text-white" placeholder="e.g. Severe Chest Pain" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-white/40 ml-1">Initial Health Status</label>
                       <select className="w-full h-14 rounded-2xl bg-white/10 border-white/10 focus:bg-white/20 transition-all font-bold px-5 outline-none appearance-none cursor-pointer">
                          <option className="bg-slate-900">Stable</option>
                          <option className="bg-slate-900">Follow-up Required</option>
                          <option className="bg-slate-900">Critical Care</option>
                          <option className="bg-slate-900">Under Observation</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="bg-white/30 rounded-[2rem] p-8 border border-dashed border-medical-grey shadow-sm space-y-6 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg"><Upload className="w-8 h-8 text-medical-green" /></div>
                 <div>
                    <h4 className="font-black text-sm uppercase tracking-widest">Medical History PDF</h4>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 px-4">Upload previous prescriptions, blood tests or surgical reports.</p>
                 </div>
                 <button type="button" className="text-[10px] font-black uppercase text-medical-blue border-b-2 border-medical-blue/30 pb-0.5 mt-2">Browse Files</button>
              </div>

              <Button type="submit" className="w-full h-16 rounded-[1.5rem] bg-slate-900 hover:bg-medical-green text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all">
                 <Save className="w-5 h-5 mr-3" /> Save Medical Record
              </Button>
           </div>
        </form>
      </div>
    </DoctorLayout>
  )
}
