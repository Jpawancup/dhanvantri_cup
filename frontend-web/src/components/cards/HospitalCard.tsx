"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Phone, Hospital, Bed, ShieldCheck, ChevronRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface HospitalProps {
  hospital?: any
}

export default function HospitalCard({ hospital }: HospitalProps) {
  const router = useRouter()
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => router.push(hospital?.id ? `/hospitals/${hospital.id}` : "/hospitals/1")}
      className="w-full cursor-pointer group"
    >
      <Card className="rounded-2xl overflow-hidden shadow-sm border-medical-grey/60 hover:border-medical-blue/50 transition-all hover:shadow-xl hover:shadow-medical-blue/10 bg-white">
        <div className="h-32 md:h-40 bg-medical-grey relative overflow-hidden">
          <img 
            src={hospital?.image || "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"}
            alt="Hospital Exterior"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-[10px] font-black text-medical-green flex items-center gap-1.5 uppercase tracking-wider border border-white/50">
            <ShieldCheck className="w-3 h-3" /> NABL Accredited
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-white">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-90">{hospital?.type || "Multi-Specialty"}</span>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <div className="min-w-0 pr-2">
              <h3 className="font-black text-base md:text-lg leading-tight truncate text-foreground group-hover:text-medical-blue transition-colors">{hospital?.name || "Apollo Hospital"}</h3>
              <p className="text-[10px] md:text-xs font-bold text-muted-foreground flex items-center gap-1 mt-1 truncate uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-medical-red flex-shrink-0" /> {hospital?.distance || "3.5 km"} away • {hospital?.city || "Bangalore"}
              </p>
            </div>
            <div className="bg-medical-green text-white px-2.5 py-1.5 rounded-xl flex flex-col items-center flex-shrink-0 shadow-lg shadow-medical-green/20 border border-white/20">
              <div className="flex items-center gap-1">
                 <span className="text-sm font-black leading-none">{hospital?.rating || 4.5}</span>
                 <Star className="w-3 h-3 fill-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 md:py-3 border-y border-dashed border-medical-grey/60 mb-3 md:mb-4">
            <div className="flex items-center gap-1.5 text-foreground/80 overflow-hidden">
               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                  <Hospital className="w-3 h-3 md:w-4 md:h-4" />
               </div>
               <span className="text-[10px] md:text-xs font-bold truncate tracking-widest uppercase">{hospital?.specialties || "24+ Specialties"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground/80 overflow-hidden">
               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-medical-red/10 flex items-center justify-center text-medical-red">
                  <Bed className="w-3 h-3 md:w-4 md:h-4" />
               </div>
               <span className="text-[10px] md:text-xs font-bold truncate tracking-widest uppercase">{hospital?.bedsAvailable !== undefined ? hospital.bedsAvailable : 45} Beds Free</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                router.push(hospital?.id ? `/hospitals/${hospital.id}` : "/hospitals/1")
              }}
              className="flex-1 bg-medical-blue hover:bg-medical-blue/90 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-medical-blue/20 h-10 md:h-11 active:scale-95 transition-transform duration-200"
            >
              View Profile
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = `tel:${hospital?.phone || "+918000000000"}`
              }}
              variant="outline" 
              className="flex-none rounded-full border-medical-grey/60 text-foreground px-4 hover:bg-medical-grey hover:border-medical-blue/30 h-10 md:h-11 active:scale-95 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
