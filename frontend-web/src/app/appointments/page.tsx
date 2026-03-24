"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMockStore } from "@/store/mockStore"
import AppointmentCard from "@/components/cards/AppointmentCard"
import { Calendar, History, CalendarCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AppointmentsPage() {
  const { appointments } = useMockStore()
  const upcoming = appointments.filter((a) => a.status === "confirmed" || a.status === "pending")
  const past = appointments.filter((a) => a.status === "completed" || a.status === "cancelled")

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-5 md:space-y-6 pb-28">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 md:w-6 md:h-6 text-medical-green" />
            My Appointments
          </h1>
          <Link href="/book-appointment">
            <Button className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full h-10 px-5 font-black text-xs uppercase tracking-widest">
              + Book New
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-medical-grey">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-medical-green font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:text-medical-green font-semibold flex items-center gap-2">
              <History className="w-4 h-4" /> Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-5 md:mt-6 space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((apt) => (
                <AppointmentCard key={apt.id} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-medical-grey">
                <CalendarCheck className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No upcoming appointments found.</p>
                <Link href="/book-appointment">
                  <Button className="mt-4 bg-medical-green/10 text-medical-green hover:bg-medical-green/20 rounded-full font-black text-xs uppercase tracking-widest">
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-5 md:mt-6 space-y-4">
            {past.length > 0 ? (
              past.map((apt) => (
                <AppointmentCard key={apt.id} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-medical-grey">
                <History className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No past appointments found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
