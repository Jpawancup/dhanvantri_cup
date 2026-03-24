"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout"
import { motion } from "framer-motion"
import { User, Phone, Lock, ChevronDown } from "lucide-react"

import { useState } from "react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "Patient",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = "/otp-verification"
    }, 1200)
  }
  return (
    <AuthLayout>
      <div className="space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join India&apos;s healthcare ecosystem</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">First Name</label>
              <div className="relative group/input">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-medical-green transition-colors" />
                <Input 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="pl-9 ring-offset-background group-focus-within/input:ring-2 ring-medical-green/20" 
                  placeholder="Prakash" 
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Last Name</label>
              <Input 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="ring-offset-background focus-visible:ring-2 focus-visible:ring-medical-green/20"
                placeholder="Kumar" 
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Mobile Number</label>
            <div className="relative group/input">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-medical-green transition-colors" />
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="pl-9 ring-offset-background group-focus-within/input:ring-2 ring-medical-green/20" 
                placeholder="+91 9876543210" 
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Register As</label>
            <div className="relative group/input">
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-white appearance-none focus:ring-1 focus:ring-medical-green focus:outline-none group-focus-within/input:ring-2 ring-medical-green/20 transition-all font-medium"
              >
                <option>Patient</option>
                <option>Doctor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Password</label>
            <div className="relative group/input">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-medical-green transition-colors" />
              <Input 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="pl-9 ring-offset-background group-focus-within/input:ring-2 ring-medical-green/20" 
                type="password" 
                placeholder="Create a strong password" 
                required
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            By registering, you agree to our <span className="text-medical-green font-medium cursor-pointer hover:underline">Terms of Service</span> and <span className="text-medical-green font-medium cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-5 font-semibold text-base shadow-lg shadow-medical-green/20 transition-all"
            >
              {isLoading ? (
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Sending OTP...
                 </div>
              ) : "Send OTP & Verify"}
            </Button>
          </motion.div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-medical-green font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
