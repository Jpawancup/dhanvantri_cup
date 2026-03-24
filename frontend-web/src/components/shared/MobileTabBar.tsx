"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home, Rss, Video, PlusCircle, CalendarCheck,
  Users, Pill, Microscope, Building2,
  LayoutDashboard, ClipboardList, HeartPulse, Settings
} from "lucide-react"
import { useMockStore } from "@/store/mockStore"

// Role-specific tab definitions
const patientTabs = [
  { name: "Home",     href: "/dashboard",        icon: Home },
  { name: "Feed",     href: "/feed",             icon: Rss },
  { name: "Clips",    href: "/clips",            icon: Video },
  { name: "Create",   href: "/create",           icon: PlusCircle },
  { name: "Appts",    href: "/appointments",     icon: CalendarCheck },
]

const doctorTabs = [
  { name: "Home",     href: "/doctor/dashboard",      icon: Home },
  { name: "Appts",    href: "/doctor/appointments",   icon: CalendarCheck },
  { name: "Patients", href: "/doctor/patients",       icon: Users },
  { name: "Rx",       href: "/doctor/prescriptions",  icon: Pill },
  { name: "Feed",     href: "/feed",                  icon: Rss },
]

const adminTabs = [
  { name: "Home",      href: "/admin/dashboard",  icon: Home },
  { name: "Users",     href: "/admin/users",      icon: Users },
  { name: "Doctors",   href: "/admin/doctors",    icon: HeartPulse },
  { name: "Hospitals", href: "/admin/hospitals",  icon: Building2 },
  { name: "Settings",  href: "/admin/settings",   icon: Settings },
]

const hospitalTabs = [
  { name: "Home",      href: "/hospital/dashboard",    icon: Home },
  { name: "Patients",  href: "/hospital/patients",     icon: Users },
  { name: "Appts",     href: "/hospital/appointments", icon: CalendarCheck },
  { name: "Labs",      href: "/hospital/labs",         icon: Microscope },
  { name: "Pharmacy",  href: "/hospital/pharmacy",     icon: Pill },
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const { currentUser } = useMockStore()

  // Determine tabs from actual current user role
  const role = currentUser?.role || "patient"
  const tabs =
    role === "doctor"   ? doctorTabs :
    role === "admin"    ? adminTabs  :
    role === "hospital" ? hospitalTabs :
                          patientTabs

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/80 z-[200] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div
        className="flex justify-around items-end px-1"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)", height: "calc(60px + env(safe-area-inset-bottom))" }}
      >
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full py-2 relative transition-all duration-200 active:scale-90",
                isActive ? "text-medical-green" : "text-slate-400"
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-medical-green rounded-full" />
              )}
              <tab.icon
                className={cn(
                  "transition-all duration-200",
                  isActive ? "w-6 h-6 stroke-[2.5]" : "w-5 h-5 stroke-[1.8]"
                )}
              />
              <span
                className={cn(
                  "text-[9px] font-black uppercase tracking-wider leading-none",
                  isActive ? "text-medical-green" : "text-slate-400"
                )}
              >
                {tab.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
