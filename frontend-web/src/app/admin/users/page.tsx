"use client"

import AdminLayout from "@/layouts/AdminLayout"
import { Users, Search, SlidersHorizontal, MoreVertical, CheckCircle2, Mail, Activity } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_USERS } from "@/store/mockStore"

export default function AdminUsersPage() {
  const users = MOCK_USERS

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8 pb-32 tracking-tight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 tracking-tighter">
            <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
              <Users className="w-7 h-7 md:w-8 md:h-8 text-medical-blue animate-pulse" /> User Management
            </h1>
            <p className="text-sm font-bold text-muted-foreground opacity-60">Control all patient and staff accounts within the ecosystem.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full border-medical-grey h-11 md:h-12 px-5 md:px-6 font-black text-xs uppercase tracking-widest shadow-sm">Export CSV</Button>
            <Link href="/admin/users/add">
              <Button className="bg-medical-blue hover:bg-medical-blue/90 text-white rounded-full h-11 md:h-12 px-6 md:px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-medical-blue/20">+ Add User</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="relative group flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:text-medical-blue transition-colors" />
            <Input className="pl-11 rounded-3xl bg-white border border-medical-grey/50 h-12 md:h-14 shadow-sm focus:ring-4 focus:ring-medical-blue/10 transition-all font-medium text-sm" placeholder="Search by name, email, or role..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 md:w-14 md:h-14 border-medical-grey flex-shrink-0 shadow-sm">
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Tabs defaultValue="all" className="flex-1">
              <TabsList className="w-full bg-medical-grey/50 grid grid-cols-3 p-1 rounded-2xl h-12 md:h-14 border border-medical-grey/50">
                <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">All</TabsTrigger>
                <TabsTrigger value="patients" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Patients</TabsTrigger>
                <TabsTrigger value="doctors" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase transition-all tracking-widest">Doctors</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-medical-grey/60 shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-medical-grey/30 border-b border-medical-grey/50">
                <th className="px-4 md:px-6 py-4 md:py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">User / Profile</th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Role</th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Joined</th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Status</th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-medical-grey/40">
              {users.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-medical-blue/5 transition-all group/row"
                >
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={u.profileImage || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300"}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover shadow-md border-2 border-white group-hover/row:scale-110 transition-transform flex-shrink-0"
                        alt=""
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-xs md:text-sm tracking-tight truncate">{u.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground opacity-60 flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" /> {u.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${u.role === "doctor" ? "bg-medical-green/10 text-medical-green" : u.role === "hospital" ? "bg-teal-100 text-teal-600" : u.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-medical-blue/10 text-medical-blue"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-80">24 Mar 2026</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-medical-green">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/users/${u.id}`}>
                        <Button variant="outline" size="sm" className="rounded-xl border-medical-grey hover:bg-medical-blue/10 h-8 md:h-9 font-black text-[10px] transition-all">Details</Button>
                      </Link>
                      <button className="p-2 rounded-xl hover:bg-medical-grey transition-colors text-muted-foreground/40">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Health Pulse */}
        <div className="bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 shadow-2xl">
          <div className="relative z-10 space-y-3 md:space-y-4">
            <h3 className="text-xl md:text-2xl font-black flex items-center gap-3">
              Live Active Users
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-medical-green animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </h3>
            <p className="text-sm font-medium opacity-60 leading-relaxed max-w-sm">
              Current server load is at <span className="text-medical-green font-black underline">Optimal</span> level. No critical security breaches in the last 24h.
            </p>
          </div>
          <div className="relative z-10 flex gap-8 md:gap-10">
            {[["Signups (24h)", "+12.4%"], ["Retention", "84.2%"]].map(([k, v]) => (
              <div key={k} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-white tracking-widest">{v}</span>
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mt-1">{k}</span>
              </div>
            ))}
          </div>
          <Activity className="absolute -bottom-12 -left-12 w-64 h-64 opacity-5 rotate-12 text-medical-blue fill-medical-blue" />
        </div>
      </div>
    </AdminLayout>
  )
}
