"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Pill, Save, ShieldCheck, ArrowLeft, User, Printer, Trash2, Plus, PlusCircle, CheckCircle2, Stethoscope } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MOCK_USERS } from "@/store/mockStore"

const MOCK_PATIENTS = MOCK_USERS.filter((u) => u.role === "patient")

export default function NewPrescriptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateType = searchParams.get("template")
  const [submitted, setSubmitted] = useState(false)
  const [medications, setMedications] = useState([
    { id: 1, name: "", dosage: "", timing: "1-0-1", duration: "5 Days" },
  ])
  const [advice, setAdvice] = useState("")
  const [selectedPatientId, setSelectedPatientId] = useState(MOCK_PATIENTS[0]?.id || "")

  useEffect(() => {
    if (templateType === "fever") {
      setMedications([
        { id: 1, name: "Paracetamol 650mg", dosage: "1 Tab", timing: "1-1-1", duration: "3 Days" },
        { id: 2, name: "Pantoprazole 40mg", dosage: "1 Tab", timing: "1-0-0", duration: "5 Days" },
      ])
    }
  }, [templateType])

  const addMedication = () => {
    setMedications([...medications, { id: Date.now(), name: "", dosage: "", timing: "1-0-1", duration: "5 Days" }])
  }

  const removeMedication = (id: number) => {
    setMedications(medications.filter((m) => m.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push("/doctor/dashboard")
    }, 2000)
  }

  return (
    <DoctorLayout>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-medical-green rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(52,199,89,0.3)] mb-2">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center">
                Rx <span className="text-medical-green">Dispatched</span>
              </h1>
              <p className="text-white/60 font-bold text-center max-w-sm">Generating digital signature and syncing with chosen pharmacy...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8 pb-32 tracking-tight">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => router.back()} className="p-2 md:p-3 bg-white border border-medical-grey/60 rounded-xl hover:bg-medical-grey transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div>
              <h1 className="text-lg md:text-2xl font-black italic tracking-tighter uppercase">
                {templateType ? `${templateType}` : "Digital"} Prescription
              </h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Authorized Medical Order</p>
            </div>
          </div>
          <Button variant="ghost" className="h-10 md:h-12 px-4 md:px-6 rounded-2xl text-[10px] uppercase font-black tracking-widest text-medical-blue hover:bg-medical-blue/5">
            <Printer className="w-4 h-4 mr-2" /> Print PDF
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Section 1: Patient Selection */}
          <div className="bg-white rounded-[2rem] p-5 md:p-8 border border-medical-grey/60 shadow-sm space-y-5 md:space-y-6">
            <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
              <User className="w-5 h-5 text-medical-blue" /> Patient Detail &amp; Diagnosis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Select Patient</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:text-medical-green transition-colors z-10" />
                  <select
                    required
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full pl-11 rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-black text-xs uppercase outline-none"
                  >
                    <option value="">-- Select Patient --</option>
                    {MOCK_PATIENTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Diagnosis / Provisional Diagnosis</label>
                <Input required className="rounded-2xl h-14 bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-bold px-5" placeholder="e.g. Chronic Viral Fever" />
              </div>
            </div>
          </div>

          {/* Section 2: Medication List */}
          <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 border border-slate-800 shadow-2xl space-y-6 md:space-y-8 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2 opacity-60 italic">
                <Pill className="w-5 h-5 text-pink-400" /> Medications / Rx
              </h3>
              <button type="button" onClick={addMedication} className="text-[10px] font-black uppercase text-medical-green flex items-center gap-2 hover:bg-white/5 px-4 py-2 rounded-xl transition-all">
                <PlusCircle className="w-4 h-4" /> Add Row
              </button>
            </div>

            <div className="space-y-6">
              {medications.map((med, idx) => (
                <motion.div
                  key={med.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end pb-6 md:pb-8 border-b border-white/5"
                >
                  <div className="md:col-span-1 hidden md:flex flex-col items-center justify-center pt-8">
                    <span className="text-[10px] font-black opacity-20">#{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 ml-1">Drug Name / Power</label>
                    <Input
                      required
                      value={med.name}
                      onChange={(e) => {
                        const newList = [...medications]
                        newList[idx].name = e.target.value
                        setMedications(newList)
                      }}
                      className="rounded-2xl h-12 md:h-14 bg-white/10 border-white/5 focus:bg-white/20 transition-all font-bold px-5 text-white placeholder:text-white/20"
                      placeholder="e.g. Amlodipine 5mg"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 ml-1">Dosage</label>
                    <Input
                      required
                      value={med.dosage}
                      onChange={(e) => {
                        const newList = [...medications]
                        newList[idx].dosage = e.target.value
                        setMedications(newList)
                      }}
                      className="rounded-2xl h-12 md:h-14 bg-white/10 border-white/5 focus:bg-white/20 transition-all font-bold px-5 text-white"
                      placeholder="1 Tab"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 ml-1">Timing</label>
                    <select value={med.timing} className="w-full h-12 md:h-14 rounded-2xl bg-white/10 border-white/5 focus:bg-white/20 transition-all font-bold px-5 outline-none appearance-none cursor-pointer">
                      <option className="bg-slate-900">1-0-1 (AM/PM)</option>
                      <option className="bg-slate-900">1-1-1 (Full Day)</option>
                      <option className="bg-slate-900">0-0-1 (Night)</option>
                      <option className="bg-slate-900">1-0-0 (Morning)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 ml-1">Duration</label>
                    <Input value={med.duration} className="rounded-2xl h-12 md:h-14 bg-white/10 border-white/5 focus:bg-white/20 transition-all font-bold px-5 text-white" placeholder="5 Days" />
                  </div>
                  <div className="md:col-span-1 pb-1">
                    {medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedication(med.id)}
                        className="w-12 h-12 md:h-14 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all opacity-40 hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-8">
            <div className="flex-1 bg-white rounded-[2rem] p-5 md:p-8 border border-medical-grey/60 space-y-4 md:space-y-6">
              <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-medical-green" /> Advice / Lab Tests
              </h3>
              <textarea
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="w-full h-32 md:h-40 rounded-2xl bg-medical-grey/20 border-medical-grey/40 focus:bg-white transition-all font-medium p-4 md:p-6 outline-none resize-none"
                placeholder="Enter special advice, precautions or suggested lab tests (e.g. CBC test)..."
              />
            </div>
            <div className="w-full md:w-80 flex flex-col gap-4 justify-end">
              <Button type="submit" className="h-14 md:h-16 rounded-[1.5rem] bg-medical-green hover:bg-medical-green/90 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-medical-green/20">
                <ShieldCheck className="w-5 h-5 mr-3" /> Authorize Rx
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DoctorLayout>
  )
}
