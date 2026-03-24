"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Grid, ArrowLeft, Video, Image, PlusCircle, Save, ShieldCheck, Upload, Trash2, Send, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewPostPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push("/doctor/posts")
    }, 2000)
  }

  return (
    <DoctorLayout>
      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center p-8"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-medical-green rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(52,199,89,0.3)] mb-2">
                 <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center">
                 Insight <span className="text-medical-green">Published</span>
              </h1>
              <p className="text-white/60 font-bold text-center max-w-sm">Your health tip is now live on the global feed for all patients.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => router.back()} 
             className="p-3 bg-white border border-medical-grey/60 rounded-xl hover:bg-medical-grey transition-all shadow-sm"
           >
              <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">Studio Terminal</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Content Creation Hub</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Primary Creation Form */}
           <div className="lg:col-span-12 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-medical-grey/60 shadow-sm space-y-8">
                 <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-medical-grey/30 pb-6">
                    <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
                       <PlusCircle className="w-5 h-5 text-medical-green" /> Compose Health Update
                    </h3>
                    <div className="flex bg-medical-grey/30 p-1 rounded-2xl">
                       <button type="button" className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white shadow-sm text-medical-green transition-all">Health Clip</button>
                       <button type="button" className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-white/50 transition-all">Photo Insight</button>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Update Heading</label>
                       <Input required className="rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-black text-sm uppercase tracking-tight px-6" placeholder="e.g. 5 Signs of Pre-Hypertension" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">The Insight / Content</label>
                       <textarea className="w-full h-48 rounded-2xl bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-medium p-6 outline-none resize-none leading-relaxed" placeholder="Share professional medical advice or update here..."></textarea>
                    </div>
                 </div>
              </div>

              {/* Upload Media Section */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center gap-8 text-white relative overflow-hidden">
                 <div className="flex-1 space-y-2 text-center md:text-left">
                    <h4 className="text-xl font-black italic tracking-tighter uppercase text-medical-blue">Rich Media Engine</h4>
                    <p className="text-xs font-bold text-white/40 max-w-sm uppercase tracking-widest leading-relaxed">Add a vertical video (Clip) or image to increase engagement across the platform.</p>
                 </div>
                 <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center group cursor-pointer hover:border-medical-green hover:bg-white/10 transition-all">
                       <Upload className="w-10 h-10 mb-2 opacity-40 group-hover:text-medical-green group-hover:scale-110 transition-all" />
                       <span className="text-[9px] font-black opacity-30 uppercase">Browse Media</span>
                    </div>
                 </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 pb-20">
                 <Button variant="ghost" type="button" className="h-14 px-10 rounded-2xl text-[10px] uppercase font-black tracking-widest text-muted-foreground">Draft</Button>
                 <Button type="submit" className="h-16 px-14 rounded-2xl bg-medical-green hover:bg-medical-green/90 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-medical-green/20 transition-all group">
                    <Send className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" /> GO LIVE
                 </Button>
              </div>
           </div>
        </form>
      </div>
    </DoctorLayout>
  )
}
