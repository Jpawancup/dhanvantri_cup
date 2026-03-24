"use client"

import { Input } from "@/components/ui/input"
import { Bell, Search, UserCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/services/localDb"
import { getUnreadCount, onNewNotification, markAllRead } from "@/services/notificationService"
import { motion, AnimatePresence } from "framer-motion"

export default function TopNavbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [unread, setUnread] = useState(0)
  
  useEffect(() => {
    setUser(getCurrentUser())
    setUnread(getUnreadCount())

    // Re-count on new notification events
    const unsub = onNewNotification(() => {
      setUnread(getUnreadCount())
    })
    return unsub
  }, [])
  
  // Determine context based on URL
  const isDoctor = pathname.startsWith('/doctor')
  const isAdmin = pathname.startsWith('/admin')
  const isHospital = pathname.startsWith('/hospital')
  
  const notificationLink = isHospital ? "/hospital/notifications" : isDoctor ? "/doctor/notifications" : isAdmin ? "/admin/notifications" : "/notifications"
  const profileLink = isHospital ? "/hospital/profile" : isDoctor ? "/doctor/profile" : isAdmin ? "/admin/profile" : "/profile"

  return (
    <header className="h-16 border-b bg-white/90 md:bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-[50] w-full shadow-sm">
      <div className="flex items-center md:hidden mr-2">
         <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
         <span className="text-xl font-extrabold tracking-tight text-medical-green ml-2 italic">Dhanvantri</span>
      </div>

      <div className="flex-1 max-w-xl hidden md:flex items-center gap-2 relative">
        <Search className="absolute left-3 text-muted-foreground w-4 h-4 opacity-50" />
        <Input 
          className="pl-9 bg-medical-grey border-none focus-visible:ring-2 focus-visible:ring-medical-green/20 rounded-2xl h-10 w-full font-medium text-xs"
          placeholder="Search clinical records, doctors, patients..."
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Link href={notificationLink} onClick={() => { markAllRead(); setUnread(0) }}>
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
          <button className="flex flex-row items-center gap-3 p-1.5 pr-4 border border-medical-grey/60 rounded-2xl hover:bg-medical-grey transition-all shadow-sm">
            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-xl bg-medical-green/10 flex-shrink-0 overflow-hidden">
               {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                  <UserCircle className="w-5 h-5 text-medical-green" />
               )}
            </div>
            <div className="flex flex-col items-start leading-none hidden sm:flex truncate">
               <span className="text-[10px] font-black uppercase tracking-tight truncate max-w-[100px]">{user?.name || (isHospital ? 'City Hospital' : 'Dr. Prakash')}</span>
               <span className="text-[8px] font-bold text-muted-foreground uppercase mt-0.5">{user?.role || (isHospital ? 'Hospital' : isDoctor ? 'Doctor' : isAdmin ? 'Admin' : 'Patient')}</span>
            </div>
          </button>
        </Link>
      </div>
    </header>
  )
}

