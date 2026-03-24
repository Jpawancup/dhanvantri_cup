// ============================================================
// FAKE JWT AUTHENTICATION SERVICE
// Simulates a real backend auth system using localStorage.
// In Phase 2, replace token generation with real API calls.
// ============================================================

import { saveData, getData, setCurrentUser } from "./localDb"

const TOKEN_KEY = "dhanvantri_auth_token"
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

// ─── JWT-style token structure ───────────────────────────────
// Header: { alg: "HS256", typ: "JWT" }
// Payload: { sub, name, role, iat, exp }
// Signature: fake HMAC using btoa (not cryptographic - dev only)

function base64url(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function generateFakeJWT(user: any): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const now = Date.now()
  const payload = base64url(
    JSON.stringify({
      sub: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      iat: now,
      exp: now + TOKEN_TTL_MS,
    })
  )
  const signature = base64url(`dhanvantri_secret_${user.id}_${now}`)
  return `${header}.${payload}.${signature}`
}

// ─── Parse token (decode, no signature verify) ───────────────
export function parseToken(token: string): any | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")))))
    return payload
  } catch {
    return null
  }
}

// ─── Token validity ──────────────────────────────────────────
export function isTokenValid(): boolean {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return false
  const payload = parseToken(token)
  if (!payload) return false
  return Date.now() < payload.exp
}

// ─── Get current token payload ───────────────────────────────
export function getTokenPayload(): any | null {
  if (typeof window === "undefined") return null
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null
  return parseToken(token)
}

// ─── Get raw token (for Authorization header simulation) ─────
export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

// ─── Login: validate credentials, mint token, update session ─
export function loginWithCredentials(email: string, password: string): { success: boolean; token?: string; user?: any; error?: string } {
  const users = getData("users") || []
  const user = users.find((u: any) => u.email === email && u.password === password)
  if (!user) {
    return { success: false, error: "Invalid email or password." }
  }
  const token = generateFakeJWT(user)
  localStorage.setItem(TOKEN_KEY, token)
  setCurrentUser(user)

  // Log session event to notifications
  pushSystemNotification({
    type: "auth",
    title: "Login Successful",
    message: `Welcome back, ${user.name}! You're logged in as ${user.role}.`,
    icon: "🔐",
  })

  return { success: true, token, user }
}

// ─── Logout: clear token and session ─────────────────────────
export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem("currentUser")
}

// ─── Push a system notification ──────────────────────────────
export function pushSystemNotification(notif: {
  type: string
  title: string
  message: string
  icon?: string
}) {
  if (typeof window === "undefined") return
  const notifs = getData("notifications") || []
  notifs.unshift({
    id: Date.now().toString(),
    ...notif,
    read: false,
    createdAt: new Date().toISOString(),
  })
  // Keep only last 50
  saveData("notifications", notifs.slice(0, 50))
}
