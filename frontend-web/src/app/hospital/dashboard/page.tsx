"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { StatCard } from "@/components/dashboard/StatCard"
import { Users, HeartPulse, CalendarCheck, Pill, Microscope, Ambulance, Activity } from "lucide-react"

export default function HospitalDashboardPage() {
  const { patients, doctors, appointments, pharmacyOrders, labOrders, ambulanceRequests } = useHospitalStore()

  const pendingPharmacy = pharmacyOrders.filter(o => o.status === "pending").length
  const pendingLabs = labOrders.filter(o => o.status === "pending").length

  return (
    <>
      <div className="bg-slate-900 overflow-hidden relative p-8 text-white rounded-3xl mb-8 shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Activity className="w-4 h-4" />
            <p className="text-xs font-black uppercase tracking-widest">Hospital Control Center</p>
          </div>
          <h1 className="text-3xl font-black">System Dashboard</h1>
          <p className="text-sm mt-1 text-slate-400 font-medium">Overview of hospital operations and real-time statistics.</p>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-medical-green/10 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Patients" value={patients.length.toString()} subtitle="Registered" color="bg-blue-100 text-blue-600" icon={<Users className="w-5 h-5" />} />
        <StatCard label="Active Doctors" value={doctors.length.toString()} subtitle="On Duty" color="bg-emerald-100 text-emerald-600" icon={<HeartPulse className="w-5 h-5" />} />
        <StatCard label="Appointments" value={appointments.length.toString()} subtitle="Today" color="bg-purple-100 text-purple-600" icon={<CalendarCheck className="w-5 h-5" />} />
        <StatCard label="Ambulance Req" value={ambulanceRequests.length.toString()} subtitle="Total Dispatches" color="bg-red-100 text-red-600" icon={<Ambulance className="w-5 h-5" />} />
        
        <StatCard label="Pharmacy Orders" value={pharmacyOrders.length.toString()} subtitle={`${pendingPharmacy} Pending`} color="bg-yellow-100 text-yellow-600" icon={<Pill className="w-5 h-5" />} />
        <StatCard label="Lab Orders" value={labOrders.length.toString()} subtitle={`${pendingLabs} Pending`} color="bg-indigo-100 text-indigo-600" icon={<Microscope className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
           <h2 className="font-black text-lg mb-4">Recent Appointments</h2>
           <div className="space-y-4">
             {appointments.slice(0, 5).map(app => {
               const p = patients.find(pat => pat.id === app.patient_id)
               const d = doctors.find(doc => doc.id === app.doctor_id)
               return (
                 <div key={app.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl hover:bg-slate-50">
                    <div>
                      <p className="font-bold text-sm">{p?.name}</p>
                      <p className="text-xs text-muted-foreground">{d?.name}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-widest ${app.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {app.status}
                    </span>
                 </div>
               )
             })}
           </div>
         </div>
      </div>
    </>
  )
}
