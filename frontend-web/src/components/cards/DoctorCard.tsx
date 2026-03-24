"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star, MapPin, Video, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface DoctorProps {
  doctor?: any
}

export default function DoctorCard({ doctor }: DoctorProps) {
  const router = useRouter()
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => router.push(doctor?.id ? `/doctors/${doctor.id}` : "/doctors/1")}
      className="w-full cursor-pointer"
    >
      <Card className="p-3 rounded-xl shadow-sm border-medical-grey/60 hover:border-medical-green/50 transition-colors bg-white">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={doctor?.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"}
              alt="Doctor Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${doctor?.available !== false ? 'bg-medical-green' : 'bg-medical-grey'}`} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base leading-tight truncate">{doctor?.name || "Dr. Sharma"}</h3>
            <p className="text-xs font-semibold text-medical-blue mt-0.5 truncate">{doctor?.specialization || "Cardiologist"}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 truncate uppercase tracking-widest font-black">{doctor?.experience || 10}+ years exp</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-yellow-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold">{doctor?.rating || 4.8}</span>
              <span className="text-muted-foreground ml-1 truncate">({doctor?.reviews || 120})</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-muted-foreground uppercase">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{doctor?.hospital || "Apollo Hospital"}, {doctor?.distance || "2km"}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3 pt-3 border-t border-medical-grey/40">
          <Button 
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              router.push("/book-appointment")
            }}
            className="flex-1 bg-medical-green hover:bg-medical-green/90 text-white rounded-full font-bold shadow-md shadow-medical-green/20 text-xs h-9 active:scale-95 transition-transform duration-200"
          >
            <Calendar className="w-3.5 h-3.5 mr-1" /> Book
          </Button>
          <Button 
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              router.push("/video-consultation")
            }}
            variant="outline" 
            className="flex-1 rounded-full border-medical-blue/40 text-medical-blue hover:bg-medical-blue/10 font-bold text-xs h-9 active:scale-95 transition-transform duration-200"
          >
            <Video className="w-3.5 h-3.5 mr-1" /> Call
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
