"use client"

import { motion } from "framer-motion"
import { useMockStore } from "@/store/mockStore"
import { CalendarCheck, Video, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RecentAppointments() {
  const { appointments } = useMockStore()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-medical-grey/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-medical-green" />
          Upcoming Appointments
        </h3>
        <Link href="/appointments">
          <span className="text-sm text-medical-green font-medium cursor-pointer hover:underline">View All</span>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {appointments.slice(0, 3).map((apt, idx) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="flex items-center gap-4 p-3 rounded-xl border border-medical-grey/60 hover:border-medical-green/40 transition-colors bg-white hover:bg-medical-green/5"
          >
            <img src={apt.image} alt={apt.doctor} className="w-12 h-12 rounded-full object-cover border shadow-sm flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{apt.doctor}</p>
              <p className="text-xs text-muted-foreground">{apt.specialization}</p>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className="flex items-center gap-1 text-medical-blue">
                  <Clock className="w-3 h-3" /> {apt.date} · {apt.time}
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
        {appointments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarCheck className="w-10 h-10 mx-auto mb-2 opacity-20" />
            <p className="text-sm font-medium">No upcoming appointments</p>
            <Link href="/book-appointment">
              <span className="text-xs text-medical-green font-bold cursor-pointer hover:underline">Book one now</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
