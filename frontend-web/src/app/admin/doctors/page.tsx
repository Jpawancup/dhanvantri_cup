"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { HeartPulse, Search, CheckCircle2, UserCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { MOCK_DOCTORS } from "@/store/mockStore"

export default function AdminDoctorsPage() {
  const doctorsList = MOCK_DOCTORS

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 tracking-tighter">
            <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
              <HeartPulse className="w-7 h-7 md:w-8 md:h-8 text-emerald-500 animate-pulse" /> Verify Doctors
            </h1>
            <p className="text-sm font-bold text-muted-foreground opacity-60">Manage doctor applications and verified profiles.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/doctors/add">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-11 md:h-12 px-6 md:px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20">
                + Add Doctor
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-xl overflow-hidden relative group p-5 md:p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
              <Input className="pl-11 rounded-3xl bg-slate-50 border-none h-12 shadow-sm font-medium text-sm" placeholder="Search doctors by name or specialization..." />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorsList.map((d) => (
              <Link href={`/admin/doctors/${d.id}`} key={d.id}>
                <motion.div whileHover={{ scale: 1.02 }} className="border border-slate-100 rounded-3xl p-4 hover:shadow-xl hover:border-emerald-500/30 transition-all cursor-pointer bg-white flex flex-col items-center text-center h-full">
                  <div className="relative mb-3">
                    <img src={d.image} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" alt="" />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${d.available ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>
                      {d.available ? <CheckCircle2 className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                    </div>
                  </div>
                  <h3 className="font-black text-base">{d.name}</h3>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1 mb-1">{d.specialization}</p>
                  <p className="text-[10px] font-bold text-muted-foreground mb-4">{d.hospital}</p>
                  <div className="mt-auto w-full">
                    <Button variant="outline" className="w-full rounded-xl border-medical-grey text-xs font-black uppercase tracking-widest">
                      Profile &amp; Verify Status
                    </Button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
