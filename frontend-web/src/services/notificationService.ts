// ============================================================
// REAL-TIME NOTIFICATION SIMULATION ENGINE
// Simulates server-push events using setInterval polling.
// In Phase 2, replace with WebSocket / SSE connection.
// ============================================================

import { getData, saveData, getCurrentUser } from "./localDb"
import { pushSystemNotification } from "./authService"

export type AppNotification = {
  id: string
  type: "auth" | "appointment" | "lab" | "prescription" | "pharmacy" | "post" | "system"
  title: string
  message: string
  icon: string
  read: boolean
  createdAt: string
}

// ─── Get all notifications for current user ───────────────────
export function getAllNotifications(): AppNotification[] {
  return getData("notifications") || []
}

// ─── Get unread count ─────────────────────────────────────────
export function getUnreadCount(): number {
  const notifs = getAllNotifications()
  return notifs.filter(n => !n.read).length
}

// ─── Mark all as read ─────────────────────────────────────────
export function markAllRead(): void {
  const notifs = getAllNotifications().map(n => ({ ...n, read: true }))
  saveData("notifications", notifs)
}

// ─── Mark one as read ─────────────────────────────────────────
export function markRead(id: string): void {
  const notifs = getAllNotifications().map(n =>
    n.id === id ? { ...n, read: true } : n
  )
  saveData("notifications", notifs)
}

// ─── Simulated real-time events ──────────────────────────────
const SIMULATED_EVENTS = [
  {
    type: "appointment" as const,
    title: "Appointment Reminder",
    message: "You have an appointment with Dr. Amit Sharma tomorrow at 10:30 AM.",
    icon: "📅",
  },
  {
    type: "lab" as const,
    title: "Lab Report Ready",
    message: "Your CBC test report has been uploaded and is ready to view.",
    icon: "🔬",
  },
  {
    type: "prescription" as const,
    title: "New Prescription",
    message: "Dr. Anjali Desai has created a new prescription for you.",
    icon: "💊",
  },
  {
    type: "pharmacy" as const,
    title: "Medicine Order Update",
    message: "Your pharmacy order is being prepared and will be dispatched soon.",
    icon: "🏥",
  },
  {
    type: "post" as const,
    title: "Dr. Amit Sharma posted",
    message: "Check out the latest health tip: '5 Habits for a Healthy Heart'",
    icon: "📰",
  },
  {
    type: "system" as const,
    title: "System Update",
    message: "New features are available! Check what's new in Dhanvantri.",
    icon: "✨",
  },
]

let pollingInterval: NodeJS.Timeout | null = null
let eventIndex = 0

// ─── Start polling (call once on app load) ────────────────────
export function startNotificationPolling(intervalMs = 30000): void {
  if (pollingInterval) return // Prevent duplicate intervals

  // Fire first event after a short delay
  setTimeout(() => {
    fireNextSimulatedEvent()
  }, 8000)

  pollingInterval = setInterval(() => {
    fireNextSimulatedEvent()
  }, intervalMs)
}

// ─── Stop polling ─────────────────────────────────────────────
export function stopNotificationPolling(): void {
  if (pollingInterval) {
    clearInterval(pollingInterval)
    pollingInterval = null
  }
}

function fireNextSimulatedEvent() {
  const user = getCurrentUser()
  if (!user) return // Only notify logged-in users

  const event = SIMULATED_EVENTS[eventIndex % SIMULATED_EVENTS.length]
  eventIndex++

  pushSystemNotification(event)

  // Dispatch a custom DOM event so listeners can react immediately
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dhanvantri:notification", { detail: event }))
  }
}

// ─── Subscribe to live notification events ────────────────────
export function onNewNotification(callback: (notif: any) => void): () => void {
  const handler = (e: Event) => callback((e as CustomEvent).detail)
  window.addEventListener("dhanvantri:notification", handler)
  return () => window.removeEventListener("dhanvantri:notification", handler)
}
