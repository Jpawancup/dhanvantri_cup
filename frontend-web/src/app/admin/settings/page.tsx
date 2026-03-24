"use client"

import AdminLayout from "@/layouts/AdminLayout"
import Link from "next/link"
import { ShieldCheck, User, Bell, Lock, Globe, HelpCircle, LogOut, ChevronRight, Moon, CreditCard, Activity, Database, Server, Key, Users, Settings, Plus, FileText, Share2, Award, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

const adminSettings = [
  { 
    title: "System Control", 
    items: [
      { label: "Server Metrics", icon: Activity, color: "bg-medical-blue/10 text-medical-blue", desc: "Live CPU & RAM performance", href: "/admin/system/metrics" },
      { label: "Database Health", icon: Database, color: "bg-medical-green/10 text-medical-green", desc: "Uptime and redundancy status", href: "/admin/system/database" },
      { label: "API Rate Limits", icon: Server, color: "bg-purple-100 text-purple-600", desc: "Manage REST gateway traffic", href: "/admin/system/api-limits" },
    ]
  },
  { 
    title: "Security & Access", 
    items: [
      { label: "Role Permissions", icon: Users, color: "bg-slate-100 text-slate-800", desc: "Manage Admin & Doctor roles", href: "/admin/system/roles" },
      { label: "Global Auth Keys", icon: Key, color: "bg-amber-100 text-amber-600", desc: "Rotate JWT & SSH certificates", href: "/admin/system/security" },
      { label: "System Firewall", icon: ShieldCheck, color: "bg-medical-red/10 text-medical-red", desc: "Monitor DDoS and intrusion attempts", href: "/admin/system/firewall" },
    ]
  },
  { 
    title: "Governance", 
    items: [
      { label: "Audit Logs", icon: FileText, color: "bg-medical-grey text-slate-500", desc: "Track every admin modification", href: "/admin/system/audit-logs" },
      { label: "Compliance (NABH)", icon: Award, color: "bg-medical-green/10 text-medical-green", desc: "Digital safety & data guidelines", href: "/admin/system/compliance" },
    ]
  }
]

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12 pb-32 tracking-tight">
        <div className="flex flex-col gap-1 tracking-tighter">
          <h1 className="text-3xl font-black flex items-center gap-3">
             <Settings className="w-8 h-8 text-medical-blue animate-spin-slow" /> Global System Config
          </h1>
          <p className="text-sm font-bold text-muted-foreground opacity-60 uppercase tracking-widest text-[10px]">Master override and technical governance for Dhanvantri Ecosystem.</p>
        </div>

        {/* Global Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[["Uptime", "99.98%"], ["Nodes", "12 Active"], ["Security", "SSL A+"], ["Version", "1.0.4"]].map(([k,v]) => (
              <div key={k} className="bg-white border border-medical-grey/50 p-6 rounded-3xl shadow-sm text-center space-y-1 group hover:border-medical-blue/40 transition-all">
                 <p className="text-2xl font-black tracking-tighter">{v}</p>
                 <p className="text-[10px] font-black uppercase text-muted-foreground opacity-60 tracking-widest group-hover:text-medical-blue">{k}</p>
              </div>
           ))}
        </div>

        <div className="space-y-10">
           {adminSettings.map((v) => (
              <div key={v.title} className="space-y-4">
                 <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 border-b pb-2">{v.title}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {v.items.map((it) => (
                       <Link key={it.label} href={it.href}>
                         <motion.div 
                           whileHover={{ y: -2, scale: 1.01 }}
                           className="bg-white border border-medical-grey/50 p-6 rounded-3xl flex items-center justify-between hover:border-medical-blue/40 hover:shadow-xl hover:shadow-medical-blue/5 transition-all group cursor-pointer relative overflow-hidden"
                         >
                            <div className="flex items-center gap-5 relative z-10">
                               <div className={`w-14 h-14 rounded-2xl ${it.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                                  <it.icon className="w-7 h-7" />
                               </div>
                               <div className="space-y-0.5">
                                  <h4 className="font-extrabold text-sm tracking-tight uppercase tracking-widest">{it.label}</h4>
                                  <p className="text-[10px] text-muted-foreground font-black opacity-60 italic leading-snug">{it.desc}</p>
                               </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-medical-grey group-hover:text-medical-blue transition-transform group-hover:translate-x-1" />
                         </motion.div>
                       </Link>
                    ))}
                 </div>
              </div>
           ))}
        </div>

        {/* Technical Health Monitoring Card */}
        <div className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl ring-8 ring-slate-950/10">
           <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-black leading-tight flex items-center gap-3">Service Health <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse" /></h3>
                 <span className="text-[10px] font-black uppercase bg-medical-green text-white px-3 py-1 rounded-full">All Systems Operational</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                       <span>Database Load</span>
                       <span>24% Capacity</span>
                    </div>
                    <Progress value={24} className="h-2 rounded-full bg-white/10" />
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                       <span>Active Socket Conn</span>
                       <span>4.2k Active</span>
                    </div>
                    <Progress value={65} className="h-2 rounded-full bg-white/10" />
                 </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4">
                 {[["Main Gateway", "ONLINE"], ["Auth Cluster", "ONLINE"], ["Redis Caching", "BALANCED"], ["Prisma ORM", "OPTIMAL"]].map(([k,v]) => (
                    <div key={k} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 group hover:bg-white/10 transition-all">
                       <div className="w-1.5 h-1.5 rounded-full bg-medical-green shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{k}</span>
                       <span className="text-[10px] font-black text-white">{v}</span>
                    </div>
                 ))}
              </div>
           </div>
           <Activity className="absolute -bottom-16 -right-16 w-80 h-80 opacity-5 rotate-12 text-medical-blue fill-medical-blue" />
        </div>

        {/* Danger Action Zone */}
        <div className="pt-10 space-y-4">
           <Button variant="outline" className="w-full flex items-center justify-between py-8 px-10 font-black text-sm rounded-full border-medical-red/30 text-medical-red hover:bg-medical-red/5 hover:border-medical-red transition-all shadow-xl group">
              <span className="flex items-center gap-4"><LogOut className="w-6 h-6 group-hover:animate-bounce" /> Shutdown Cluster Node (Safe)</span>
              <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100" />
           </Button>
           <Button variant="ghost" className="w-full text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] hover:text-medical-red transition-colors py-4">
              Factory Reset Ecosystem (Requires Root Key)
           </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
