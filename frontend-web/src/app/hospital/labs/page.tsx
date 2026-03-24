"use client"

import { Microscope, Upload, FileText, CheckCircle, FlaskConical } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Mock lab orders for hospital labs view
const MOCK_LAB_ORDERS = [
  { id: "lo1", patientName: "Pawan Kumar", doctorName: "Dr. Amit Sharma", testName: "Complete Blood Count (CBC)", status: "pending", orderedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: "lo2", patientName: "Ravi Sharma", doctorName: "Dr. Anjali Desai", testName: "Lipid Profile", status: "completed", orderedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), result: "Total Cholesterol: 185 mg/dL — Normal range. LDL: 110 mg/dL — Borderline." },
  { id: "lo3", patientName: "Sneha Patel", doctorName: "Dr. Raj Patel", testName: "Thyroid Function Test (TFT)", status: "pending", orderedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
  { id: "lo4", patientName: "Meera Singh", doctorName: "Dr. Sunita Rao", testName: "Urine Routine Analysis", status: "completed", orderedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), result: "All parameters within normal limits. Culture negative." },
]

export default function HospitalLabsPage() {
  const [orders, setOrders] = useState(MOCK_LAB_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [summary, setSummary] = useState("")
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleUpload = (orderId: string) => {
    if (!summary.trim()) return
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status: "completed" as const, result: summary } : o)
    )
    setSelectedOrder(null)
    setSummary("")
    showToast("Lab report uploaded successfully!")
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6 max-w-5xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-medical-green text-white px-6 py-3 rounded-2xl shadow-2xl font-black text-sm flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-black flex items-center gap-2">
          <Microscope className="w-7 h-7 md:w-8 md:h-8 text-indigo-500" />
          Laboratory Division
        </h1>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest">
          {orders.filter((o) => o.status === "pending").length} Pending
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 md:p-5 border border-slate-100 rounded-2xl flex flex-col group hover:border-indigo-500/30 transition-colors bg-slate-50/30">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-base">{order.patientName}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                    Test: <span className="text-medical-blue font-bold">{order.testName}</span> · {order.doctorName}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest self-start ${
                order.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
              }`}>
                {order.status}
              </span>
            </div>

            {order.status === "pending" && selectedOrder !== order.id && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(order.id)}
                  className="text-[10px] font-black uppercase bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Upload Results
                </button>
              </div>
            )}

            <AnimatePresence>
              {selectedOrder === order.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 bg-white border border-indigo-100 rounded-xl space-y-3"
                >
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
                    <button
                      onClick={() => handleUpload(order.id)}
                      className="text-[10px] font-black uppercase bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                      Submit Report
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {order.status === "completed" && order.result && (
              <div className="mt-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs font-black uppercase text-emerald-600 tracking-widest">Report Uploaded</p>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-emerald-50">
                  <FileText className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 mb-1">lab_report.pdf</p>
                    <p className="text-sm font-medium">{order.result}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
