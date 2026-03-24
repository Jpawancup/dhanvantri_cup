"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { HeartPulse, Search } from "lucide-react"

export default function HospitalDoctorsPage() {
  const { doctors, hospitals } = useHospitalStore()

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <HeartPulse className="w-8 h-8 text-emerald-500" />
          Hospital Doctors
        </h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search doctors..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map(d => {
          const hosp = hospitals.find(h => h.id === d.hospital_id)
          return (
            <div key={d.id} className="p-4 border border-slate-100 rounded-2xl hover:border-emerald-500/30 transition-colors flex justify-between items-center group">
              <div className="flex flex-col gap-1">
                <p className="font-bold text-lg">{d.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{d.specialization}</span>
                  <span className="text-xs text-muted-foreground font-semibold">{d.experience} Exp</span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Hospital: {hosp?.name}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
