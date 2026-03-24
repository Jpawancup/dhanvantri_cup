"use client"
// ============================================================
// useAuth hook — simplified for frontend-only mode.
// No JWT/token needed. Returns currentUser from mockStore.
// ============================================================

import { useMockStore } from "@/store/mockStore"

type AuthOptions = {
  requiredRole?: "patient" | "doctor" | "hospital" | "admin"
}

export function useAuth(options: AuthOptions = {}) {
  const { currentUser } = useMockStore()
  const user = currentUser
  const loading = false
  const authorized = !options.requiredRole || user.role === options.requiredRole

  return { user, loading, authorized }
}
