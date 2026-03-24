"use client"

import DoctorLayout from "@/layouts/DoctorLayout"
import { Bell, HeartPulse, ShieldCheck, Mail, Calendar, Video, Clock } from "lucide-react"
import { motion } from "framer-motion"

const notifications = [
  { id: 1, type: "appointment", title: "New Appointment Request", msg: "Priya Malhotra has requested a video consultation at 11:45 AM today.", time: "10 mins ago", read: false },
  { id: 2, type: "post", title: "Content Insight", msg: "Your clip '3 Tips for Heart Health' has reached 10k views! Keep it up.", time: "1h ago", read: false },
  { id: 3, type: "system", title: "Verification Completed", msg: "Your profile has been fully verified and is now visible to all patients.", time: "Yesterday", read: true },
  { id: 4, type: "message", title: "New Message from Ramesh", msg: "Doctor, what time should I take the blood pressure medicine exactly?", time: "Yesterday", read: true },
]

export default function DoctorNotificationsPage() {
  return (
    <DoctorLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6 pb-24 tracking-tight">
        <div className="flex items-center justify-between mb-2">
           <div>
              <h1 className="text-3xl font-black flex items-center gap-3">
                 <Bell className="w-8 h-8 text-medical-green animate-bounce" /> Alerts Center
              </h1>
              <p className="text-sm font-bold text-muted-foreground opacity-60">Stay updated with patient needs and profile activity.</p>
           </div>
           <button className="text-xs font-black uppercase text-medical-green hover:underline tracking-widest">Mark all as read</button>
        </div>

        <div className="space-y-3">
           {notifications.map((n, i) => (
              <motion.div 
                key={n.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`flex gap-4 p-5 rounded-3xl border transition-all cursor-pointer group ${!n.read ? "bg-white border-medical-green/40 shadow-xl shadow-medical-green/5" : "bg-medical-grey/20 border-medical-grey/50 opacity-70"}`}
              >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110
                   ${n.type === "appointment" ? "bg-medical-blue/10 text-medical-blue" : n.type === "post" ? "bg-medical-pink/10 text-medical-pink" : n.type === "system" ? "bg-medical-green/10 text-medical-green" : "bg-slate-100 text-slate-500"}`}>
                    {n.type === "appointment" ? <Calendar className="w-6 h-6" /> : n.type === "post" ? <HeartPulse className="w-6 h-6" /> : n.type === "system" ? <ShieldCheck className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                       <h4 className="font-black text-sm uppercase tracking-tight">{n.title}</h4>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">{n.msg}</p>
                 </div>
                 {!n.read && <div className="w-2.5 h-2.5 bg-medical-green rounded-full shadow-[0_0_10px_#34c759] mt-2" />}
              </motion.div>
           ))}
        </div>
      </div>
    </DoctorLayout>
  )
}
