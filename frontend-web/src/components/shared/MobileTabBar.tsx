"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Rss, Video, PlusCircle, History, MessageSquare, Menu } from "lucide-react"
import MobileDrawer from "./MobileDrawer"

export default function MobileTabBar() {
  const pathname = usePathname()
  
  const tabs = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Feed", href: "/feed", icon: Rss },
    { name: "Clips", href: "/clips", icon: Video },
    { name: "Create", href: "/create", icon: PlusCircle },
    { name: "Moments", href: "/moments", icon: History },
    { name: "Chats", href: "/chats", icon: MessageSquare },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16 px-2 relative">
        {tabs.map((tab) => {
           const isActive = pathname === tab.href
           if (tab.name === "Chats") return null; // We hide this to make room for Menu
           return (
             <Link 
               key={tab.name} 
               href={tab.href}
               className={cn(
                 "flex flex-col items-center justify-center w-[20%] h-full text-xs font-medium transition-colors active:scale-95",
                 isActive ? "text-medical-green" : "text-muted-foreground hover:text-foreground"
               )}
             >
               <tab.icon className={cn("mb-1 w-6 h-6", isActive ? "stroke-[2.5]" : "stroke-[2]")} />
               <span className="scale-[0.8] font-bold origin-bottom">{tab.name}</span>
             </Link>
           )
        })}
        {/* Mobile Drawer Trigger (Replaces the inline Menu in TopNavbar) */}
        <div className="flex flex-col items-center justify-center w-[20%] h-full text-xs font-medium transition-colors text-muted-foreground hover:text-foreground">
          <MobileDrawer customTrigger={
            <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer active:scale-95 transition-transform">
              <Menu className="mb-1 w-6 h-6 stroke-[2]" />
              <span className="scale-[0.8] font-bold origin-bottom text-muted-foreground">Menu</span>
            </div>
          } />
        </div>
      </div>
    </nav>
  )
}
