"use client"

import { Building2, Users, Microscope, Droplet, Ambulance, Pill } from "lucide-react"
import { motion } from "framer-motion"

import { useRouter } from "next/navigation"

export default function HealthcareActions() {
  const router = useRouter()
  const actions = [
    { id: 1, name: "Find Doctor", icon: Users, color: "text-medical-blue", bg: "bg-medical-blue/10", href: "/doctors" },
    { id: 2, name: "Hospitals", icon: Building2, color: "text-medical-green", bg: "bg-medical-green/10", href: "/hospitals" },
    { id: 3, name: "Diagnostics", icon: Microscope, color: "text-medical-blue", bg: "bg-medical-blue/10", href: "/diagnostics" },
    { id: 4, name: "Blood Bank", icon: Droplet, color: "text-medical-red", bg: "bg-medical-red/10", href: "/blood" },
    { id: 5, name: "Ambulance", icon: Ambulance, color: "text-medical-red", bg: "bg-medical-red/10", href: "/ambulance" },
    { id: 6, name: "Pharmacy", icon: Pill, color: "text-medical-green", bg: "bg-medical-green/10", href: "/medicine" },
  ]

  return (
    <div className="bg-white p-4 py-4 md:py-6 border-b shadow-sm w-full md:rounded-3xl">
      <div className="mb-4 flex items-center justify-between px-2">
        <h3 className="font-semibold text-foreground/80 tracking-tight">Healthcare Services</h3>
        <span className="text-xs text-medical-green font-bold cursor-pointer uppercase tracking-widest">View All</span>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-2 w-full place-items-center">
        {actions.map((action) => (
          <motion.div 
            key={action.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(action.href)}
            className="flex flex-col items-center gap-1.5 md:gap-2 cursor-pointer w-full group"
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
              <action.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-center text-foreground/80 leading-tight group-hover:text-medical-green transition-colors uppercase tracking-widest break-words w-full px-1">
              {action.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
