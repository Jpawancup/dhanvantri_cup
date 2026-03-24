"use client"

import { useState } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Star, MapPin, Calendar, Clock, Video, Users, CheckCircle, ChevronRight, User, Stethoscope, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const steps = ["Specialist", "Doctor", "Slot", "Review"]
const specializations = ["Cardiologist", "Neurologist", "Orthopedic", "Gynecologist", "Pediatrician", "Dermatologist"]
const slots = ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "04:00 PM", "05:00 PM"]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSpec, setSelectedSpec] = useState("")
  const [selectedType, setSelectedType] = useState("In-Person")

  const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1)

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b">
          <div className="flex items-center gap-3">
             <Link href="/dashboard"><button className="p-2 rounded-full hover:bg-medical-grey transition-colors"><ArrowLeft className="w-5 h-5" /></button></Link>
             <h1 className="text-xl md:text-2xl font-black">Book Appointment</h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
             {steps.map((s, idx) => (
                <div key={s} className="flex items-center gap-2">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${idx <= currentStep ? "bg-medical-green text-white" : "bg-medical-grey text-muted-foreground"}`}>{idx + 1}</div>
                   <span className={`text-xs font-bold uppercase tracking-wider ${idx <= currentStep ? "text-medical-green" : "text-muted-foreground"}`}>{s}</span>
                   {idx < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
             ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[50vh] transition-all bg-white rounded-2xl border p-6 md:p-10 shadow-sm overflow-hidden relative">
          <AnimatePresence mode="wait">
             <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
             >
                {/* Step 1: Specialist */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 px-1"><Stethoscope className="w-6 h-6 text-medical-green" /> Select Specialization</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                       {specializations.map(s => (
                         <button
                           key={s}
                           onClick={() => { setSelectedSpec(s); nextStep() }}
                           className={`p-4 rounded-xl border text-sm font-bold transition-all text-center hover:shadow-md hover:border-medical-green/40 hover:bg-medical-green/5 ${selectedSpec === s ? "border-medical-green bg-medical-green/10 text-medical-green" : "border-medical-grey"}`}
                         >
                           {s}
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Doctor */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 px-1"><User className="w-6 h-6 text-medical-blue" /> Choose your Doctor</h3>
                    <div className="space-y-3">
                       {[1, 2, 3].map(i => (
                         <div key={i} onClick={nextStep} className="flex items-center gap-4 p-4 rounded-xl border border-medical-grey hover:border-medical-green/40 bg-white transition-all cursor-pointer group hover:shadow-lg">
                           <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" className="w-16 h-16 rounded-xl object-cover" alt="Dr." />
                           <div className="flex-1">
                              <p className="font-bold">Dr. Amit Sharma</p>
                              <p className="text-sm text-medical-blue font-semibold">{selectedSpec || "Cardiologist"}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground font-medium">
                                 <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.8</span>
                                 <span>• 14 yrs</span>
                                 <span>• Apollo Hospitals</span>
                              </div>
                           </div>
                           <ChevronRight className="w-6 h-6 text-medical-grey group-hover:text-medical-green group-hover:translate-x-1 transition-all" />
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Slot */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 px-1"><Calendar className="w-6 h-6 text-medical-pink" /> Choose Availability</h3>
                    
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                       {[1, 2, 3, 4, 5, 6, 7].map(d => (
                         <button key={d} className={`flex flex-col items-center gap-1 min-w-[70px] p-3 rounded-2xl border transition-all ${d === 1 ? "bg-medical-green text-white border-medical-green" : "bg-medical-grey text-foreground border-transparent hover:border-medical-green/20"}`}>
                            <span className="text-[10px] font-bold uppercase opacity-80">Mar</span>
                            <span className="text-lg font-black">{23+d}</span>
                            <span className="text-[10px] font-bold">MON</span>
                         </button>
                       ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                       {slots.map(s => (
                         <button onClick={nextStep} key={s} className="p-3 rounded-xl border border-medical-grey text-sm font-bold hover:border-medical-green/40 hover:bg-medical-green/5 transition-all">{s}</button>
                       ))}
                    </div>

                    <div className="pt-6 border-t flex flex-col gap-4">
                       <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Consultation Type</p>
                       <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => setSelectedType("In-Person")} className={`flex items-center gap-3 p-4 rounded-xl border font-bold transition-all ${selectedType === "In-Person" ? "border-medical-blue bg-medical-blue/10 text-medical-blue" : "border-medical-grey"}`}>
                             <Users className="w-5 h-5" /> In-person Visit
                          </button>
                          <button onClick={() => setSelectedType("Video")} className={`flex items-center gap-3 p-4 rounded-xl border font-bold transition-all ${selectedType === "Video" ? "border-medical-green bg-medical-green/10 text-medical-green" : "border-medical-grey"}`}>
                             <Video className="w-5 h-5" /> Video Consult
                          </button>
                       </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Final Review */}
                {currentStep === 3 && (
                  <div className="flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-medical-green/10 rounded-full flex items-center justify-center border-4 border-medical-green animate-pulse">
                       <CheckCircle className="w-12 h-12 text-medical-green" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-foreground">Perfect! Let&apos;s Confirm.</h2>
                      <p className="text-muted-foreground font-medium mt-1">Review your appointment details before confirming.</p>
                    </div>

                    <div className="w-full bg-medical-grey/30 rounded-3xl p-6 md:p-8 space-y-4 max-w-md mx-auto relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-medical-green/10 rounded-full -mr-16 -mt-16" />
                       <div className="flex justify-between items-center text-left">
                          <div>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Doctor</p>
                            <p className="text-lg font-black text-foreground">Dr. Amit Sharma</p>
                            <p className="text-xs text-medical-blue font-bold">CARDIOLOGIST</p>
                          </div>
                          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white" alt="Dr." />
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-left pt-4 border-t border-dashed border-medical-grey">
                          <div>
                             <p className="text-[10px] text-muted-foreground font-bold uppercase">Date & Time</p>
                             <p className="text-sm font-black">March 24, 2026 • 10:30 AM</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-muted-foreground font-bold uppercase">Type</p>
                             <p className="text-sm font-black flex items-center gap-1 text-medical-green"><Video className="w-3.5 h-3.5" /> Video Consult</p>
                          </div>
                       </div>
                       <div className="flex justify-between items-center pt-4 border-t border-dashed border-medical-grey font-black text-lg">
                          <span>Total Amount</span>
                          <span className="text-medical-green">₹800.00</span>
                       </div>
                    </div>

                    <div className="w-full max-w-md flex flex-col gap-3">
                       <Link href="/dashboard" className="w-full block">
                         <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-7 font-black text-xl shadow-xl shadow-medical-green/20">Confirm & Link ABHA</Button>
                       </Link>
                       <p className="text-xs text-muted-foreground font-medium">By clicking confirm, you agree to our booking terms and conditions.</p>
                    </div>
                  </div>
                )}
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {currentStep < 3 && (
           <div className="flex items-center justify-between pt-6">
              <Button onClick={prevStep} variant="ghost" disabled={currentStep === 0} className="flex items-center gap-2 font-bold px-6 text-muted-foreground hover:text-foreground">
                 <ChevronLeft className="w-5 h-5" /> Back
              </Button>
              <div className="flex items-center gap-1.5 md:hidden">
                 {steps.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? "w-8 bg-medical-green" : "w-2 bg-medical-grey"}`} />
                 ))}
              </div>
              <Button onClick={nextStep} className="flex items-center gap-2 bg-medical-green hover:bg-medical-green/90 text-white rounded-full font-bold px-8 py-6 shadow-lg shadow-medical-green/20">
                 Next <ChevronRight className="w-5 h-5" />
              </Button>
           </div>
        )}
      </div>
    </DashboardLayout>
  )
}
