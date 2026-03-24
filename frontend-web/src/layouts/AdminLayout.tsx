"use client"

import Sidebar from "@/components/shared/Sidebar"
import TopNavbar from "@/components/shared/TopNavbar"
import MobileTabBar from "@/components/shared/MobileTabBar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
      <MobileTabBar />
    </div>
  )
}
