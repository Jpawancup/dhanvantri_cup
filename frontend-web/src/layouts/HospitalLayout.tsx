"use client"

import Sidebar from "@/components/shared/Sidebar"
import TopNavbar from "@/components/shared/TopNavbar"
import MobileTabBar from "@/components/shared/MobileTabBar"

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 md:pb-8 relative scroll-smooth bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
      <MobileTabBar />
    </div>
  )
}
