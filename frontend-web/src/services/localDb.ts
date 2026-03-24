// ====== FULL FRONTEND DATA SIMULATION SYSTEM ======
// simulated frontend database powering the entire application
// =========================================================

export function saveData(key: string, data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getData(key: string) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// ========================
// SEED DATA GENERATION
// ========================

// 1. Users (10 users min, mixing roles: patient, doctor, hospital, admin)
const initialUsers = [
  { id: "u1", name: "Pawan User", role: "patient", email: "pawan@gmail.com", password: "123", profileImage: "/images/profiles/user1.jpg" },
  { id: "u2", name: "Dr. Amit Sharma", role: "doctor", email: "amit@gmail.com", password: "123", profileImage: "/images/profiles/user2.jpg" },
  { id: "u3", name: "Apollo Admin", role: "hospital", email: "apollo@gmail.com", password: "123", profileImage: "/images/profiles/user3.jpg" },
  { id: "u4", name: "Super Admin", role: "admin", email: "admin@gmail.com", password: "123", profileImage: "/images/profiles/user4.jpg" },
  { id: "u5", name: "Dr. Anjali Desai", role: "doctor", email: "anjali@gmail.com", password: "123", profileImage: "/images/profiles/user5.jpg" },
  { id: "u6", name: "Fortis Admin", role: "hospital", email: "fortis@gmail.com", password: "123", profileImage: "/images/profiles/user6.jpg" },
  { id: "u7", name: "Ravi Patient", role: "patient", email: "ravi@gmail.com", password: "123", profileImage: "/images/profiles/user7.jpg" },
  { id: "u8", name: "Dr. Raj Patel", role: "doctor", email: "raj@gmail.com", password: "123", profileImage: "/images/profiles/user1.jpg" },
  { id: "u9", name: "AIIMS Admin", role: "hospital", email: "aiims@gmail.com", password: "123", profileImage: "/images/profiles/user2.jpg" },
  { id: "u10", name: "Sneha Patient", role: "patient", email: "sneha@gmail.com", password: "123", profileImage: "/images/profiles/user3.jpg" },
];

// 2. Hospitals (5 Hospitals)
const initialHospitals = [
  { id: "h1", name: "Apollo Hospital", type: "Multi-Specialty", location: "Hyderabad", adminId: "u3", images: ["/images/hospitals/h1.jpg", "/images/hospitals/h2.jpg"], specialties: "Cardiology, Neurology", bedsAvailable: 45, rating: 4.8 },
  { id: "h2", name: "Fortis Healthcare", type: "Super-Specialty", location: "Bangalore", adminId: "u6", images: ["/images/hospitals/h3.jpg"], specialties: "Orthopedics, Oncology", bedsAvailable: 22, rating: 4.6 },
  { id: "h3", name: "AIIMS Delhi", type: "General", location: "Delhi", adminId: "u9", images: ["/images/hospitals/h4.jpg"], specialties: "All", bedsAvailable: 150, rating: 4.9 },
  { id: "h4", name: "Manipal Hospital", type: "Multi-Specialty", location: "Mumbai", adminId: "u3", images: ["/images/hospitals/h5.jpg"], specialties: "Gynecology", bedsAvailable: 34, rating: 4.5 },
  { id: "h5", name: "Care Hospitals", type: "Clinic", location: "Hyderabad", adminId: "u3", images: ["/images/hospitals/h6.jpg"], specialties: "Dermatology", bedsAvailable: 10, rating: 4.7 },
];

// 3. Doctors
const initialDoctors = [
  { id: "d1", userId: "u2", hospitalId: "h1", specialization: "Cardiologist", experience: 14, fee: 800, verified: true },
  { id: "d2", userId: "u5", hospitalId: "h2", specialization: "Neurologist", experience: 10, fee: 1200, verified: true },
  { id: "d3", userId: "u8", hospitalId: "h3", specialization: "Orthopedic", experience: 18, fee: 600, verified: false },
];

// 4. Patients
const initialPatients = [
  { id: "p1", userId: "u1", bloodGroup: "O+", medicalHistory: [] },
  { id: "p2", userId: "u7", bloodGroup: "A+", medicalHistory: [] },
  { id: "p3", userId: "u10", bloodGroup: "B-", medicalHistory: [] },
];

// 5. Appointments
const initialAppointments = [
  { id: "a1", patientId: "p1", doctorId: "d1", hospitalId: "h1", date: "2026-03-24", time: "10:30 AM", type: "Video", status: "confirmed" },
  { id: "a2", patientId: "p1", doctorId: "d2", hospitalId: "h2", date: "2026-03-25", time: "02:00 PM", type: "In-Person", status: "pending" },
];

// 6. Posts (20 posts)
const initialPosts = Array.from({ length: 9 }).map((_, i) => ({
  id: `post${i + 1}`,
  userId: i % 2 === 0 ? "u2" : "u5", // alternating doctors
  content: `Health tip #${i + 1}: Stay healthy and active!`,
  image: `/images/social/posts/post${i + 1}.png`,
  likes: [],
  comments: [],
  createdAt: new Date(Date.now() - i * 3600000).toISOString()
}));

// 7. Reels (13 reels)
const initialReels = Array.from({ length: 13 }).map((_, i) => ({
  id: `r${i + 1}`,
  userId: i % 2 === 0 ? "u2" : "u5",
  title: `Reel #${i+1} Motivation`,
  video: `/images/social/reels/reel${i + 1}.mp4`,
  thumbnail: `/images/profiles/user${(i % 5) + 1}.jpg`,
  likes: [],
  views: Math.floor(Math.random() * 10000)
}));

// 8. Medical Records (Prescriptions, Labs)
const initialPrescriptions: any[] = [];
const initialPharmacyOrders: any[] = [];
const initialLabOrders: any[] = [];
const initialLabReports: any[] = [];
const initialOpRecords: any[] = [];

export function initializeDatabase() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("dhanvantri_db_initialized_v2")) {
    console.log("Initializing Frontend Database with Seed Data...");
    saveData("users", initialUsers);
    saveData("hospitals", initialHospitals);
    saveData("doctors", initialDoctors);
    saveData("patients", initialPatients);
    saveData("appointments", initialAppointments);
    saveData("posts", initialPosts);
    saveData("reels", initialReels);
    saveData("prescriptions", initialPrescriptions);
    saveData("pharmacyOrders", initialPharmacyOrders);
    saveData("labOrders", initialLabOrders);
    saveData("labReports", initialLabReports);
    saveData("opRecords", initialOpRecords);
    
    // Auth state helper (Simulate login session)
    saveData("currentUser", initialUsers[0]); 

    localStorage.setItem("dhanvantri_db_initialized_v2", "true");
  }
}

export function getCurrentUser() {
  return getData("currentUser");
}

export function setCurrentUser(user: any) {
  saveData("currentUser", user);
}
