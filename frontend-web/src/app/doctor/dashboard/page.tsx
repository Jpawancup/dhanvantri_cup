"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { StatCard } from "@/components/dashboard/StatCard"
import { useMockStore, MOCK_STATS, MOCK_DOCTOR_SCHEDULE } from "@/store/mockStore"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarCheck, Users, FileText, IndianRupee, Video, Clock, CheckCircle2, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DoctorDashboardPage() {
  const router = useRouter()
  const { currentUser } = useMockStore()
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const handleAction = (type: string) => {
    setActiveAction(type)
    setTimeout(() => setActiveAction(null), 3000)
  }

  return (
    <DoctorLayout>
      <AnimatePresence>
        {activeAction && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl bg-medical-green text-white border-white/20 border-2 backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-black text-xs uppercase tracking-widest">{activeAction}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-medical-green p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Doctor Portal</p>
            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter">
              Good morning,<br />{currentUser.name.split(" ").slice(0, 2).join(" ")}!
            </h1>
            <p className="text-xs md:text-sm mt-3 opacity-60 font-bold max-w-md leading-relaxed">
              You have <span className="text-white underline">{MOCK_DOCTOR_SCHEDULE.length} appointments</span> scheduled for today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/doctor/posts")}
              className="bg-white text-slate-900 hover:bg-white/90 rounded-2xl h-11 md:h-14 px-5 md:px-8 font-black text-xs uppercase tracking-widest shadow-xl"
            >
              + Create Post
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-medical-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="p-4 md:p-6 space-y-6 md:space-y-8 max-w-7xl mx-auto pb-32">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-[-30px] md:mt-[-40px] relative z-20">
          <StatCard label="Today's Appointments" value={MOCK_DOCTOR_SCHEDULE.length} subtitle="Active Today" color="bg-medical-blue text-white" icon={<CalendarCheck className="w-5 h-5" />} />
          <StatCard label="Total Patients" value={MOCK_STATS.doctor.totalPatients} subtitle="Consulted" color="bg-medical-green text-white" icon={<Users className="w-5 h-5" />} />
          <StatCard label="Prescriptions" value={MOCK_STATS.doctor.prescriptions} subtitle="Issued" color="bg-yellow-500 text-white" icon={<FileText className="w-5 h-5" />} />
          <StatCard label="Monthly Earnings" value={`₹${(MOCK_STATS.doctor.earnings / 1000).toFixed(0)}K`} subtitle="This Month" color="bg-medical-pink text-white" icon={<IndianRupee className="w-5 h-5" />} />
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-sm p-5 md:p-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
              <div className="w-2 h-6 md:h-8 bg-medical-blue rounded-full" />
              Today&apos;s Schedule
            </h2>
            <Button
              variant="ghost"
              onClick={() => router.push("/doctor/appointments")}
              className="text-xs font-black uppercase tracking-widest text-medical-blue hover:bg-medical-blue/5"
            >
              View Calendar
            </Button>
          </div>
          <div className="space-y-3 md:space-y-4">
            {MOCK_DOCTOR_SCHEDULE.map((apt, idx) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 rounded-2xl md:rounded-3xl border border-medical-grey/40 p-4 md:p-5 hover:border-medical-blue hover:bg-medical-blue/5 transition-all group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-medical-blue/30 shadow-md bg-medical-blue/10 flex items-center justify-center text-medical-blue font-black uppercase text-lg">
                      {apt.patientName?.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-medical-green rounded-full border-2 border-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-sm md:text-base uppercase tracking-tight">{apt.patientName}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-medical-blue uppercase tracking-widest bg-medical-blue/10 px-2 py-0.5 rounded-full">
                        {apt.type}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
                        <Clock className="w-3 h-3" />
                        {apt.time} | {apt.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 self-end md:self-center">
                  <Button
                    onClick={() => handleAction(`Reschedule request sent for ${apt.patientName}`)}
                    variant="outline"
                    className="h-9 md:h-11 px-4 md:px-6 text-[10px] font-black uppercase tracking-widest rounded-xl md:rounded-2xl border-medical-grey/60 hover:bg-medical-grey transition-all"
                  >
                    Reschedule
                  </Button>
                  {apt.type === "Video" && (
                    <Button
                      onClick={() => handleAction("Starting Video Consultation Room...")}
                      className="h-9 md:h-11 px-4 md:px-6 text-[10px] font-black uppercase tracking-widest bg-medical-blue hover:bg-medical-blue/90 text-white rounded-xl md:rounded-2xl shadow-lg shadow-medical-blue/20"
                    >
                      <Video className="w-4 h-4 mr-2" /> Join Call
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="bg-emerald-50 rounded-[2rem] p-6 md:p-8 border border-emerald-100 relative overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-lg md:text-xl font-black text-emerald-900 uppercase tracking-tight mb-2">Publish Health Insights</h3>
              <p className="text-sm text-emerald-700/70 font-bold max-w-xs leading-relaxed">Share medical news, case studies or health tips to your followers.</p>
            </div>
            <Button
              onClick={() => router.push("/doctor/posts")}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 md:h-14 w-full font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20"
            >
              Go to Content Studio
            </Button>
          </div>

          <div className="bg-medical-blue/5 rounded-[2rem] p-6 md:p-8 border border-medical-blue/10 relative overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-lg md:text-xl font-black text-medical-blue uppercase tracking-tight mb-2">E-Prescription Terminal</h3>
              <p className="text-sm text-medical-blue/60 font-bold max-w-xs leading-relaxed">Digital prescriptions with smart drug interaction checking.</p>
            </div>
            <Button
              onClick={() => router.push("/doctor/prescriptions")}
              className="mt-6 bg-medical-blue hover:bg-medical-blue/90 text-white rounded-2xl h-12 md:h-14 w-full font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-blue/20"
            >
              Create Prescription
            </Button>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}
