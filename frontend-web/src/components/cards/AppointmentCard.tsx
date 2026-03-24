"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Video } from "lucide-react"

import { useRouter } from "next/navigation"

export default function AppointmentCard() {
  const router = useRouter()
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full"
    >
      <Card className="rounded-xl overflow-hidden shadow-sm border-medical-grey/60 hover:border-medical-green/40 transition-colors p-3 md:p-5 relative bg-white flex flex-col gap-3 md:gap-4">
        <div className="flex flex-wrap justify-between items-start border-b border-medical-grey/40 pb-3 md:pb-4 gap-2">
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-medium">
            <div className="flex items-center text-medical-green bg-medical-green/10 rounded-full px-2 py-1 md:px-3 gap-1 md:gap-1.5 font-bold">
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="leading-none mt-0.5">Oct 24, 2024</span>
            </div>
            <div className="flex items-center text-medical-blue bg-medical-blue/10 rounded-full px-2 py-1 md:px-3 gap-1 md:gap-1.5 font-bold">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="leading-none mt-0.5">10:30 AM</span>
            </div>
          </div>
          <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-md">Confirmed</span>
        </div>

        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
            alt="Doctor profile"
            className="w-14 h-14 rounded-full border shadow-sm object-cover"
          />
          <div>
            <h4 className="font-semibold text-base leading-tight">Dr. Amit Sharma</h4>
            <p className="text-sm text-muted-foreground mt-0.5">General Physician</p>
            <div className="flex items-center gap-1.5 text-xs text-medical-blue mt-1">
              <Video className="w-3.5 h-3.5" />
              <span>Video Consultation</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 md:gap-3 mt-1 md:mt-2">
          <Button 
            onClick={() => router.push("/book-appointment")}
            variant="outline" 
            className="flex-1 rounded-full text-xs md:text-sm font-black uppercase tracking-widest border-medical-grey/60 hover:bg-medical-grey active:scale-95 transition-all duration-200 h-9 md:h-10"
          >
            Reschedule
          </Button>
          <Button 
            onClick={() => router.push("/video-consultation")}
            className="flex-1 rounded-full text-xs md:text-sm font-black uppercase tracking-widest bg-medical-green hover:bg-medical-green/90 text-white shadow-md shadow-medical-green/20 active:scale-95 transition-all duration-200 h-9 md:h-10"
          >
            Join Call
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
