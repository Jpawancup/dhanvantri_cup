"use client"

import Sidebar from "@/components/shared/Sidebar"
// Assuming TopNavbar shouldn't be here since the hospital structure should be similar to AdminLayout
// Or maybe it does use TopNavbar. Let's check. Yes, AdminLayout uses both Sidebar and TopNavbar.
import TopNavbar from "@/components/shared/TopNavbar"

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="hospital" />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative scroll-smooth bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
