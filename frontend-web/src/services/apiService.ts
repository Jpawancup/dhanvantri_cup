// ============================================================
// API Layer Simulation (mockApi)
// Simulates async HTTP requests with fake latency.
// In Phase 2: replace each function body with real axios call.
// ============================================================

import { getData, saveData, generateId, getCurrentUser } from "./localDb"
import { getToken } from "./authService"
import { pushSystemNotification } from "./authService"

const FAKE_LATENCY_MS = 400

function fakeDelay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), FAKE_LATENCY_MS))
}

// Simulate Authorization header check
function getAuthHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ─── USER API ─────────────────────────────────────────────────
export const api = {
  // GET /users
  getUsers: () => fakeDelay(getData("users") || []),

  // GET /users/:id
  getUserById: (id: string) => {
    const users: any[] = getData("users") || []
    return fakeDelay(users.find(u => u.id === id) || null)
  },

  // POST /users
  createUser: (userData: any) => {
    const users: any[] = getData("users") || []
    const newUser = { ...userData, id: "u_" + generateId(), createdAt: new Date().toISOString() }
    users.push(newUser)
    saveData("users", users)
    return fakeDelay({ success: true, user: newUser })
  },

  // ─── APPOINTMENTS ──────────────────────────────────────────
  // GET /appointments
  getAppointments: (patientId?: string, doctorId?: string) => {
    let appts: any[] = getData("appointments") || []
    if (patientId) appts = appts.filter((a: any) => a.patientId === patientId)
    if (doctorId) appts = appts.filter((a: any) => a.doctorId === doctorId)
    return fakeDelay(appts)
  },

  // POST /appointments
  bookAppointment: (data: any) => {
    const appts: any[] = getData("appointments") || []
    const newAppt = { ...data, id: "a_" + generateId(), status: "confirmed", createdAt: new Date().toISOString() }
    appts.unshift(newAppt)
    saveData("appointments", appts)

    pushSystemNotification({
      type: "appointment",
      title: "Appointment Confirmed!",
      message: `Your appointment on ${data.date} at ${data.time} has been confirmed.`,
      icon: "📅",
    })

    return fakeDelay({ success: true, appointment: newAppt })
  },

  // ─── POSTS ────────────────────────────────────────────────
  getPosts: () => fakeDelay(getData("posts") || []),

  createPost: (content: string, image?: string) => {
    const user = getCurrentUser()
    if (!user) return fakeDelay({ success: false, error: "Not authenticated" })
    const posts: any[] = getData("posts") || []
    const newPost = {
      id: "post_" + generateId(),
      userId: user.id,
      content,
      image: image || null,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    }
    posts.unshift(newPost)
    saveData("posts", posts)
    return fakeDelay({ success: true, post: newPost })
  },

  likePost: (postId: string) => {
    const user = getCurrentUser()
    const posts: any[] = getData("posts") || []
    const updated = posts.map((p: any) => {
      if (p.id !== postId) return p
      const liked = p.likes.includes(user?.id)
      return {
        ...p,
        likes: liked
          ? p.likes.filter((id: string) => id !== user?.id)
          : [...p.likes, user?.id],
      }
    })
    saveData("posts", updated)
    return fakeDelay({ success: true })
  },

  // ─── PRESCRIPTIONS ────────────────────────────────────────
  getPrescriptions: (patientId?: string) => {
    let rxs: any[] = getData("prescriptions") || []
    if (patientId) rxs = rxs.filter((r: any) => r.patientId === patientId)
    return fakeDelay(rxs)
  },

  // ─── LAB ORDERS & REPORTS ─────────────────────────────────
  getLabOrders: (patientId?: string) => {
    let orders: any[] = getData("labOrders") || []
    if (patientId) orders = orders.filter((o: any) => o.patientId === patientId)
    return fakeDelay(orders)
  },

  getLabReports: (labOrderIds: string[]) => {
    const reps: any[] = getData("labReports") || []
    return fakeDelay(reps.filter((r: any) => labOrderIds.includes(r.labOrderId)))
  },

  // ─── HOSPITALS ────────────────────────────────────────────
  getHospitals: () => fakeDelay(getData("hospitals") || []),
  getHospitalById: (id: string) => {
    const hospitals: any[] = getData("hospitals") || []
    return fakeDelay(hospitals.find(h => h.id === id) || null)
  },

  // ─── DOCTORS ─────────────────────────────────────────────
  getDoctors: () => fakeDelay(getData("doctors") || []),
  getDoctorById: (id: string) => {
    const doctors: any[] = getData("doctors") || []
    return fakeDelay(doctors.find(d => d.id === id) || null)
  },
  
  // ─── AUTH HEADERS (utility for real API migration) ───────
  getHeaders: getAuthHeaders,
}
