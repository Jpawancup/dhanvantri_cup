"use client"

import Link from "next/link"
import { HeartPulse, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 max-w-md"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-medical-green/10 rounded-full flex items-center justify-center ring-8 ring-medical-green/5 animate-pulse">
            <HeartPulse className="w-12 h-12 text-medical-green" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Oops! Page is under treatment.</h2>
          <p className="text-sm text-muted-foreground font-medium">The page you are looking for might have been moved, renamed, or is currently being updated by our medical team.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-14 rounded-full border-medical-grey font-bold gap-2">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full h-14 rounded-full bg-medical-green hover:bg-medical-green/90 text-white font-black gap-2 shadow-xl shadow-medical-green/20">
              <Home className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
        </div>

        <div className="pt-12 opacity-40">
           <p className="text-[10px] font-black uppercase tracking-[0.2em]">Dhanvantri Healthcare Ecosystem</p>
        </div>
      </motion.div>
    </div>
  )
}
