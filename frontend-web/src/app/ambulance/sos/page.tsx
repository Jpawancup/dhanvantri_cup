"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ShieldCheck, Activity, Phone, ArrowLeft, HeartPulse, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SOSPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [sosSent, setSosSent] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !sosSent) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !sosSent) {
      setSosSent(true)
    }
  }, [countdown, sosSent])

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 relative overflow-hidden bg-slate-900">
        <Button 
          variant="outline" 
          onClick={() => router.back()} 
          className="absolute top-6 left-6 rounded-full text-white border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Cancel SOS
        </Button>

        <AnimatePresence mode="wait">
          {!sosSent ? (
            <motion.div 
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              className="flex flex-col items-center gap-6 z-10"
            >
              <div className="relative">
                <div className="w-48 h-48 bg-medical-red rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,59,48,0.5)]">
                  <span className="text-8xl font-black text-white">{countdown}</span>
                </div>
                <div className="absolute inset-0 bg-medical-red rounded-full animate-ping opacity-50" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center mt-4">
                Broadcasting<br/>Distress Signal
              </h1>
              <p className="text-white/60 font-bold text-center max-w-sm">
                Sending your exact coordinates to all nearby ambulances and hospitals...
              </p>
              <Button 
                onClick={() => setSosSent(true)}
                className="bg-white hover:bg-white/90 text-medical-red rounded-full h-14 px-8 font-black tracking-widest mt-4"
              >
                SEND NOW
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 z-10 w-full max-w-md"
            >
              <div className="w-24 h-24 bg-medical-green rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(52,199,89,0.3)] mb-2">
                 <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center">
                Help is <span className="text-medical-green">Dispatched</span>
              </h1>
              
              <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 mt-4 space-y-4">
                 <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                       <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <p className="text-xs font-bold uppercase tracking-widest text-white/60">Estimated Time</p>
                       <p className="text-xl font-black text-white">4 Mins Away</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-medical-blue/20 rounded-full flex items-center justify-center">
                       <MapPin className="w-6 h-6 text-medical-blue" />
                    </div>
                    <div>
                       <p className="text-xs font-bold uppercase tracking-widest text-white/60">Ambulance Location</p>
                       <p className="text-sm font-bold text-white">0.8 km away • Approaching</p>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex gap-4 w-full">
                 <Button onClick={() => window.location.href="tel:108"} className="flex-1 bg-medical-red hover:bg-medical-red/90 h-14 rounded-full font-black tracking-widest">
                    <Phone className="w-5 h-5 mr-2" /> CALL DRIVER
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Activity className="absolute -bottom-20 -right-20 w-[400px] h-[400px] text-medical-red opacity-10" />
      </div>
    </DashboardLayout>
  )
}
