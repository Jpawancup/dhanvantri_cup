"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import StoriesSection from "@/components/sections/StoriesSection"
import HealthcareActions from "@/components/sections/HealthcareActions"
import FeedSection from "@/components/sections/FeedSection"
import { StatCard } from "@/components/dashboard/StatCard"
import RecentAppointments from "@/components/dashboard/RecentAppointments"
import DoctorCard from "@/components/cards/DoctorCard"
import { useMockStore, MOCK_STATS } from "@/store/mockStore"
import { CalendarCheck, FileText, FlaskConical, HeartPulse, Rss } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { currentUser, appointments } = useMockStore()

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 pb-28 md:p-6 pb-safe">
        {/* Greeting Banner */}
        <div className="bg-gradient-to-br from-medical-green to-medical-blue p-5 md:p-10 text-white rounded-b-3xl md:rounded-[2.5rem] shadow-lg md:shadow-xl shadow-medical-green/10 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              {currentUser.role} Portal
            </p>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 md:mt-4">
              Welcome back,
              <br className="md:hidden" /> {currentUser.name.split(" ")[0]}!
            </h1>
            <div className="h-1 w-12 md:w-20 bg-white/30 rounded-full my-3 md:my-6" />
            <p className="text-xs md:text-sm font-medium opacity-90 leading-relaxed">
              You have <span className="font-bold underline decoration-wavy underline-offset-4">{appointments.length} upcoming appointments</span> scheduled.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>

        {/* Quick Healthcare Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-4 md:px-0">
          <StatCard label="Appointments" value={appointments.length} subtitle="Upcoming" color="bg-medical-blue/10 text-medical-blue" icon={<CalendarCheck className="w-5 h-5" />} />
          <StatCard label="Prescriptions" value={MOCK_STATS.patient.prescriptions} subtitle="Active Rx" color="bg-medical-green/10 text-medical-green" icon={<FileText className="w-5 h-5" />} />
          <StatCard label="Lab Reports" value={MOCK_STATS.patient.labReports} subtitle="Available" color="bg-medical-pink/10 text-pink-500" icon={<FlaskConical className="w-5 h-5" />} />
          <StatCard label="Health Score" value={`${MOCK_STATS.patient.healthScore}/100`} subtitle="Good" color="bg-medical-green/10 text-medical-green" icon={<HeartPulse className="w-5 h-5" />} />
        </div>

        {/* Stories Section */}
        <div className="bg-white md:rounded-[2.5rem] py-2 border-y md:border border-medical-grey/60 shadow-sm overflow-hidden">
          <StoriesSection />
        </div>

        {/* Healthcare Quick Actions */}
        <div className="px-4 md:px-0">
          <HealthcareActions />
        </div>

        {/* 2-Column layout: Feed + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-0 md:px-0 pt-2 md:pt-4">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center justify-between px-4 md:px-0">
              <h2 className="text-lg md:text-2xl font-bold tracking-tight flex items-center gap-2">
                <Rss className="w-5 h-5 md:w-7 md:h-7 text-medical-green" /> Clinical Insights
              </h2>
              <button
                onClick={() => router.push("/feed")}
                className="text-[10px] md:text-xs font-bold uppercase text-medical-green tracking-widest active:scale-95 transition-transform"
              >
                View All
              </button>
            </div>
            <FeedSection />
          </div>

          {/* Right sidebar desktop */}
          <aside className="hidden lg:flex flex-col gap-6">
            <RecentAppointments />

            <div className="bg-white rounded-[2rem] shadow-sm border border-medical-grey/60 p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Recommended Experts</h3>
                  <span
                    onClick={() => router.push("/doctors")}
                    className="text-[10px] font-black uppercase text-medical-green tracking-widest cursor-pointer hover:underline"
                  >
                    See All
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <DoctorCard />
                </div>
              </div>
              <button
                onClick={() => router.push("/doctors")}
                className="w-full h-12 bg-medical-grey/30 rounded-2xl mt-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:bg-medical-green hover:text-white transition-all"
              >
                Browse Directory
              </button>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}
