"use client"

import { Input } from "@/components/ui/input"
import { Bell, Search, UserCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMockStore, getUnreadCount } from "@/store/mockStore"
import { motion, AnimatePresence } from "framer-motion"

const roleLabel: Record<string, string> = {
  patient:  "Patient",
  doctor:   "Doctor",
  hospital: "Hospital",
  admin:    "Admin",
}

const roleProfileLink: Record<string, string> = {
  patient:  "/profile",
  doctor:   "/doctor/profile",
  hospital: "/hospital/profile",
  admin:    "/admin/profile",
}

const roleNotifLink: Record<string, string> = {
  patient:  "/notifications",
  doctor:   "/doctor/notifications",
  hospital: "/hospital/notifications",
  admin:    "/admin/notifications",
}

export default function TopNavbar() {
  const { currentUser, notifications, markAllRead } = useMockStore()
  const unread = getUnreadCount(notifications)
  const role = currentUser?.role || "patient"

  const profileLink = roleProfileLink[role] || "/profile"
  const notifLink   = roleNotifLink[role]   || "/notifications"

  return (
    <header className="h-16 border-b bg-white/90 md:bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-[50] w-full shadow-sm">
      {/* Mobile logo */}
      <div className="flex items-center md:hidden mr-2">
        <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
        <span className="text-xl font-extrabold tracking-tight text-medical-green ml-2 italic">Dhanvantri</span>
      </div>

      {/* Desktop search */}
      <div className="flex-1 max-w-xl hidden md:flex items-center gap-2 relative">
        <Search className="absolute left-3 text-muted-foreground w-4 h-4 opacity-50" />
        <Input
          className="pl-9 bg-medical-grey border-none focus-visible:ring-2 focus-visible:ring-medical-green/20 rounded-2xl h-10 w-full font-medium text-xs"
          placeholder="Search doctors, records, hospitals..."
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        <Link href={notifLink} onClick={() => markAllRead()}>
          <button className="relative p-2.5 rounded-xl hover:bg-medical-grey transition-all group">
            <Bell className="w-5 h-5 text-foreground/70 group-hover:text-medical-green transition-colors" />
            <AnimatePresence>
              {unread > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-medical-red rounded-full border-2 border-white text-white text-[8px] font-black flex items-center justify-center px-0.5"
                >
                  {unread > 9 ? "9+" : unread}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Link>

        <Link href={profileLink}>
          <button className="flex flex-row items-center gap-2.5 p-1.5 pr-4 border border-medical-grey/60 rounded-2xl hover:bg-medical-grey transition-all shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-medical-green/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
              {currentUser?.profileImage
                ? <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
                : <UserCircle className="w-5 h-5 text-medical-green" />
              }
            </div>
            <div className="flex flex-col items-start leading-none hidden sm:flex truncate">
              <span className="text-[10px] font-black uppercase tracking-tight truncate max-w-[100px]">
                {currentUser?.name || "User"}
              </span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase mt-0.5">
                {roleLabel[role] || "User"}
              </span>
            </div>
          </button>
        </Link>
      </div>
    </header>
  )
}
