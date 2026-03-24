"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Phone } from "lucide-react"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null))

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < 5) refs[idx + 1]?.current?.focus()
  }

  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        <div>
          <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-medical-green" />
          </div>
          <h1 className="text-2xl font-bold">OTP Verification</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter the 6-digit OTP sent to <span className="font-semibold text-foreground">+91 9876XXXXXX</span>
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={refs[i]}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-12 border-2 border-border rounded-xl text-center text-xl font-bold focus:border-medical-green focus:outline-none transition-colors"
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive OTP?{" "}
          <span className="text-medical-green font-semibold cursor-pointer hover:underline">Resend in 30s</span>
        </p>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Link href="/abha-linking">
            <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-5 font-semibold text-base">
              Verify OTP
            </Button>
          </Link>
        </motion.div>

        <Link href="/dashboard">
          <p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            Skip for now →
          </p>
        </Link>
      </div>
    </AuthLayout>
  )
}
