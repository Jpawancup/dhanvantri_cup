"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, Calendar, Stethoscope } from "lucide-react"
import { useState } from "react"
import { useMockStore, MOCK_DOCTORS } from "@/store/mockStore"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "02:00 PM", "04:15 PM", "05:30 PM", "06:00 PM"]
const DATE_OPTIONS = ["Today", "Tomorrow", "26 Mar", "27 Mar", "28 Mar"]

export default function BookAppointmentPage() {
  const router = useRouter()
  const { addAppointment } = useMockStore()
  const [selectedDoctorId, setSelectedDoctorId] = useState(MOCK_DOCTORS[0]?.id || "")
  const [selectedDate, setSelectedDate] = useState("Today")
  const [selectedTime, setSelectedTime] = useState("11:30 AM")
  const [selectedType, setSelectedType] = useState<"Video" | "In-Person">("Video")
  const [confirmed, setConfirmed] = useState(false)

  const selectedDoctor = MOCK_DOCTORS.find((d) => d.id === selectedDoctorId)

  const handleBooking = () => {
    if (!selectedDoctor) return
    addAppointment({
      doctor: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: "pending",
      image: selectedDoctor.image,
    })
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      router.push("/appointments")
    }, 2000)
  }

  return (
    <DashboardLayout>
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl bg-medical-green text-white"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-black text-sm uppercase tracking-widest">Appointment Booked!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 pb-28">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-medical-green/10 rounded-2xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-medical-green" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Book Appointment</h1>
            <p className="text-xs text-muted-foreground font-medium">Select your preferred doctor, date and time</p>
          </div>
        </div>

        {/* Doctor Selection */}
        <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-medical-grey/60 shadow-sm space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Stethoscope className="w-4 h-4" /> Select Doctor
          </h2>
          <div className="grid gap-3">
            {MOCK_DOCTORS.filter((d) => d.available).map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoctorId(doc.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                  selectedDoctorId === doc.id
                    ? "border-medical-green bg-medical-green/5 shadow-md shadow-medical-green/10"
                    : "border-medical-grey/50 hover:border-medical-green/50"
                }`}
              >
                <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm md:text-base">{doc.name}</p>
                  <p className="text-xs text-muted-foreground font-bold">{doc.specialization} · {doc.hospital}</p>
                  <p className="text-xs font-black text-medical-green mt-0.5">₹{doc.fee} · ⭐ {doc.rating}</p>
                </div>
                {selectedDoctorId === doc.id && (
                  <CheckCircle2 className="w-5 h-5 text-medical-green flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Consultation Type */}
        <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-medical-grey/60 shadow-sm space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Consultation Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {(["Video", "In-Person"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`py-3 rounded-2xl font-black text-sm border-2 transition-all active:scale-95 ${
                  selectedType === t
                    ? "border-medical-blue bg-medical-blue text-white shadow-lg shadow-medical-blue/20"
                    : "border-medical-grey/50 hover:border-medical-blue/50"
                }`}
              >
                {t === "Video" ? "📹 Video" : "🏥 In-Person"}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-medical-grey/60 shadow-sm space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Select Date</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {DATE_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-2xl font-black text-sm border-2 transition-all active:scale-95 ${
                  selectedDate === d
                    ? "border-medical-green bg-medical-green text-white shadow-md"
                    : "border-medical-grey/50 hover:border-medical-green/50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot */}
        <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-medical-grey/60 shadow-sm space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Select Time Slot</h2>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 border-2 transition-all active:scale-95 ${
                  selectedTime === t
                    ? "border-medical-blue bg-medical-blue text-white shadow-md"
                    : "border-medical-grey/50 hover:border-medical-blue/50"
                }`}
              >
                <Clock className="w-3 h-3" /> {t}
              </button>
            ))}
          </div>
        </div>

        {/* Summary & Confirm */}
        {selectedDoctor && (
          <div className="bg-gradient-to-br from-medical-green to-medical-blue rounded-[2rem] p-6 text-white shadow-xl shadow-medical-green/20">
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-3">Booking Summary</p>
            <div className="space-y-2 text-sm font-bold mb-5">
              <div className="flex justify-between"><span className="opacity-70">Doctor</span><span>{selectedDoctor.name}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Date</span><span>{selectedDate}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Time</span><span>{selectedTime}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Type</span><span>{selectedType}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Fee</span><span>₹{selectedDoctor.fee}</span></div>
            </div>
            <Button
              onClick={handleBooking}
              className="w-full bg-white text-medical-green hover:bg-white/90 h-14 font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg"
            >
              Confirm Booking
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
