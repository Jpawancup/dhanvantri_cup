"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { StatCard } from "@/components/dashboard/StatCard"
import { MOCK_STATS } from "@/store/mockStore"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, HeartPulse, Building2, FileText, ShieldCheck, AlertTriangle, TrendingUp, CheckCircle2, XCircle, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const initialPendingDoctors = [
  { id: "1", name: "Dr. Kiran Mehta", specialization: "Dermatologist", submitted: "March 17, 2026", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300" },
  { id: "2", name: "Dr. Pooja Singh", specialization: "Pediatrician", submitted: "March 16, 2026", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=300" },
]

const recentActivity = [
  { id: "1", text: "New user registered: Rahul Sharma", time: "5 min ago", type: "user" },
  { id: "2", text: "Doctor verification request: Dr. K. Mehta", time: "12 min ago", type: "doctor" },
  { id: "3", text: "Post flagged for review: Feed Post #2841", time: "30 min ago", type: "flag" },
  { id: "4", text: "Hospital listed: Medanta - The Medicity", time: "1h ago", type: "hospital" },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [pendingDoctors, setPendingDoctors] = useState(initialPendingDoctors)
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null)

  const handleAction = (id: string, name: string, action: "accept" | "decline") => {
    setPendingDoctors((prev) => prev.filter((doc) => doc.id !== id))
    setNotification({
      msg: action === "accept" ? `${name} has been verified successfully!` : `${name} request has been declined.`,
      type: action === "accept" ? "success" : "error",
    })
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
    <AdminLayout>
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed top-20 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
              notification.type === "success"
                ? "bg-medical-green/90 border-white/20 text-white"
                : "bg-red-500/90 border-white/20 text-white"
            }`}
          >
            {notification.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-bold text-sm">{notification.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner */}
      <div className="bg-slate-900 overflow-hidden relative p-6 md:p-8 text-white rounded-2xl md:rounded-3xl mb-6 md:mb-8 shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Bell className="w-4 h-4" />
              <p className="text-xs font-black uppercase tracking-widest">Admin Control Panel</p>
            </div>
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl h-10 px-4 text-xs font-black uppercase tracking-widest flex-shrink-0"
            >
              <LogOut className="w-4 h-4 mr-2" /> Exit
            </Button>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black">System Overview</h1>
              <p className="text-sm mt-1 text-slate-400 font-medium">
                All systems stable.{" "}
                <span className="text-medical-green font-bold">{pendingDoctors.length}</span> doctor approvals pending.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-medical-green/10 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <StatCard label="Total Users" value={MOCK_STATS.admin.totalUsers.toLocaleString()} subtitle="Registered" color="bg-blue-100 text-blue-600" icon={<Users className="w-5 h-5" />} />
        <StatCard label="Verified Doctors" value={MOCK_STATS.admin.verifiedDoctors.toLocaleString()} subtitle="Active profiles" color="bg-emerald-100 text-emerald-600" icon={<HeartPulse className="w-5 h-5" />} />
        <StatCard label="Listed Hospitals" value={MOCK_STATS.admin.listedHospitals} subtitle="Across India" color="bg-medical-blue/10 text-medical-blue" icon={<Building2 className="w-5 h-5" />} />
        <StatCard label="Total Posts" value={MOCK_STATS.admin.totalPosts.toLocaleString()} subtitle="Published" color="bg-purple-100 text-purple-600" icon={<FileText className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Pending Doctor Verifications */}
        <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <h2 className="font-black text-base md:text-lg flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              Pending Verifications
            </h2>
            <div className="bg-yellow-100 text-yellow-700 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
              Action Required
            </div>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {pendingDoctors.map((doc) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group overflow-hidden"
                >
                  <img src={doc.image} alt={doc.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white object-cover shadow-md group-hover:scale-110 transition-transform flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm md:text-base">{doc.name}</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-tight">{doc.specialization}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-widest">Applied: {doc.submitted}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      onClick={() => handleAction(doc.id, doc.name, "decline")}
                      size="sm"
                      variant="outline"
                      className="h-9 md:h-10 text-[10px] font-black uppercase border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl px-3 md:px-4 transition-all"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleAction(doc.id, doc.name, "accept")}
                      size="sm"
                      className="h-9 md:h-10 text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-3 md:px-4 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                    >
                      Verify
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {pendingDoctors.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-muted-foreground bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500/20 mb-3" />
                <p className="font-black text-lg">All caught up!</p>
                <p className="text-sm font-medium">No pending doctor verifications at the moment.</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6">
          <h2 className="font-black text-base md:text-lg flex items-center gap-2 mb-5 md:mb-6">
            <TrendingUp className="w-6 h-6 text-medical-blue" />
            Live Activity
          </h2>
          <div className="space-y-5 md:space-y-6">
            {recentActivity.map((act) => (
              <div key={act.id} className="flex gap-4 group">
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center transition-all group-hover:scale-110 shadow-sm
                  ${act.type === "flag" ? "bg-red-100 text-red-500" : act.type === "doctor" ? "bg-emerald-100 text-emerald-600" : act.type === "hospital" ? "bg-medical-blue/10 text-medical-blue" : "bg-slate-100 text-slate-500"}`}
                >
                  {act.type === "flag" ? <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" /> : act.type === "doctor" ? <HeartPulse className="w-4 h-4 md:w-5 md:h-5" /> : act.type === "hospital" ? <Building2 className="w-4 h-4 md:w-5 md:h-5" /> : <Users className="w-4 h-4 md:w-5 md:h-5" />}
                </div>
                <div className="flex-1 border-b border-slate-50 pb-4 group-last:border-0">
                  <p className="text-xs md:text-sm font-bold text-foreground/90 leading-tight group-hover:text-foreground transition-colors">{act.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 font-black uppercase tracking-widest">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 rounded-xl text-xs font-black uppercase text-slate-400 hover:bg-slate-50 tracking-widest">
            View All Activity
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
