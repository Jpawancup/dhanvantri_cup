"use client"

import { useHospitalStore } from "@/store/hospitalStore"
import { Pill, CheckSquare, Clock, Package } from "lucide-react"

export default function HospitalPharmacyPage() {
  const { pharmacyOrders, prescriptions, patients, updatePharmacyOrderStatus } = useHospitalStore()

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Pill className="w-8 h-8 text-yellow-500" />
          Pharmacy Management
        </h1>
      </div>

      <div className="space-y-4">
        {pharmacyOrders.map(order => {
          const rx = prescriptions.find(p => p.id === order.prescription_id)
          const patient = patients.find(p => p.id === order.patient_id)
          
          return (
            <div key={order.id} className="p-4 border border-slate-100 rounded-2xl flex flex-col group hover:border-yellow-500/30 transition-colors bg-slate-50/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{patient?.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${
                    order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    order.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                  
                  {order.status === 'pending' && (
                    <button onClick={() => updatePharmacyOrderStatus(order.id, 'ready')} className="text-[10px] font-black uppercase bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      <Package className="w-3 h-3" /> Mark Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button onClick={() => updatePharmacyOrderStatus(order.id, 'dispensed')} className="text-[10px] font-black uppercase bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      <CheckSquare className="w-3 h-3" /> Dispense
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-xl border border-slate-100 mt-2">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Prescription Items</p>
                <div className="space-y-2">
                  {rx?.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-1 border-b border-slate-50 last:border-0">
                      <span className="font-bold">{item.medicine_name}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{item.dosage} • {item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
