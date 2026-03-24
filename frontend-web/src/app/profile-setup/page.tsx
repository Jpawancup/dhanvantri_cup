"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout"
import { Camera, CalendarDays, MapPin } from "lucide-react"

export default function ProfileSetupPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Help us personalize your experience</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-full bg-medical-grey border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Tap to upload photo</p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date of Birth</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" type="date" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Gender</label>
            <div className="grid grid-cols-3 gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button key={g} className="py-2.5 rounded-xl border border-border text-sm font-medium hover:border-medical-green hover:bg-medical-green/5 hover:text-medical-green transition-colors">
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Blood Group</label>
            <select className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-1 focus:ring-medical-green focus:outline-none">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">City / Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="e.g., Mumbai, Delhi, Bangalore" />
            </div>
          </div>
        </div>

        <Link href="/dashboard">
          <Button className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-5 font-semibold text-base">
            Save & Go to Dashboard
          </Button>
        </Link>
      </div>
    </AuthLayout>
  )
}
