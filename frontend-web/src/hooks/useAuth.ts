"use client"
// ============================================================
// useAuth hook — Route Guard + Token Verification
// Checks JWT validity on every page load.
// In Phase 2, replace isTokenValid() with API token refresh.
// ============================================================

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isTokenValid, getTokenPayload } from "@/services/authService"

type AuthOptions = {
  requiredRole?: "patient" | "doctor" | "hospital" | "admin"
  redirectTo?: string
}

export function useAuth(options: AuthOptions = {}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const valid = isTokenValid()

    if (!valid) {
      router.replace(options.redirectTo || "/login")
      return
    }

    const payload = getTokenPayload()

    if (options.requiredRole && payload?.role !== options.requiredRole) {
      // Wrong role — redirect to their own dashboard
      const roleRoutes: Record<string, string> = {
        patient: "/dashboard",
        doctor: "/doctor/dashboard",
        hospital: "/hospital/dashboard",
        admin: "/admin/dashboard",
      }
      router.replace(roleRoutes[payload?.role] || "/login")
      return
    }

    setUser(payload)
    setAuthorized(true)
    setLoading(false)
  }, [])

  return { user, loading, authorized }
}
