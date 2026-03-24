"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { Ambulance, MapPin, Navigation, CheckCircle } from "lucide-react"

export default function HospitalAmbulancePage() {
  const { ambulanceRequests, patients, updateAmbulanceStatus } = useHospitalStore()

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Ambulance className="w-8 h-8 text-red-500" />
          Emergency & Ambulance
        </h1>
      </div>

      <div className="space-y-4">
        {ambulanceRequests.map((req) => {
          const patient = patients.find(p => p.id === req.patient_id)
          
          return (
            <div key={req.id} className="p-4 border border-slate-100 rounded-2xl flex flex-col group hover:border-red-500/30 transition-colors bg-slate-50/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <Ambulance className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{patient?.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" /> {req.pickup_location}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${
                    req.status === 'requested' ? 'bg-orange-100 text-orange-700' :
                    req.status === 'dispatched' ? 'bg-blue-100 text-blue-700' :
                    req.status === 'arrived' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {req.status}
                  </span>
                  
                  {req.status === 'requested' && (
                    <button onClick={() => updateAmbulanceStatus(req.id, 'dispatched')} className="text-[10px] font-black uppercase bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      <Navigation className="w-3 h-3" /> Dispatch
                    </button>
                  )}
                  {req.status === 'dispatched' && (
                    <button onClick={() => updateAmbulanceStatus(req.id, 'arrived')} className="text-[10px] font-black uppercase bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      <MapPin className="w-3 h-3" /> Arrived
                    </button>
                  )}
                  {req.status === 'arrived' && (
                    <button onClick={() => updateAmbulanceStatus(req.id, 'completed')} className="text-[10px] font-black uppercase bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      <CheckCircle className="w-3 h-3" /> Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
