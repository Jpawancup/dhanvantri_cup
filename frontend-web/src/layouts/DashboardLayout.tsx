"use client"

import Sidebar from "@/components/shared/Sidebar"
import TopNavbar from "@/components/shared/TopNavbar"
import MobileTabBar from "@/components/shared/MobileTabBar"
import ScrollToTop from "@/components/shared/ScrollToTop"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-medical-grey/30 min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar role="user" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <main className="flex-1 pb-24 md:pb-10 relative">
          <TopNavbar />
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab */}
      <MobileTabBar />
      <ScrollToTop />
    </div>
  )
}
