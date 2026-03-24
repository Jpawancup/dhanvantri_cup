// ==========================
// MOCK DATA — Dhanvantri Phase 1
// All dummy data for UI development
// ==========================

export const doctors = [
  {
    id: "1",
    name: "Dr. Amit Sharma",
    specialization: "Cardiologist",
    hospital: "Apollo Hospitals",
    experience: 14,
    rating: 4.8,
    reviews: 220,
    distance: "2.1 km",
    fee: 800,
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Dr. Anjali Desai",
    specialization: "Neurologist",
    hospital: "Fortis Healthcare",
    experience: 10,
    rating: 4.7,
    reviews: 180,
    distance: "3.5 km",
    fee: 1200,
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Dr. Raj Patel",
    specialization: "Orthopedic",
    hospital: "AIIMS Delhi",
    experience: 18,
    rating: 4.9,
    reviews: 410,
    distance: "1.8 km",
    fee: 600,
    available: false,
    image: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Dr. Sunita Rao",
    specialization: "Gynecologist",
    hospital: "Manipal Hospital",
    experience: 12,
    rating: 4.6,
    reviews: 150,
    distance: "4.0 km",
    fee: 900,
    available: true,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop",
  },
]

export const hospitals = [
  {
    id: "1",
    name: "Apollo Hospitals",
    type: "Multi-Specialty",
    rating: 4.8,
    distance: "2.1 km",
    bedsAvailable: 45,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop",
    facilities: ["ICU", "Emergency", "OT", "Lab", "Pharmacy"],
  },
  {
    id: "2",
    name: "Fortis Healthcare",
    type: "Super-Specialty",
    rating: 4.6,
    distance: "3.5 km",
    bedsAvailable: 22,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    facilities: ["ICU", "NICU", "OT", "Dialysis", "Radiology"],
  },
]

export const appointments = [
  {
    id: "1",
    doctor: "Dr. Amit Sharma",
    specialization: "Cardiologist",
    date: "March 24, 2026",
    time: "10:30 AM",
    type: "Video",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    doctor: "Dr. Anjali Desai",
    specialization: "Neurologist",
    date: "March 28, 2026",
    time: "2:00 PM",
    type: "In-Person",
    status: "pending",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
  },
]

export const feedPosts = [
  {
    id: "1",
    author: "Dr. Anjali Desai",
    role: "Neurologist",
    time: "2h ago",
    content: "Regular sleep patterns are the single most important factor for cognitive longevity. Aim for 7–8 hours of uninterrupted rest. 🌱💤 #HealthTips",
    image: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=2070&auto=format&fit=crop",
    likes: 1200,
    comments: 48,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    author: "Dr. Amit Sharma",
    role: "Cardiologist",
    time: "5h ago",
    content: "5 early warning signs of heart disease that are easy to miss. Thread 🧵👇 #HeartHealth #Cardiology",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop",
    likes: 3400,
    comments: 102,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
  },
]

export const stories = [
  { id: "1", name: "Dr. Sharma", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300" },
  { id: "2", name: "Priya", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300" },
  { id: "3", name: "Dr. Patel", img: "https://images.unsplash.com/photo-1594824436998-d8906bd30114?q=80&w=300" },
  { id: "4", name: "Ravi", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300" },
  { id: "5", name: "Dr. Anjali", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300" },
]

export const quickStats = {
  upcomingAppointments: 2,
  activePrescriptions: 3,
  labReports: 5,
  healthScore: 82,
}

export const adminStats = {
  totalUsers: 24780,
  verifiedDoctors: 1240,
  listedHospitals: 386,
  totalPosts: 18920,
}

export const doctorStats = {
  todayAppointments: 8,
  totalPatients: 540,
  pendingPrescriptions: 3,
  monthlyEarnings: 94200,
}
