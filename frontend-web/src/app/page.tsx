"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Users, ShieldCheck, Stethoscope, Building2, Microscope, Droplet, Ambulance, Pill, MessageSquare, Rss, Video, CheckCircle2, Globe, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

const features = [
  { icon: Users, label: "Find Doctors", desc: "Search by specialization, location, and availability", href: "/doctors" },
  { icon: Building2, label: "Hospitals", desc: "Browse hospitals, beds availability & facilities", href: "/hospitals" },
  { icon: Microscope, label: "Diagnostics", desc: "Book lab tests at nearby diagnostic centers", href: "/diagnostics" },
  { icon: Droplet, label: "Blood Bank", desc: "Locate and request blood units in emergencies", href: "/blood" },
  { icon: Ambulance, label: "Ambulance", desc: "Request basic, advanced or ICU ambulances", href: "/ambulance" },
  { icon: Pill, label: "Pharmacy", desc: "Order medicines with prescription upload", href: "/medicine" },
  { icon: Rss, label: "Health Feed", desc: "Health tips and advice from top doctors", isLocked: true },
  { icon: Video, label: "Reels / Clips", desc: "Short-form health videos from experts", isLocked: true },
  { icon: MessageSquare, label: "ChitChats", desc: "Direct messaging with doctors & friends", isLocked: true },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Home() {
  const router = useRouter()
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [activeMottoStep, setActiveMottoStep] = useState(0)

  const handleFeatureClick = (f: any) => {
    if (f.isLocked) {
      setShowLoginPopup(true)
    } else {
      router.push(f.href)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Dhanvantri Logo" className="h-8 w-auto" />
            <span className="text-2xl font-extrabold tracking-tight text-medical-green">Dhanvantri</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-foreground/70">
             <a href="#motto" className="hover:text-medical-green transition-colors">Philosophy</a>
            <a href="#features" className="hover:text-medical-green transition-colors">Features</a>
            <a href="#roles" className="hover:text-medical-green transition-colors">For You</a>
          </nav>
          <div className="flex gap-2">
            <Link href="/login"><Button variant="ghost" className="text-medical-green hover:text-medical-green/90">Login</Button></Link>
            <Link href="/dashboard"><Button className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full px-5">Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-medical-green/10 via-white to-medical-blue/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-medical-green/10 text-medical-green text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-medical-green/20">
              India&apos;s Healthcare Ecosystem 🏥
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-none mb-6">
              Healthcare<br />
              <span className="text-medical-green">Meets Community</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Book doctors, find hospitals, order medicines, request ambulances — all while staying connected with a modern health-social feed.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button size="lg" className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-medical-green/30">
                    Patient Dashboard
                  </Button>
                </motion.div>
              </Link>
              <Link href="/doctor/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button size="lg" variant="outline" className="w-full rounded-full px-8 py-6 text-base font-semibold border-medical-blue text-medical-blue hover:bg-medical-blue/5">
                    Doctor Portal
                  </Button>
                </motion.div>
              </Link>
              <Link href="/hospital/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button size="lg" variant="outline" className="w-full rounded-full px-8 py-6 text-base font-semibold border-teal-600 text-teal-600 hover:bg-teal-50">
                    Hospital Dashboard
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button size="lg" variant="outline" className="w-full rounded-full px-8 py-6 text-base font-semibold border-slate-600 text-slate-600 hover:bg-slate-50">
                    Admin Portal
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-medical-green/10 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-medical-blue/10 rounded-full filter blur-3xl -z-10" />
      </section>

      {/* Interactive Philosophy Section */}
      <section id="motto" className="py-24 bg-white relative overflow-hidden border-b border-t border-medical-grey/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-sans text-foreground leading-tight mb-12 md:mb-20 tracking-tighter"
          >
             &ldquo;Affordable healthcare is not <span className="text-medical-red">charity</span>, it is <span className="text-medical-green underline decoration-wavy underline-offset-8">dignity</span>&rdquo;
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { id: 1, title: "Accessible", desc: "Search by specialization, location, and availability", icon: Globe, color: "text-medical-green", bg: "bg-medical-green/10" },
               { id: 2, title: "Affordable", desc: "Browse hospitals, beds availability & facilities", icon: Wallet, color: "text-amber-600", bg: "bg-amber-100" },
               { id: 3, title: "Dignified", desc: "Order medicines with prescription upload", icon: ShieldCheck, color: "text-medical-blue", bg: "bg-medical-blue/10" },
             ].map((step, idx) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 rounded-[3rem] border border-medical-grey/60 bg-white shadow-xl shadow-medical-grey/10 relative group"
                >
                   <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm border-4 border-white shadow-lg z-20">
                      {step.id}
                   </div>
                   <div className={`w-20 h-20 rounded-[1.5rem] ${step.bg} ${step.color} mx-auto flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="w-10 h-10" />
                   </div>
                   <h3 className="text-3xl uppercase tracking-tighter mb-4">{step.title}</h3>
                   <p className="text-[10px] font-black text-muted-foreground opacity-50 leading-relaxed uppercase tracking-widest">{step.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-medical-green/[0.02] -z-10" />
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-medical-grey/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Everything healthcare, one platform</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From finding specialists to watching health reels — Dhanvantri covers every touchpoint of modern healthcare.</p>
          </div>
          <motion.div
            variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.label} variants={item} onClick={() => handleFeatureClick(f)}>
                <Card className="rounded-2xl border-medical-grey/60 hover:border-medical-green/50 hover:shadow-md transition-all h-full cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-medical-green/10 text-medical-green rounded-xl flex items-center justify-center mb-2 group-hover:bg-medical-green group-hover:text-white transition-colors relative">
                      <f.icon className="w-6 h-6" />
                      {f.isLocked && <div className="absolute -top-1 -right-1 w-3 h-3 bg-medical-blue rounded-full ring-2 ring-white"></div>}
                    </div>
                    <CardTitle className="text-base flex items-center justify-between">
                      {f.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role CTA Cards */}
      <section id="roles" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Dashboards for every role</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: "Patient", desc: "Book appointments, track health records & connect with doctors.", href: "/dashboard", icon: Users, color: "from-medical-green to-medical-blue", btn: "Patient Dashboard" },
              { role: "Doctor", desc: "Manage consultations, write prescriptions & post health insights.", href: "/doctor/dashboard", icon: Stethoscope, color: "from-medical-blue to-medical-green", btn: "Doctor Dashboard" },
              { role: "Hospital", desc: "Manage hospital operations, doctors, pharmacy & labs.", href: "/hospital/dashboard", icon: Building2, color: "from-emerald-500 to-teal-700", btn: "Hospital Dashboard" },
              { role: "Admin", desc: "Verify doctors, moderate posts & view platform analytics.", href: "/admin/dashboard", icon: ShieldCheck, color: "from-slate-700 to-slate-500", btn: "Admin Dashboard" },
            ].map((r) => (
              <motion.div key={r.role} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full rounded-2xl border-medical-grey/60 overflow-hidden shadow-sm">
                  <div className={`bg-gradient-to-br ${r.color} p-8 flex justify-center text-white`}>
                    <r.icon className="w-16 h-16 opacity-90" />
                  </div>
                  <CardHeader>
                    <CardTitle>{r.role}</CardTitle>
                    <CardDescription>{r.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={r.href}>
                      <Button className="w-full rounded-full bg-foreground hover:bg-foreground/90 text-background">{r.btn}</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 text-center text-sm opacity-80">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.png" className="w-5 h-5 grayscale" />
          <span className="font-bold text-base">Dhanvantri</span>
        </div>
        <p>Phase 1 — UI Development. &copy; 2026 Dhanvantri Healthcare Ecosystem</p>
      </footer>

      {/* Login Popup Dialog */}
      <Dialog open={showLoginPopup} onOpenChange={setShowLoginPopup}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6 text-center border-none shadow-2xl overflow-hidden">
          <div className="absolute top-0 w-full h-32 bg-medical-green/10 left-0 -z-10" />
          <DialogHeader className="flex flex-col items-center mt-4">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 text-medical-green border border-medical-grey/50">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-black">Hold on!</DialogTitle>
            <DialogDescription className="text-base text-center pt-2 pb-6 text-muted-foreground font-medium">
              You must be logged in to view Social Health Feeds, Reels, or send direct messages to doctors.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
             <Button onClick={() => router.push('/login')} className="bg-medical-green hover:bg-medical-green/90 text-white rounded-full font-bold h-12">Login or Register</Button>
             <Button onClick={() => setShowLoginPopup(false)} variant="ghost" className="rounded-full text-muted-foreground font-bold hover:bg-medical-grey">Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
