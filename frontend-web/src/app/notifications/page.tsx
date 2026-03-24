"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Bell, Heart, ShoppingBag, Calendar, Activity, MessageCircle, MoreVertical, ShieldCheck, ChevronRight, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const notifications = [
  { id: 1, type: "appointment", title: "Confirmed: Dr. Amit Sharma", body: "Your appointment is confirmed for tomorrow at 10:30 AM.", time: "2h ago", icon: Calendar, color: "bg-medical-green/10 text-medical-green", unread: true },
  { id: 2, type: "medicine", title: "Order Shipped: Metformin 500mg", body: "Our delivery partner is on the way. Expected in 45 mins.", time: "4h ago", icon: ShoppingBag, color: "bg-medical-blue/10 text-medical-blue", unread: true },
  { id: 3, type: "social", title: "Dr. Anjali Desai followed you", body: "Check out their latest health clips and insights.", time: "6h ago", icon: Heart, color: "bg-medical-pink/10 text-medical-pink", unread: false },
  { id: 4, type: "system", title: "Security Alert: New Login", body: "A new login was detected from Mumbai on Chrome.", time: "1d ago", icon: ShieldCheck, color: "bg-slate-100 text-slate-800", unread: false },
  { id: 5, type: "appointment", title: "Rate your visit: Apollo Hospitals", body: "How was your experience with Dr. Raj Patel yesterday?", time: "2d ago", icon: Calendar, color: "bg-amber-100 text-amber-600", unread: false },
  { id: 6, type: "medicine", title: "Refill Reminder: Pain Relief", body: "Your medicine stock might be low. Click to refill now.", time: "3d ago", icon: Zap, color: "bg-purple-100 text-purple-600", unread: false },
]

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="w-full max-w-3xl mx-auto p-4 md:p-8 space-y-8 flex flex-col justify-center">
        <div className="flex flex-col gap-1 tracking-tighter">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black flex items-center gap-3">
               Notifications <span className="bg-medical-green text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center justify-center animate-pulse">2 NEW</span>
            </h1>
            <Button variant="ghost" className="text-xs font-black text-medical-green uppercase tracking-widest hover:bg-medical-green/5">Mark all as read</Button>
          </div>
          <p className="text-sm font-bold text-muted-foreground opacity-60">Stay updated with your health and activity.</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full bg-medical-grey grid grid-cols-4 p-1 rounded-2xl h-14 border border-medical-grey/50">
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black text-xs uppercase">All</TabsTrigger>
            <TabsTrigger value="health" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black text-xs uppercase">Health</TabsTrigger>
            <TabsTrigger value="social" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black text-xs uppercase">Social</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black text-xs uppercase">Orders</TabsTrigger>
          </TabsList>

        <TabsContent value="all" className="mt-10 outline-none focus:outline-none">
           <div className="space-y-4">
              {notifications.map((n, i) => (
                <motion.div 
                  key={n.id} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`flex items-center gap-5 p-6 rounded-[2.5rem] border transition-all cursor-pointer group relative ${n.unread ? "bg-white border-medical-green/40 shadow-xl shadow-medical-green/10" : "bg-medical-grey/20 border-medical-grey/40 opacity-70"}`}
                >
                   <div className={`w-14 h-14 rounded-2xl ${n.color} flex-shrink-0 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                      <n.icon className="w-7 h-7" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                         <h4 className={`font-black text-[11px] uppercase tracking-widest ${n.unread ? "text-medical-green" : "text-foreground"}`}>{n.title}</h4>
                         <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">{n.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed italic opacity-80">{n.body}</p>
                   </div>
                   <div className="flex flex-col items-center justify-center gap-3">
                      {n.unread && <div className="w-3 h-3 bg-medical-green rounded-full shadow-[0_0_12px_#34c759] animate-pulse" />}
                      <ChevronRight className="w-5 h-5 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                   </div>
                </motion.div>
              ))}
           </div>
        </TabsContent>

          <TabsContent value="health" className="mt-8">
             <div className="text-center py-20 bg-white border border-dashed rounded-3xl space-y-4">
               <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-medical-green/5"><Activity className="w-8 h-8 text-medical-green" /></div>
               <p className="text-sm font-bold text-muted-foreground">No new health alerts.</p>
             </div>
          </TabsContent>
          <TabsContent value="social" className="mt-8">
             <div className="text-center py-20 bg-white border border-dashed rounded-3xl space-y-4">
               <div className="w-16 h-16 bg-medical-pink/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-medical-pink/5"><MessageCircle className="w-8 h-8 text-medical-pink" /></div>
               <p className="text-sm font-bold text-muted-foreground">No social notifications.</p>
             </div>
          </TabsContent>
          <TabsContent value="orders" className="mt-8">
             <div className="text-center py-20 bg-white border border-dashed rounded-3xl space-y-4">
               <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-medical-blue/5"><ShoppingBag className="w-8 h-8 text-medical-blue" /></div>
               <p className="text-sm font-bold text-muted-foreground">No order updates.</p>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
