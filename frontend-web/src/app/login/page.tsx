"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout"
import { motion } from "framer-motion"
import { Lock, Mail, HeartPulse } from "lucide-react"
import { useState } from "react"
import { useMockStore, MOCK_USERS } from "@/store/mockStore"
import { useRouter } from "next/navigation"

// Simple credential check against mock users
const CREDENTIALS: Record<string, { user: typeof MOCK_USERS[0]; password: string }> = {
  "pawan@gmail.com": { user: MOCK_USERS[0], password: "123" },
  "amit@gmail.com": { user: MOCK_USERS[1], password: "123" },
  "apollo@gmail.com": { user: MOCK_USERS[2], password: "123" },
  "admin@gmail.com": { user: MOCK_USERS[3], password: "123" },
}

export default function LoginPage() {
  const router = useRouter()
  const { setCurrentUser } = useMockStore()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      const cred = CREDENTIALS[identifier.toLowerCase().trim()]
      if (cred && cred.password === password) {
        setCurrentUser(cred.user)
        const role = cred.user.role
        if (role === "admin") router.push("/admin/dashboard")
        else if (role === "doctor") router.push("/doctor/dashboard")
        else if (role === "hospital") router.push("/hospital/dashboard")
        else router.push("/dashboard")
      } else {
        setError("Invalid credentials. Try pawan@gmail.com / 123")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your Dhanvantri account</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          {error && <div className="p-3 rounded-xl bg-medical-red/10 text-medical-red text-sm font-semibold">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mobile / Email</label>
            <div className="relative group/input">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-medical-green transition-colors" />
              <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="pl-9 ring-offset-background group-focus-within/input:ring-2 ring-medical-green/20"
                placeholder="Enter email (e.g. pawan@gmail.com)"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative group/input">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-medical-green transition-colors" />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 ring-offset-background group-focus-within/input:ring-2 ring-medical-green/20"
                type="password"
                placeholder="Enter your password (e.g. 123)"
                required
              />
            </div>
          </div>

          <div className="bg-medical-grey/30 rounded-2xl p-4 text-xs space-y-1.5">
            <p className="font-black uppercase tracking-widest text-muted-foreground">Demo Credentials</p>
            <p><span className="font-bold text-medical-green">Patient:</span> pawan@gmail.com / 123</p>
            <p><span className="font-bold text-medical-blue">Doctor:</span> amit@gmail.com / 123</p>
            <p><span className="font-bold text-teal-600">Hospital:</span> apollo@gmail.com / 123</p>
            <p><span className="font-bold text-slate-600">Admin:</span> admin@gmail.com / 123</p>
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-medical-green hover:bg-medical-green/90 text-white rounded-full py-5 font-semibold text-base shadow-lg shadow-medical-green/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        </form>

        <div className="relative text-center text-sm">
          <span className="bg-white px-3 text-muted-foreground relative z-10">or continue with</span>
          <div className="absolute inset-0 top-1/2 border-t border-border -z-0" />
        </div>

        <Button variant="outline" className="w-full rounded-full py-5 border-medical-grey font-medium">
          <HeartPulse className="w-4 h-4 mr-2 text-medical-green" /> Login with ABHA ID
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-medical-green font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
