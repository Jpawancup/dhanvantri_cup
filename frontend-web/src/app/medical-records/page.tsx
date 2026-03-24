"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ShieldCheck, FileText, Share2, Plus, Download, ChevronRight, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

const records = [
  { id: 1, title: "Lab Report - Blood Test", date: "Mar 12, 2026", doctor: "Dr. Amit Sharma", status: "Verified", type: "lab" },
  { id: 2, title: "Prescription - Seasonal Flu", date: "Feb 24, 2026", doctor: "Dr. Anjali Desai", status: "Verified", type: "prescription" },
  { id: 3, title: "X-Ray - Spinal Cord", date: "Jan 18, 2026", doctor: "Dr. Raj Patel", status: "Verified", type: "scan" },
  { id: 4, title: "Lab Report - Urine Analysis", date: "Dec 05, 2025", doctor: "City Diagnostics", status: "Verified", type: "lab" },
]

export default function MedicalRecordsPage() {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-medical-green" />
              Medical Records
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Managed securely through ABHA Ecosystem</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden border-medical-grey md:flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share ABHA Profile
            </Button>
            <Button className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full flex items-center gap-2 shadow-lg shadow-medical-green/20">
              <Plus className="w-4 h-4" /> Upload Record
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-medical-grey/60 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="bg-medical-blue/10 p-3 rounded-xl">
               <FileText className="w-6 h-6 text-medical-blue" />
             </div>
             <div>
               <p className="text-sm font-bold">ABHA Health ID linked</p>
               <p className="text-xs text-muted-foreground">91-4920-3841-0294</p>
             </div>
          </div>
          <div className="flex bg-medical-grey rounded-lg p-1">
             <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm text-medical-green" : "text-muted-foreground"}`}><LayoutGrid className="w-4 h-4" /></button>
             <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm text-medical-green" : "text-muted-foreground"}`}><List className="w-4 h-4" /></button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {records.map((r, idx) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-5 rounded-2xl border border-medical-grey/60 shadow-sm hover:border-medical-green/40 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.type === "lab" ? "bg-purple-100 text-purple-600" : r.type === "prescription" ? "bg-medical-green/10 text-medical-green" : "bg-medical-blue/10 text-medical-blue"}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-medical-green transition-colors" />
                </div>
                <h3 className="font-bold text-base mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">Issued: {r.date} by {r.doctor}</p>
                <div className="flex items-center justify-between pt-4 border-t border-dashed">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-medical-green/10 text-medical-green px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-medical-grey/60 shadow-sm overflow-hidden divide-y">
            {records.map((r) => (
              <div key={r.id} className="p-4 flex items-center gap-4 hover:bg-medical-grey/20 transition-colors cursor-pointer group">
                 <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${r.type === "lab" ? "bg-purple-100 text-purple-600" : r.type === "prescription" ? "bg-medical-green/10 text-medical-green" : "bg-medical-blue/10 text-medical-blue"}`}>
                    <FileText className="w-6 h-6" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{r.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{r.date} • {r.doctor}</p>
                 </div>
                 <Download className="w-5 h-5 text-muted-foreground group-hover:text-medical-green" />
              </div>
            ))}
          </div>
        )}

        <div className="p-6 bg-gradient-to-r from-medical-blue/10 to-transparent rounded-2xl border border-medical-blue/20">
           <h4 className="font-bold text-sm text-medical-blue mb-2">ABHA Connection Tips</h4>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Only verified healthcare providers like Apollo, Fortis, and Max can upload records directly to your ABHA account. For handwritten prescriptions, please use the upload button above.
           </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
