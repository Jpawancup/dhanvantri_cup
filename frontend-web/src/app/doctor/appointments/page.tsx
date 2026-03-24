"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Calendar, Clock, User, Phone, Video, MapPin, MoreVertical, Search, SlidersHorizontal, ChevronRight, Activity, CheckCircle, XCircle, MoreHorizontal, BellRing, Settings2, Trash2, CalendarPlus, RefreshCw, ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const initialAppointments = [
  { id: 1, patient: "Rahul Sharma", time: "10:30 AM", date: "Today", type: "Video", problem: "Chest Pain & Breathing issue", status: "confirmed", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300" },
  { id: 2, patient: "Priya Malhotra", time: "11:45 AM", date: "Today", type: "In-Person", problem: "Follow-up for Hypertension", status: "pending", img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300" },
  { id: 3, patient: "Amit Verma", time: "02:15 PM", date: "Tomorrow", type: "Video", problem: "High Blood Pressure issues", status: "confirmed", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300" },
]

export default function DoctorAppointmentsPage() {
  const [activeAppointments, setActiveAppointments] = useState(initialAppointments)
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null)

  const handleStatusChange = (id: number, newStatus: string) => {
    setActiveAppointments(prev => prev.map(a => a.id === id ? {...a, status: newStatus} : a))
    setToast({
      msg: newStatus === "confirmed" ? "Appointment Accepted!" : newStatus === "declined" ? "Appointment Declined." : "Action completed.",
      type: newStatus === "declined" ? 'error' : 'success'
    })
    setTimeout(() => setToast(null), 3000)
  }

  const handleStart = (patient: string) => {
    setToast({ msg: `Initializing consultation with ${patient}...`, type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <DoctorLayout>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className={`fixed top-20 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${toast.type === 'success' ? 'bg-medical-green text-white border-white/20' : 'bg-red-500 text-white border-white/20'}`}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold text-xs uppercase tracking-widest">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 tracking-tighter">
             <h1 className="text-3xl font-black flex items-center gap-3 italic">
                <Calendar className="w-8 h-8 text-medical-green animate-pulse" /> Patient Schedule
             </h1>
             <p className="text-sm font-bold text-muted-foreground opacity-60 uppercase tracking-widest text-[10px]">Medical Command Center</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" onClick={() => handleStatusChange(0, "Synced")} className="rounded-2xl border-medical-grey/60 h-12 px-6 font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-medical-grey transition-all">
                <RefreshCw className="w-4 h-4 mr-2" /> Sync Calendar
             </Button>
             <Button onClick={() => handleStatusChange(0, "New Slot Add")} className="bg-medical-green hover:bg-medical-green/90 text-white rounded-2xl h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-medical-green/20">
                <CalendarPlus className="w-4 h-4 mr-2" /> + Add Slot
             </Button>
          </div>
        </div>

        <div className="relative group max-w-lg">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:text-medical-green transition-colors" />
           <Input className="pl-11 rounded-[1.5rem] bg-white border border-medical-grey/50 h-14 shadow-sm focus:ring-4 focus:ring-medical-green/10 transition-all font-medium text-sm" placeholder="Search patient name, problem, date..." />
        </div>

        <Tabs defaultValue="today">
           <TabsList className="w-full bg-medical-grey/30 grid grid-cols-3 p-1 rounded-2xl h-14 border border-medical-grey/50 max-w-md">
              <TabsTrigger value="today" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Today</TabsTrigger>
              <TabsTrigger value="upcoming" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Archive</TabsTrigger>
           </TabsList>

           <TabsContent value="today" className="mt-8">
              <div className="space-y-4">
                 {activeAppointments.map((a, i) => (
                    <motion.div 
                      key={a.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="bg-white rounded-[2rem] border border-medical-grey/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-medical-green/40 hover:shadow-2xl hover:shadow-medical-green/5 transition-all group relative overflow-hidden"
                    >
                       <div className="flex items-center gap-6 min-w-0 flex-1">
                          <div className="relative flex-shrink-0">
                             <img src={a.img} alt={a.patient} className="w-16 h-16 rounded-[1.25rem] object-cover shadow-lg border-2 border-white group-hover:scale-110 transition-transform" />
                             <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 border-white shadow-sm ${a.type === "Video" ? "bg-medical-green text-white" : "bg-medical-blue text-white"}`}>
                                {a.type === "Video" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                             </div>
                          </div>
                          <div className="flex-1 min-w-0">
                             <h4 className="font-black text-lg tracking-tight truncate uppercase italic">{a.patient}</h4>
                             <div className="flex items-center gap-2 mt-1">
                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-medical-grey/40 px-3 py-1 rounded-full flex items-center gap-2">
                                   <Clock className="w-3 h-3" /> {a.time} • {a.date}
                                </p>
                                {a.status === 'confirmed' && <span className="text-[9px] font-black text-medical-green uppercase bg-medical-green/10 px-2 py-0.5 rounded-full border border-medical-green/30">Confirmed</span>}
                             </div>
                             <p className="text-xs text-medical-blue font-bold mt-2.5 flex items-center gap-2 italic leading-relaxed opacity-70">
                                <Activity className="w-4 h-4 text-medical-blue" /> &quot;{a.problem}&quot;
                             </p>
                          </div>
                       </div>
                       
                       <div className="flex gap-2 self-stretch md:self-auto pt-4 md:pt-0 border-t md:border-t-0 border-dashed border-medical-grey/50">
                          {a.status === "pending" ? (
                             <div className="flex flex-1 md:flex-none gap-2">
                                <Button onClick={() => handleStatusChange(a.id, "confirmed")} className="flex-1 md:flex-none bg-medical-green hover:bg-medical-green/90 text-white rounded-xl h-12 px-6 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-medical-green/20">Accept</Button>
                                <Button onClick={() => handleStatusChange(a.id, "declined")} variant="outline" className="flex-1 md:flex-none border-medical-red text-medical-red hover:bg-medical-red/5 rounded-xl h-12 px-6 font-black text-[10px] uppercase tracking-widest">Decline</Button>
                             </div>
                          ) : (
                             <div className="flex flex-1 md:flex-none gap-2">
                                <Button onClick={() => handleStart(a.patient)} className="flex-1 md:flex-none bg-slate-900 hover:bg-medical-green text-white rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 transition-all active:scale-95">
                                   {a.type === "Video" ? <Video className="w-4 h-4 mr-1" /> : <ShieldCheck className="w-4 h-4 mr-1" />} START CONSULTATION
                                </Button>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger>
                                     <div className="p-3.5 rounded-xl hover:bg-medical-grey bg-medical-grey/30 text-muted-foreground transition-all hover:text-medical-green border border-medical-grey/40 cursor-pointer">
                                        <MoreHorizontal className="w-5 h-5 text-current" />
                                     </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[180px] shadow-2xl border-medical-grey/40">
                                     <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3 cursor-pointer"><User className="w-4 h-4 mr-2" /> View History</DropdownMenuItem>
                                     <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3 cursor-pointer"><BellRing className="w-4 h-4 mr-2" /> Send Alert</DropdownMenuItem>
                                     <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3 cursor-pointer"><Settings2 className="w-4 h-4 mr-2" /> Reschedule</DropdownMenuItem>
                                     <DropdownMenuItem className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3 cursor-pointer text-medical-red hover:bg-medical-red/10"><Trash2 className="w-4 h-4 mr-2" /> Cancel</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                             </div>
                          )}
                       </div>
                    </motion.div>
                 ))}
              </div>
           </TabsContent>

           <TabsContent value="upcoming" className="mt-8">
              <div className="text-center py-20 bg-white border border-dashed rounded-[2rem] space-y-4">
                 <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-medical-blue/5"><Calendar className="w-8 h-8 text-medical-blue animate-pulse" /></div>
                 <p className="text-sm font-bold text-muted-foreground italic leading-relaxed max-w-xs mx-auto">No future appointments booked yet. Your schedule is clear!</p>
              </div>
           </TabsContent>
           <TabsContent value="past" className="mt-8">
              <div className="text-center py-20 bg-white border border-dashed rounded-[2rem] space-y-4">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-slate-50"><CheckCircle className="w-8 h-8 text-slate-400" /></div>
                 <p className="text-sm font-bold text-muted-foreground italic leading-relaxed max-w-xs mx-auto">Access digital health records of patients you recently consulted.</p>
              </div>
           </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  )
}
