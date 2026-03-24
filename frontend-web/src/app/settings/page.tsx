"use client"

import DashboardLayout from "@/layouts/DashboardLayout"
import { ShieldCheck, User, Bell, Lock, Globe, HelpCircle, LogOut, ChevronRight, Moon, CreditCard, Droplet, UserMinus, PlusCircled, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

const settingsOptions = [
  { 
    title: "Account", 
    items: [
      { label: "Personal Info", icon: User, color: "bg-blue-100 text-blue-600", desc: "Update your personal details", href: "/profile-setup" },
      { label: "ABHA Linking", icon: LinkIcon, color: "bg-medical-green/10 text-medical-green", desc: "Manage your Ayushman Bharat Health Account", href: "/abha-linking" },
      { label: "Blood Group", icon: Droplet, color: "bg-red-50 text-red-500", desc: "Your blood group information", href: "#" },
    ]
  },
  { 
    title: "Security & Preferences", 
    items: [
      { label: "Notifications", icon: Bell, color: "bg-purple-50 text-purple-600", desc: "Alerts, messages, and order updates", href: "/notifications" },
      { label: "Privacy & Security", icon: Lock, color: "bg-slate-100 text-slate-800", desc: "Change password and login methods", href: "#" },
      { label: "Appearance", icon: Moon, color: "bg-indigo-50 text-indigo-600", desc: "Dark mode and theme settings", href: "#" },
      { label: "Payment Methods", icon: CreditCard, color: "bg-emerald-50 text-emerald-600", desc: "Manage cards and UPI for billing", href: "#" },
    ]
  },
  { 
    title: "Support", 
    items: [
      { label: "Help & FAQ", icon: HelpCircle, color: "bg-amber-50 text-amber-600", desc: "Get support for any issues", href: "#" },
      { label: "About Dhanvantri", icon: Globe, color: "bg-medical-blue/10 text-medical-blue", desc: "Terms, privacy, and team info", href: "#" },
    ]
  }
]

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32">
        <div className="flex flex-col gap-1 tracking-tighter">
          <h1 className="text-3xl font-black">Settings</h1>
          <p className="text-sm font-bold text-muted-foreground opacity-60">Manage your account and preferences.</p>
        </div>

        <div className="space-y-10">
          {settingsOptions.map((v, i) => (
             <div key={v.title} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 border-b pb-2">{v.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {v.items.map((it) => (
                      <Link key={it.label} href={it.href}>
                        <motion.div 
                          whileHover={{ y: -2, scale: 1.01 }}
                          className="bg-white border border-medical-grey/50 p-4 rounded-2xl flex items-center justify-between hover:border-medical-green/40 hover:shadow-lg transition-all shadow-sm group cursor-pointer"
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${it.color}`}>
                                 <it.icon className="w-6 h-6" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-sm tracking-tight">{it.label}</h4>
                                 <p className="text-[10px] text-muted-foreground font-medium leading-tight">{it.desc}</p>
                              </div>
                           </div>
                           <ChevronRight className="w-5 h-5 text-medical-grey group-hover:text-medical-green transition-transform group-hover:translate-x-1" />
                        </motion.div>
                      </Link>
                   ))}
                </div>
             </div>
          ))}
        </div>

        {/* Action Zone */}
        <div className="pt-10 space-y-4">
           <Button variant="outline" className="w-full flex items-center justify-between py-6 px-6 font-bold text-sm rounded-full border-medical-red/30 text-medical-red hover:bg-medical-red/5 hover:border-medical-red transition-all shadow-sm">
              <span className="flex items-center gap-2"><LogOut className="w-5 h-5" /> Logout Session</span>
              <ChevronRight className="w-4 h-4" />
           </Button>
           <Button variant="ghost" className="w-full text-xs font-black text-muted-foreground/60 uppercase tracking-widest hover:text-medical-red transition-colors py-4">
              Delete Account Permanently
           </Button>
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 opacity-40">
           <p className="text-[10px] font-black uppercase tracking-tighter">Dhanvantri Healthcare Ecosystem</p>
           <p className="text-[10px] font-bold">Version 1.0.4 (Phase 1 UI)</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
