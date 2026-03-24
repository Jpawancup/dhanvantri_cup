"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Users, Building2, CalendarCheck, Pill, Microscope, Ambulance, History, ShieldCheck, HeartPulse, Settings, User, Rss } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileDrawerProps {
  customTrigger?: React.ReactNode;
}

export default function MobileDrawer({ customTrigger }: MobileDrawerProps = {}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isDoctor = pathname.startsWith('/doctor')
  const isAdmin = pathname.startsWith('/admin')
  const isHospital = pathname.startsWith('/hospital')
  
  const role = isHospital ? "hospital" : isDoctor ? "doctor" : isAdmin ? "admin" : "user"

  const userItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Doctors", href: "/doctors", icon: Users },
    { name: "Hospitals", href: "/hospitals", icon: Building2 },
    { name: "Appointments", href: "/appointments", icon: CalendarCheck },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const doctorItems = [
    { name: "Dashboard", href: "/doctor/dashboard", icon: Home },
    { name: "Appointments", href: "/doctor/appointments", icon: CalendarCheck },
    { name: "Patients", href: "/doctor/patients", icon: Users },
    { name: "Prescriptions", href: "/doctor/prescriptions", icon: Pill },
  ]

  const hospitalItems = [
    { name: "Dashboard", href: "/hospital/dashboard", icon: Home },
    { name: "Patients", href: "/hospital/patients", icon: Users },
    { name: "Doctors", href: "/hospital/doctors", icon: HeartPulse },
    { name: "Pharmacy", href: "/hospital/pharmacy", icon: Pill },
    { name: "Labs", href: "/hospital/labs", icon: Microscope },
    { name: "Ambulance", href: "/hospital/ambulance", icon: Ambulance },
    { name: "Reports", href: "/hospital/reports", icon: History },
  ]

  const adminItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Doctors", href: "/admin/doctors", icon: HeartPulse },
    { name: "Hospitals", href: "/admin/hospitals", icon: Building2 },
    { name: "System", href: "/admin/settings", icon: Settings },
  ]

  const menuItems = role === "user" ? userItems : role === "doctor" ? doctorItems : role === "hospital" ? hospitalItems : adminItems

  return (
    <>
      {customTrigger ? (
        <div onClick={() => setOpen(true)}>{customTrigger}</div>
      ) : (
        <button onClick={() => setOpen(true)} className="md:hidden p-2 -ml-2 text-foreground/70 hover:text-medical-green">
          <Menu className="w-6 h-6" />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-[90] md:hidden backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white z-[100] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                  <span className="font-bold text-xl text-medical-green italic">Dhanvantri</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 text-muted-foreground hover:text-medical-red rounded-full hover:bg-medical-red/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all font-bold",
                        isActive
                          ? "bg-medical-green text-white shadow-lg shadow-medical-green/20"
                          : "text-foreground/70 hover:bg-medical-grey hover:text-medical-green"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
