"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, User } from "lucide-react"
import { useState, useEffect } from "react"
import { getData, saveData, generateId, getCurrentUser } from "@/services/localDb"
import { useRouter } from "next/navigation"

export default function BookAppointmentPage() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedDoctorId, setSelectedDoctorId] = useState("")
  const [selectedDate, setSelectedDate] = useState("Today")
  const [selectedTime, setSelectedTime] = useState("11:30 AM")

  useEffect(() => {
    const rawDoctors = getData("doctors") || []
    const users = getData("users") || []
    
    // Enrich doctors with usernames
    const enriched = rawDoctors.map((doc: any) => {
      const u = users.find((x: any) => x.id === doc.userId) || {}
      return {
        ...doc,
        name: u.name || "Unknown Doctor",
      }
    })
    setDoctors(enriched)
    if (enriched.length > 0) setSelectedDoctorId(enriched[0].id)
  }, [])

  const handleBooking = () => {
    const user = getCurrentUser()
    if (!user) {
      alert("Please login first")
      router.push("/login")
      return
    }

    const aps = getData("appointments") || []
    aps.unshift({
      id: "a_" + generateId(),
      patientId: user.id,
      doctorId: selectedDoctorId,
      date: selectedDate === "Today" ? new Date().toISOString().split("T")[0] : selectedDate,
      time: selectedTime,
      type: "Video",
      status: "pending"
    })
    
    saveData("appointments", aps)
    alert("Appointment successfully booked!")
    router.push("/dashboard")
  }
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold">Book Appointment</h1>
        
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="space-y-4 mb-6">
            <label className="text-sm font-semibold mb-2 block">Select Doctor</label>
            <select 
              value={selectedDoctorId}
              onChange={e => setSelectedDoctorId(e.target.value)}
              className="w-full rounded-xl h-12 bg-medical-grey/20 border-medical-grey/50 px-3 text-sm font-medium focus:ring-2 focus:ring-medical-green/30 outline-none"
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialization}) - ₹{d.fee}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Today', 'Tomorrow', '24 Mar'].map((d) => (
                  <Button 
                    key={d} 
                    onClick={() => setSelectedDate(d)}
                    variant={selectedDate === d ? "default" : "outline"} 
                    className={selectedDate === d ? "bg-medical-green hover:bg-medical-green/90 text-white" : ""}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:30 AM', '02:00 PM', '04:15 PM'].map((t) => (
                  <Button 
                    key={t} 
                    onClick={() => setSelectedTime(t)}
                    variant={selectedTime === t ? "default" : "outline"} 
                    className={selectedTime === t ? "bg-medical-blue hover:bg-medical-blue/90 text-white" : ""}
                  >
                    <Clock className="w-4 h-4 mr-2" /> {t}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleBooking} className="w-full bg-medical-green hover:bg-medical-green/90 text-white mt-4 py-6 font-bold text-lg">
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
