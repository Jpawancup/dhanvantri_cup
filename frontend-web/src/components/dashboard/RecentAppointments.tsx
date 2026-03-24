"use client"

import { motion } from "framer-motion"
import { appointments } from "@/services/mockData"
import { CalendarCheck, Video, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RecentAppointments() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-medical-grey/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-medical-green" />
          Upcoming Appointments
        </h3>
        <span className="text-sm text-medical-green font-medium cursor-pointer">View All</span>
      </div>

      <div className="flex flex-col gap-3">
        {appointments.map((apt, idx) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="flex items-center gap-4 p-3 rounded-xl border border-medical-grey/60 hover:border-medical-green/40 transition-colors bg-white hover:bg-medical-green/5"
          >
            <img src={apt.image} alt={apt.doctor} className="w-12 h-12 rounded-full object-cover border shadow-sm" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{apt.doctor}</p>
              <p className="text-xs text-muted-foreground">{apt.specialization}</p>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className="flex items-center gap-1 text-medical-blue">
                  <Clock className="w-3 h-3" /> {apt.date} • {apt.time}
                </span>
                <span className={`flex items-center gap-1 ${apt.type === "Video" ? "text-medical-green" : "text-muted-foreground"}`}>
                  {apt.type === "Video" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />} {apt.type}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${apt.status === "confirmed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                {apt.status}
              </span>
              {apt.status === "confirmed" && apt.type === "Video" && (
                <Button size="sm" className="h-7 text-xs bg-medical-green hover:bg-medical-green/90 text-white rounded-full px-3">Join</Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
