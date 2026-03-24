// ============================================================
//  DHANVANTRI — Central Frontend Mock Store (No localStorage)
//  Pure in-memory Zustand store for all app data
// ============================================================

import { create } from "zustand";

// ── Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  role: "patient" | "doctor" | "hospital" | "admin";
  email: string;
  profileImage?: string;
  specialization?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  experience: number;
  rating: number;
  reviews: number;
  distance: string;
  fee: number;
  available: boolean;
  image: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: string;
  bedsAvailable: number;
  image: string;
  facilities: string[];
  location?: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  type: "Video" | "In-Person";
  status: "confirmed" | "pending" | "completed" | "cancelled";
  image: string;
  patientName?: string;
}

export interface Post {
  id: string;
  author: string;
  role: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  avatar: string;
  liked?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  type: "appointment" | "lab" | "prescription" | "pharmacy" | "post" | "system";
  read: boolean;
  createdAt: string;
}

// ── Static Mock Data ───────────────────────────────────────

export const MOCK_USERS: User[] = [
  { id: "u1", name: "Pawan Kumar", role: "patient", email: "pawan@gmail.com", profileImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300" },
  { id: "u2", name: "Dr. Amit Sharma", role: "doctor", email: "amit@gmail.com", specialization: "Cardiologist", profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" },
  { id: "u3", name: "Apollo Admin", role: "hospital", email: "apollo@gmail.com", profileImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=300" },
  { id: "u4", name: "Super Admin", role: "admin", email: "admin@gmail.com", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" },
];

export const MOCK_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Amit Sharma", specialization: "Cardiologist", hospital: "Apollo Hospitals", experience: 14, rating: 4.8, reviews: 220, distance: "2.1 km", fee: 800, available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", name: "Dr. Anjali Desai", specialization: "Neurologist", hospital: "Fortis Healthcare", experience: 10, rating: 4.7, reviews: 180, distance: "3.5 km", fee: 1200, available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" },
  { id: "3", name: "Dr. Raj Patel", specialization: "Orthopedic", hospital: "AIIMS Delhi", experience: 18, rating: 4.9, reviews: 410, distance: "1.8 km", fee: 600, available: false, image: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=2070&auto=format&fit=crop" },
  { id: "4", name: "Dr. Sunita Rao", specialization: "Gynecologist", hospital: "Manipal Hospital", experience: 12, rating: 4.6, reviews: 150, distance: "4.0 km", fee: 900, available: true, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop" },
  { id: "5", name: "Dr. Vikram Nair", specialization: "Dermatologist", hospital: "Medanta Delhi", experience: 8, rating: 4.5, reviews: 98, distance: "5.2 km", fee: 700, available: true, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop" },
  { id: "6", name: "Dr. Priya Mehta", specialization: "Pediatrician", hospital: "Rainbow Children's", experience: 6, rating: 4.8, reviews: 312, distance: "2.8 km", fee: 550, available: true, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop" },
];

export const MOCK_HOSPITALS: Hospital[] = [
  { id: "1", name: "Apollo Hospitals", type: "Multi-Specialty", rating: 4.8, distance: "2.1 km", bedsAvailable: 45, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop", facilities: ["ICU", "Emergency", "OT", "Lab", "Pharmacy"], location: "Hyderabad" },
  { id: "2", name: "Fortis Healthcare", type: "Super-Specialty", rating: 4.6, distance: "3.5 km", bedsAvailable: 22, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop", facilities: ["ICU", "NICU", "OT", "Dialysis", "Radiology"], location: "Bangalore" },
  { id: "3", name: "AIIMS Delhi", type: "General", rating: 4.9, distance: "1.8 km", bedsAvailable: 150, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2028&auto=format&fit=crop", facilities: ["All Specialties", "Research", "Emergency", "Trauma"], location: "Delhi" },
  { id: "4", name: "Manipal Hospital", type: "Multi-Specialty", rating: 4.5, distance: "4.0 km", bedsAvailable: 34, image: "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2070&auto=format&fit=crop", facilities: ["Gynecology", "Maternity", "NICU", "OT"], location: "Mumbai" },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", doctor: "Dr. Amit Sharma", specialization: "Cardiologist", date: "March 24, 2026", time: "10:30 AM", type: "Video", status: "confirmed", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", doctor: "Dr. Anjali Desai", specialization: "Neurologist", date: "March 28, 2026", time: "2:00 PM", type: "In-Person", status: "pending", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" },
  { id: "3", doctor: "Dr. Raj Patel", specialization: "Orthopedic", date: "April 2, 2026", time: "11:00 AM", type: "In-Person", status: "confirmed", image: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=2070&auto=format&fit=crop" },
];

export const MOCK_DOCTOR_SCHEDULE: Array<Appointment & { patientName: string }> = [
  { id: "s1", patientName: "Pawan Kumar", doctor: "Self", specialization: "Cardiologist", date: "Today", time: "10:30 AM", type: "Video", status: "confirmed", image: "" },
  { id: "s2", patientName: "Ravi Sharma", doctor: "Self", specialization: "Cardiologist", date: "Today", time: "12:00 PM", type: "In-Person", status: "pending", image: "" },
  { id: "s3", patientName: "Sneha Patel", doctor: "Self", specialization: "Cardiologist", date: "Today", time: "2:30 PM", type: "Video", status: "confirmed", image: "" },
];

export const MOCK_POSTS: Post[] = [
  { id: "1", author: "Dr. Anjali Desai", role: "Neurologist", time: "2h ago", content: "Regular sleep patterns are the single most important factor for cognitive longevity. Aim for 7–8 hours of uninterrupted rest. 🌱💤 #HealthTips", image: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=2070&auto=format&fit=crop", likes: 1200, comments: 48, avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300" },
  { id: "2", author: "Dr. Amit Sharma", role: "Cardiologist", time: "5h ago", content: "5 early warning signs of heart disease that are easy to miss. Thread 🧵👇 #HeartHealth #Cardiology", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop", likes: 3400, comments: 102, avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" },
  { id: "3", author: "Dr. Raj Patel", role: "Orthopedic Surgeon", time: "8h ago", content: "Posture awareness while working from home is critical. Here's a 5-minute ergonomic checklist you can do right now. 🦴💪", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop", likes: 890, comments: 34, avatar: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300" },
  { id: "4", author: "Dr. Sunita Rao", role: "Gynecologist", time: "1d ago", content: "Hydration tip: Most people confuse thirst with hunger. By the time you feel thirsty, you're already mildly dehydrated. Keep a 1L water bottle at your desk! 💧", likes: 2100, comments: 67, avatar: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=300" },
  { id: "5", author: "Apollo Hospitals", role: "Hospital", time: "1d ago", content: "We've launched our new AI-powered diagnostics centre. Get your health reports in under 2 hours! Book your slot today. 🏥🔬", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop", likes: 540, comments: 23, avatar: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=300" },
];

export const MOCK_STORIES = [
  { id: "1", name: "Dr. Sharma", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" },
  { id: "2", name: "Priya", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300" },
  { id: "3", name: "Dr. Patel", img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300" },
  { id: "4", name: "Ravi", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300" },
  { id: "5", name: "Dr. Anjali", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300" },
  { id: "6", name: "Sneha", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300" },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Appointment Confirmed", message: "Your appointment with Dr. Amit Sharma is confirmed for March 24 at 10:30 AM", icon: "📅", type: "appointment", read: false, createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
  { id: "n2", title: "Lab Report Ready", message: "Your CBC blood test report is now available for download", icon: "🔬", type: "lab", read: false, createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  { id: "n3", title: "Prescription Issued", message: "Dr. Anjali Desai has issued a new prescription for you", icon: "💊", type: "prescription", read: true, createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: "n4", title: "Medicine Dispatched", message: "Your pharmacy order #PH-2024 has been dispatched", icon: "🏥", type: "pharmacy", read: true, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
];

export const MOCK_STATS = {
  patient: { appointments: 2, prescriptions: 3, labReports: 5, healthScore: 82 },
  doctor: { todayAppointments: 3, totalPatients: 540, prescriptions: 12, earnings: 94200 },
  admin: { totalUsers: 24780, verifiedDoctors: 1240, listedHospitals: 386, totalPosts: 18920 },
  hospital: { patients: 128, doctors: 24, appointments: 42, revenue: 284500 },
};

// ── Zustand Store ──────────────────────────────────────────
interface MockState {
  // Current user (simulating session)
  currentUser: User;
  setCurrentUser: (user: User) => void;

  // Data
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, "id">) => void;

  posts: Post[];
  likedPosts: string[];
  toggleLike: (postId: string) => void;

  notifications: Notification[];
  markAllRead: () => void;
  addNotification: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;

  // UI
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doc: Doctor | null) => void;

  savedReels: string[];
  toggleSavedReel: (id: string) => void;
}

// Helper: resolve initial user from session
function getInitialUser(): User {
  if (typeof window === "undefined") return MOCK_USERS[0];
  try {
    const saved = sessionStorage.getItem("dhanvantri_user");
    if (saved) {
      const parsed = JSON.parse(saved) as User;
      const found = MOCK_USERS.find((u) => u.id === parsed.id);
      return found ?? MOCK_USERS[0];
    }
  } catch {}
  return MOCK_USERS[0];
}

export const useMockStore = create<MockState>()((set, get) => ({
  currentUser: getInitialUser(),
  setCurrentUser: (user) => {
    // Persist in sessionStorage so refresh keeps the same user
    try { sessionStorage.setItem("dhanvantri_user", JSON.stringify(user)); } catch {}
    set({ currentUser: user })
  },

  appointments: [...MOCK_APPOINTMENTS],
  addAppointment: (apt) =>
    set((state) => ({
      appointments: [{ ...apt, id: `a_${Date.now()}` }, ...state.appointments],
    })),

  posts: [...MOCK_POSTS],
  likedPosts: [],
  toggleLike: (postId) =>
    set((state) => {
      const isLiked = state.likedPosts.includes(postId);
      return {
        likedPosts: isLiked
          ? state.likedPosts.filter((id) => id !== postId)
          : [...state.likedPosts, postId],
        posts: state.posts.map((p) =>
          p.id === postId
            ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1, liked: !isLiked }
            : p
        ),
      };
    }),

  notifications: [...MOCK_NOTIFICATIONS],
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: `notif_${Date.now()}`,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),

  selectedDoctor: null,
  setSelectedDoctor: (doc) => set({ selectedDoctor: doc }),

  savedReels: [],
  toggleSavedReel: (id) =>
    set((state) => ({
      savedReels: state.savedReels.includes(id)
        ? state.savedReels.filter((r) => r !== id)
        : [...state.savedReels, id],
    })),
}));

// Helper selectors
export const getUnreadCount = (notifications: Notification[]) =>
  notifications.filter((n) => !n.read).length;
