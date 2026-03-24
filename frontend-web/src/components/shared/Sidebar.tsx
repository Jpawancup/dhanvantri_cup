"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Rss, 
  Video, 
  History, 
  Users, 
  Building2, 
  Microscope, 
  Droplet, 
  Ambulance, 
  Pill, 
  CalendarCheck, 
  MessageSquare, 
  User,
  Settings,
  HeartPulse
} from "lucide-react"

type RoleProps = {
  role?: "user" | "doctor" | "admin" | "hospital"
}

export default function Sidebar({ role = "user" }: RoleProps) {
  const pathname = usePathname()

  const userItems = [
    { name: "Home Dashboard", href: "/dashboard", icon: Home },
    { name: "Social Feed", href: "/feed", icon: Rss },
    { name: "Reels / Clips", href: "/clips", icon: Video },
    { name: "Moments", href: "/moments", icon: History },
    { name: "Find Doctors", href: "/doctors", icon: Users },
    { name: "Hospitals", href: "/hospitals", icon: Building2 },
    { name: "Diagnostics", href: "/diagnostics", icon: Microscope },
    { name: "Blood Centers", href: "/blood", icon: Droplet },
    { name: "Ambulance", href: "/ambulance", icon: Ambulance },
    { name: "Pharmacy", href: "/medicine", icon: Pill },
    { name: "My Appointments", href: "/appointments", icon: CalendarCheck },
    { name: "Messages", href: "/chats", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const doctorItems = [
    { name: "Dashboard", href: "/doctor/dashboard", icon: Home },
    { name: "Appointments", href: "/doctor/appointments", icon: CalendarCheck },
    { name: "My Patients", href: "/doctor/patients", icon: Users },
    { name: "Hospitals", href: "/hospitals", icon: Building2 },
    { name: "Prescriptions", href: "/doctor/prescriptions", icon: Pill },
    { name: "My Posts", href: "/doctor/posts", icon: Rss },
    { name: "Messages", href: "/doctor/chats", icon: MessageSquare },
    { name: "Profile", href: "/doctor/profile", icon: User },
  ]

  const adminItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Verify Doctors", href: "/admin/doctors", icon: HeartPulse },
    { name: "Hospitals", href: "/admin/hospitals", icon: Building2 },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ]

  const hospitalItems = [
    { name: "Dashboard", href: "/hospital/dashboard", icon: Home },
    { name: "Patients", href: "/hospital/patients", icon: Users },
    { name: "Doctors", href: "/hospital/doctors", icon: HeartPulse },
    { name: "Appointments", href: "/hospital/appointments", icon: CalendarCheck },
    { name: "Pharmacy", href: "/hospital/pharmacy", icon: Pill },
    { name: "Labs", href: "/hospital/labs", icon: Microscope },
    { name: "Ambulance", href: "/hospital/ambulance", icon: Ambulance },
    { name: "Reports", href: "/hospital/reports", icon: History },
  ]

  const menuItems = role === "user" ? userItems : role === "doctor" ? doctorItems : role === "hospital" ? hospitalItems : adminItems

  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 hidden md:flex flex-col flex-shrink-0 z-50">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <Link href="/" className="flex items-center gap-2 mb-8 cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Dhanvantri Logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold tracking-tight text-medical-green italic">Dhanvantri</span>
        </Link>
        <nav className="flex flex-col gap-2.5 pb-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest group",
                  isActive 
                    ? "bg-medical-green text-white shadow-xl shadow-medical-green/20 scale-[1.02] z-10" 
                    : "text-foreground/60 hover:bg-medical-grey hover:text-medical-green"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-medical-green")} />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* Bottom Profile Quick Link (Optional) */}
      <div className="p-4 border-t border-medical-grey mt-auto">
         <div className="bg-medical-grey/30 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-medical-green flex items-center justify-center text-white font-black text-xs">P</div>
            <div className="flex-1 min-w-0">
               <p className="text-[10px] font-black uppercase truncate">Prakash R.</p>
               <p className="text-[8px] font-bold text-muted-foreground uppercase">Verified Patient</p>
            </div>
         </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #34c759;
        }
      `}</style>
    </aside>
  )
}
