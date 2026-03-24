"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout"
import { motion } from "framer-motion"
import { ShieldCheck, QrCode } from "lucide-react"

export default function AbhaLinkingPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-medical-blue" />
          </div>
          <h1 className="text-2xl font-bold">Link ABHA ID</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Connect your Ayushman Bharat Health Account for unified health records
          </p>
        </div>

        <div className="bg-medical-blue/5 rounded-xl p-4 border border-medical-blue/20">
          <h3 className="font-semibold text-sm text-medical-blue mb-2">What is ABHA?</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ayushman Bharat Health Account (ABHA) is a unique 14-digit health ID issued by the Government of India to access and share your health records digitally.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">ABHA Number</label>
            <Input placeholder="XX-XXXX-XXXX-XXXX" className="tracking-widest text-center font-mono" />
          </div>

          <div className="text-center text-sm text-muted-foreground">or</div>

          <Button variant="outline" className="w-full rounded-xl border-dashed border-medical-blue text-medical-blue hover:bg-medical-blue/5 py-5">
            <QrCode className="w-5 h-5 mr-2" /> Scan ABHA QR Code
          </Button>
        </div>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Link href="/profile-setup">
            <Button className="w-full bg-medical-blue hover:bg-medical-blue/90 text-white rounded-full py-5 font-semibold">
              Link & Continue
            </Button>
          </Link>
        </motion.div>

        <Link href="/dashboard">
          <p className="text-center text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            Skip — Link later from Profile
          </p>
        </Link>
      </div>
    </AuthLayout>
  )
}
