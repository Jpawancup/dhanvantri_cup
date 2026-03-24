"use client"

import Link from "next/link"
import { HeartPulse } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-green/20 via-white to-medical-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex items-center gap-2 text-medical-green">
            <HeartPulse className="w-10 h-10" />
            <span className="text-3xl font-extrabold tracking-tight">Dhanvantri</span>
          </Link>
          <p className="text-muted-foreground text-sm">Your complete healthcare ecosystem</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-medical-grey">
          {children}
        </div>
      </div>
    </div>
  )
}
