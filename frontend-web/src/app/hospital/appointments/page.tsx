"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { CalendarCheck, Clock, CheckCircle, XCircle } from "lucide-react"

export default function HospitalAppointmentsPage() {
  const { appointments, patients, doctors, updateAppointmentStatus } = useHospitalStore()

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <CalendarCheck className="w-8 h-8 text-purple-600" />
          Appointments Manager
        </h1>
      </div>

      <div className="space-y-4">
        {appointments.map(app => {
          const p = patients.find(pat => pat.id === app.patient_id)
          const d = doctors.find(doc => doc.id === app.doctor_id)
          return (
            <div key={app.id} className="p-4 border border-slate-100 rounded-2xl flex justify-between items-center group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex flex-col items-center justify-center text-purple-700">
                  <span className="text-[10px] font-black uppercase tracking-widest">{new Date(app.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-sm font-black">{new Date(app.date).getDate()}</span>
                </div>
                <div>
                  <p className="font-bold text-lg">{p?.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <span className="mx-2">•</span> 
                    {d?.name} ({d?.specialization})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${
                  app.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                  app.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {app.status}
                </span>

                {app.status === 'scheduled' && (
                  <div className="flex gap-2">
                    <button onClick={() => updateAppointmentStatus(app.id, 'completed')} className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => updateAppointmentStatus(app.id, 'cancelled')} className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
