"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, CheckCircle, FlaskConical, Calendar, Pill, ShoppingBag, Newspaper, Sparkles, ShieldCheck } from "lucide-react"
import { startNotificationPolling, onNewNotification, getAllNotifications, getUnreadCount, markAllRead } from "@/services/notificationService"
import { getCurrentUser } from "@/services/localDb"

const iconMap: Record<string, any> = {
  "📅": Calendar,
  "🔬": FlaskConical,
  "💊": Pill,
  "🏥": ShoppingBag,
  "📰": Newspaper,
  "✨": Sparkles,
  "🔐": ShieldCheck,
}

const typeColors: Record<string, string> = {
  appointment: "bg-blue-500",
  lab: "bg-indigo-500",
  prescription: "bg-green-500",
  pharmacy: "bg-amber-500",
  post: "bg-pink-500",
  system: "bg-medical-green",
  auth: "bg-slate-600",
}

type ToastNotif = {
  id: string
  title: string
  message: string
  icon: string
  type: string
}

export default function RealtimeNotifications() {
  const [toasts, setToasts] = useState<ToastNotif[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [allNotifs, setAllNotifs] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    setMounted(true)
    const user = getCurrentUser()
    if (!user) return

    // Boot polling engine
    startNotificationPolling(30000)

    // Load existing
    setAllNotifs(getAllNotifications())
    setUnreadCount(getUnreadCount())

    // Subscribe to live events
    const unsub = onNewNotification((notif) => {
      const toastId = Date.now().toString()
      const newToast: ToastNotif = {
        id: toastId,
        title: notif.title,
        message: notif.message,
        icon: notif.icon || "✨",
        type: notif.type,
      }

      setToasts(prev => [newToast, ...prev].slice(0, 3))
      setAllNotifs(getAllNotifications())
      setUnreadCount(getUnreadCount())

      // Auto-dismiss toast
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toastId))
      }, 5000)
    })

    cleanupRef.current = unsub
    return () => {
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  const handleOpenPanel = () => {
    setPanelOpen(p => !p)
    if (!panelOpen) {
      markAllRead()
      setUnreadCount(0)
      setAllNotifs(getAllNotifications())
    }
  }

  if (!mounted) return null

  const user = getCurrentUser()
  if (!user) return null

  return (
    <>
      {/* ── Live Toast Stack ─────────────────────────────── */}
      <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none max-w-[320px] w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const IconComp = iconMap[toast.icon] || Bell
            const color = typeColors[toast.type] || "bg-medical-green"
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex items-start gap-3 p-4"
              >
                <div className={`w-9 h-9 rounded-xl ${color} flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5`}>
                  <IconComp className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase tracking-tight text-foreground">{toast.title}</p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5 leading-snug">{toast.message}</p>
                </div>
                <button
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="text-muted-foreground/50 hover:text-foreground p-1 rounded-lg hover:bg-slate-100 transition-all flex-shrink-0 pointer-events-auto"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {/* countdown bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${color} origin-left`}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* ── Notification Bell (floating, mobile) ─────────── */}
      <div className="fixed bottom-28 right-4 z-[150] md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleOpenPanel}
          className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center relative"
        >
          <Bell className="w-5 h-5 text-foreground/70" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-medical-red rounded-full text-white text-[9px] font-black flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* ── Notification Panel (slide-over) ──────────────── */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[160]"
              onClick={() => setPanelOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-[170] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-medical-green" />
                  <h2 className="font-black text-base uppercase tracking-tight">Notifications</h2>
                </div>
                <button onClick={() => setPanelOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                {allNotifs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <CheckCircle className="w-12 h-12 text-slate-200 mb-3" />
                    <p className="font-black text-lg text-slate-400">All caught up!</p>
                    <p className="text-xs text-muted-foreground mt-1">New activity will appear here in real-time.</p>
                  </div>
                ) : (
                  allNotifs.map((n) => {
                    const IconComp = iconMap[n.icon] || Bell
                    const color = typeColors[n.type] || "bg-medical-green"
                    return (
                      <div key={n.id} className={`flex gap-3 p-4 ${!n.read ? "bg-medical-green/5" : ""} hover:bg-slate-50 transition-colors`}>
                        <div className={`w-9 h-9 rounded-xl ${color} flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5`}>
                          <IconComp className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-black uppercase tracking-tight text-foreground">{n.title}</p>
                            {!n.read && <div className="w-2 h-2 bg-medical-green rounded-full flex-shrink-0 mt-1" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground font-medium mt-0.5 leading-snug">{n.message}</p>
                          <p className="text-[9px] text-muted-foreground/50 uppercase font-black tracking-widest mt-1.5">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={() => { markAllRead(); setAllNotifs(getAllNotifications()); setUnreadCount(0) }}
                  className="w-full py-3 text-xs font-black uppercase text-medical-green tracking-widest hover:bg-medical-green/10 rounded-xl transition-all"
                >
                  Mark All as Read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
