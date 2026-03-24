"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { appointments } from "@/services/mockData"
import AppointmentCard from "@/components/cards/AppointmentCard"
import { Calendar, History, CalendarCheck } from "lucide-react"

export default function AppointmentsPage() {
  const upcoming = appointments.filter(a => a.status === "confirmed" || a.status === "pending")
  const past = appointments.filter(a => a.status === "completed" || a.status === "cancelled")

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-medical-green" />
            My Appointments
          </h1>
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

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((apt) => (
                <AppointmentCard key={apt.id} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-medical-grey">
                <p className="text-muted-foreground">No upcoming appointments found.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-4">
            {past.length > 0 ? (
              past.map((apt) => (
                <AppointmentCard key={apt.id} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-medical-grey">
                <p className="text-muted-foreground">No past appointments found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
