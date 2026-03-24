"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { FileBarChart, Calendar, TrendingUp } from "lucide-react"

export default function HospitalReportsPage() {
  const { appointments, pharmacyOrders, labOrders, patients } = useHospitalStore()

  const completedAppointments = appointments.filter(a => a.status === 'completed').length
  const pendingAppointments = appointments.filter(a => a.status === 'scheduled').length
  
  const dispensedMeds = pharmacyOrders.filter(o => o.status === 'dispensed').length
  const completedLabs = labOrders.filter(o => o.status === 'completed').length

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <FileBarChart className="w-8 h-8 text-blue-500" />
          Analytics & Reports
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h2 className="font-bold text-lg">Appointments</h2>
           </div>
           <div className="space-y-4">
             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
               <span className="text-sm font-semibold text-muted-foreground">Total Scheduled</span>
               <span className="font-black">{pendingAppointments}</span>
             </div>
             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
               <span className="text-sm font-semibold text-muted-foreground">Successfully Completed</span>
               <span className="font-black text-green-600">{completedAppointments}</span>
             </div>
           </div>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold text-lg">Operations</h2>
           </div>
           <div className="space-y-4">
             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
               <span className="text-sm font-semibold text-muted-foreground">Total Patients Registered</span>
               <span className="font-black">{patients.length}</span>
             </div>
             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
               <span className="text-sm font-semibold text-muted-foreground">Pharmacy Orders Dispensed</span>
               <span className="font-black text-blue-600">{dispensedMeds}</span>
             </div>
             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
               <span className="text-sm font-semibold text-muted-foreground">Lab Tests Completed</span>
               <span className="font-black text-indigo-600">{completedLabs}</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
