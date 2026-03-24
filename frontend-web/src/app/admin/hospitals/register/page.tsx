"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { Construction } from "lucide-react"

export default function Page() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-8 pt-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-medical-grey/50 rounded-full flex items-center justify-center text-medical-blue animate-pulse">
            <Construction className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-foreground">ADMIN - HOSPITALS - REGISTER</h1>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          This module is part of the extensive Phase 1 UI architecture and is structurally mapped. Interactive logic will be connected shortly.
        </p>
        <button onClick={() => window.history.back()} className="mt-8 px-8 py-3 bg-medical-blue text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-medical-blue/90 transition-colors shadow-lg shadow-medical-blue/20">
          Go Back
        </button>
      </div>
    </AdminLayout>
  );
}
