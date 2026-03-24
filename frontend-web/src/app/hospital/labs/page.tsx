"use client"

import { Microscope, Upload, FileText, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { getData, saveData, generateId } from "@/services/localDb"

export default function HospitalLabsPage() {
  const [labOrders, setLabOrders] = useState<any[]>([])
  const [labReports, setReports] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [summary, setSummary] = useState("")

  const loadData = () => {
    setLabOrders(getData("labOrders") || [])
    setReports(getData("labReports") || [])
    setUsers(getData("users") || [])
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleUpload = (orderId: string) => {
    if (!summary) return
    
    // Create new report
    const reps = getData("labReports") || []
    reps.unshift({
      id: "labr_" + generateId(),
      labOrderId: orderId,
      result: summary,
      uploadedAt: new Date().toISOString()
    })
    saveData("labReports", reps)
    
    // Update order status
    const orders = getData("labOrders") || []
    const updatedOrders = orders.map((o: any) => o.id === orderId ? { ...o, status: "completed" } : o)
    saveData("labOrders", updatedOrders)
    
    setSelectedOrder(null)
    setSummary("")
    loadData()
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Microscope className="w-8 h-8 text-indigo-500" />
          Laboratory Division
        </h1>
      </div>

      <div className="space-y-4">
        {labOrders.map(order => {
          const patient = users.find((p: any) => p.id === order.patientId)
          const doctor = users.find((d: any) => d.id === order.doctorId)
          const report = labReports.find((r: any) => r.labOrderId === order.id)
          
          return (
            <div key={order.id} className="p-4 border border-slate-100 rounded-2xl flex flex-col group hover:border-indigo-500/30 transition-colors bg-slate-50/30">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{patient?.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
                      Test: <span className="text-medical-blue font-bold">{order.testName}</span> • Ordered by: {doctor?.name}
                    </p>
                  </div>
                </div>
                <div>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${
                    order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              {order.status === 'pending' && selectedOrder !== order.id && (
                <div className="mt-4 flex justify-end">
                   <button onClick={() => setSelectedOrder(order.id)} className="text-[10px] font-black uppercase bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
                     <Upload className="w-4 h-4" /> Upload Results
                   </button>
                </div>
              )}

              {selectedOrder === order.id && (
                <div className="mt-4 p-4 bg-white border border-indigo-100 rounded-xl space-y-3">
                  <p className="text-xs font-black uppercase text-indigo-500">Upload Findings</p>
                  <textarea 
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Enter result summary..."
                    className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedOrder(null)} className="text-xs font-bold px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                    <button onClick={() => handleUpload(order.id)} className="text-[10px] font-black uppercase bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">Submit Report</button>
                  </div>
                </div>
              )}

              {order.status === 'completed' && report && (
                <div className="mt-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                     <CheckCircle className="w-4 h-4 text-emerald-500" />
                     <p className="text-xs font-black uppercase text-emerald-600 tracking-widest">Report Uploaded</p>
                     <span className="text-[10px] text-muted-foreground ml-auto">{new Date(report.uploadedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-emerald-50">
                    <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 mb-1">report_document.pdf</p>
                      <p className="text-sm font-medium">{report.result}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
