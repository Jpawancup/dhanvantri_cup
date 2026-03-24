"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ArrowLeft, CheckCircle, Calendar, Clock, MapPin, User, ChevronRight, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DiagnosticsBookingPage() {
  const [step, setStep] = useState(1)
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b pb-6">
          <Link href="/diagnostics">
            <button className="p-2 rounded-full hover:bg-medical-grey transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          </Link>
          <h1 className="text-xl md:text-2xl font-black">Book Lab Test</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-6">
                    <h3 className="font-bold text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-medical-red" /> Collection Address</h3>
                    <div className="p-4 rounded-xl border border-medical-blue bg-medical-blue/5 flex items-start gap-4 cursor-pointer relative">
                      <div className="w-5 h-5 rounded-full border-4 border-medical-blue flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-sm">Home Address (Default)</p>
                        <p className="text-xs text-muted-foreground mt-1">H-12, Green Park Avenue, Near Metro Station, New Delhi - 110016</p>
                      </div>
                      <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-medical-blue" />
                    </div>
                    <Button variant="outline" className="w-full rounded-xl border-dashed border-medical-grey py-6">
                      + Add New Address
                    </Button>
                  </div>

                  <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-6">
                    <h3 className="font-bold text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-medical-green" /> Select Schedule</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                       {[0, 1, 2, 3, 4, 5, 6].map(d => (
                         <button key={d} className={`flex flex-col items-center gap-1 min-w-[70px] p-3 rounded-2xl border transition-all ${d === 0 ? "bg-medical-green text-white border-medical-green" : "bg-medical-grey text-foreground border-transparent"}`}>
                            <span className="text-[10px] font-bold uppercase opacity-80">Mar</span>
                            <span className="text-lg font-black">{23+d}</span>
                            <span className="text-[10px] font-bold">MON</span>
                         </button>
                       ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       {["07:00 AM", "08:30 AM", "10:00 AM", "11:30 AM"].map((s, i) => (
                         <button key={s} className={`p-3 rounded-xl border text-sm font-bold transition-all ${i === 0 ? "border-medical-green bg-medical-green/10 text-medical-green" : "border-medical-grey"}`}>{s}</button>
                       ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic">* Fasting for 10-12 hours is required for accurate results.</p>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-7 font-black text-xl shadow-lg">Proceed to Summary</Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center space-y-8 py-10">
                  <div className="w-24 h-24 bg-medical-green/10 rounded-full flex items-center justify-center border-4 border-medical-green animate-bounce">
                     <CheckCircle className="w-12 h-12 text-medical-green" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mt-1">Our technician will reach your location on Mar 23 at 07:00 AM.</p>
                  </div>
                  <div className="w-full space-y-3">
                     <Link href="/dashboard" className="w-full block">
                       <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-6 font-bold">Go to Dashboard</Button>
                     </Link>
                     <Button variant="outline" className="w-full rounded-full py-6 font-bold">Track Collection</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary Column */}
          {step === 1 && (
            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground font-medium">Full Body Checkup</span>
                     <span className="font-bold">₹1,999</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground font-medium">Home Collection Fee</span>
                     <span className="text-medical-green font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground font-medium">Platform Fee</span>
                     <span className="font-bold">₹49</span>
                  </div>
                  <div className="pt-4 border-t border-dashed flex justify-between items-center font-black text-lg">
                     <span>Total Amount</span>
                     <span className="text-medical-blue font-black">₹2,048</span>
                  </div>
                </div>
              </div>

              <div className="bg-medical-grey/30 rounded-2xl p-6 border border-medical-grey space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Technician Safety</h4>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm"><User className="w-4 h-4 text-medical-green" /></div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">Our phlebotomists are NABL certified and strictly follow WHO-standard hygiene protocols including temperature checks and fresh PPE kits for every collection.</p>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
