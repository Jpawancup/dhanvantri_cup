"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { Users, Search } from "lucide-react"

export default function HospitalPatientsPage() {
  const { patients } = useHospitalStore()

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Users className="w-8 h-8 text-medical-blue" />
          Patient Registry
        </h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-medical-blue" />
        </div>
      </div>

      <div className="space-y-4">
        {patients.map(p => (
          <div key={p.id} className="p-4 border border-slate-100 rounded-2xl hover:border-medical-blue/30 transition-colors flex justify-between items-center group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center font-black text-medical-blue">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-lg">{p.name}</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Age {p.age} • {p.gender} • Blood: {p.blood_group}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold bg-slate-100 px-3 py-1 rounded-xl">{p.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
