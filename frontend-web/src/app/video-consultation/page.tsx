"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, MoreVertical, User, ShieldCheck, Activity, Maximize2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function VideoConsultationPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-medical-grey/20">
        {/* Main Video Area */}
        <div className="flex-1 bg-slate-900 rounded-[2.5rem] relative overflow-hidden shadow-2xl ring-8 ring-slate-900/5 group">
           {/* Doctor Video (Main) */}
           <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" 
            alt="Doctor Video" 
           />
           
           {/* Patient Video (PIP) */}
           <div className="absolute top-6 right-6 w-32 md:w-48 aspect-video rounded-2xl bg-black border-2 border-white/20 shadow-2xl overflow-hidden ring-4 ring-black/10">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300" 
                className="w-full h-full object-cover" 
                alt="Your Video" 
              />
              <div className="absolute bottom-2 left-2 flex gap-1">
                 <div className="w-1 h-3 bg-medical-green rounded-full animate-pulse" />
                 <div className="w-1 h-2 bg-medical-green rounded-full animate-pulse delay-75" />
                 <div className="w-1 h-3 bg-medical-green rounded-full animate-pulse delay-150" />
              </div>
           </div>

           {/* Call Info Overlay */}
           <div className="absolute top-6 left-6 space-y-1 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-medical-red animate-ping" /> LIVE: Dr. Amit Sharma
              </h2>
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">Cardiology Consultation • 12:45 remaining</p>
           </div>

           {/* Controls Bar */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-3xl px-8 py-5 rounded-[2rem] border border-white/20 shadow-2xl">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? "bg-medical-red text-white" : "bg-white text-slate-900 hover:scale-110"}`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isVideoOff ? "bg-medical-red text-white" : "bg-white text-slate-900 hover:scale-110"}`}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>
              <button onClick={() => router.back()} className="w-20 h-16 rounded-[2rem] bg-medical-red text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-medical-red/30">
                 <PhoneOff className="w-8 h-8 font-black" />
              </button>
              <button className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-all">
                 <MessageSquare className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-all">
                 <Settings className="w-6 h-6" />
              </button>
           </div>
        </div>

        {/* Sidebar Panel (Stats/Notes) */}
        <div className="w-full md:w-80 space-y-4 flex flex-col">
           <div className="bg-white rounded-3xl p-6 border border-medical-grey/60 shadow-sm flex-1 space-y-6 overflow-y-auto scrollbar-hide">
              <div className="space-y-1">
                 <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground opacity-60">Session Vitals</h3>
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { l: "Heart Rate", v: "72 bpm", c: "text-medical-red", i: Activity },
                      { l: "Oxygen", v: "98%", c: "text-medical-blue", i: ShieldCheck }
                    ].map(s => (
                       <div key={s.l} className="bg-medical-grey/30 p-3 rounded-2xl space-y-1">
                          <s.i className={`w-4 h-4 ${s.c}`} />
                          <p className="text-sm font-black tracking-tighter">{s.v}</p>
                          <p className="text-[8px] font-bold uppercase text-muted-foreground opacity-60">{s.l}</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground opacity-60">Doctor&apos;s Real-time Notes</h3>
                 <div className="space-y-3">
                    {[
                      "Check for breathing difficulty during sleep.",
                      "Keep monitoring BP three times daily.",
                      "Avoid high sodium diet starting today."
                    ].map((note, i) => (
                      <div key={i} className="flex gap-3 text-xs font-medium leading-relaxed bg-medical-green/5 border border-medical-green/20 p-3 rounded-xl border-dashed">
                        <div className="w-5 h-5 bg-medical-green text-white rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black">{i+1}</div>
                        {note}
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="pt-4 mt-auto">
                 <Button className="w-full bg-medical-blue hover:bg-medical-blue/90 text-white rounded-full h-14 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-blue/20">VIEW MEDICAL HISTORY</Button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
