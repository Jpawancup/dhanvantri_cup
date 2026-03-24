export const mockUser = {
  id: 1,
  name: "Pawan",
  role: "user",
};

export const mockDoctors = [
  {
    id: 1,
    name: "Dr Sharma",
    specialization: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr Verma",
    specialization: "Neurologist",
    experience: "10 years",
    rating: 4.9,
  },
];

export const mockHospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    location: "Hyderabad",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Care Hospital",
    location: "Bangalore",
    rating: 4.7,
  },
];

export const mockPosts = [
  { id: 1, author: "Dr Sharma", content: "Stay healthy!", likes: 120, type: "post" },
  { id: 2, author: "Apollo Hospital", content: "Free checkup camp", likes: 85, type: "post" },
];

export const mockReels = [
  { id: 1, author: "HealthTips", videoUrl: "/videos/reel1.mp4", likes: 50 },
  { id: 2, author: "FitnessGuru", videoUrl: "/videos/reel2.mp4", likes: 200 },
];

export const mockStories = [
  { id: 1, author: "Dr Verma", imageUrl: "/images/story1.jpg" },
  { id: 2, author: "Care Hospital", imageUrl: "/images/story2.jpg" },
];

export const mockAppointments = [
  { id: 1, doctorId: 1, status: "pending", date: "2026-03-25" },
];

export const mockRequests = [
  { id: 1, userName: "Ravi", role: "doctor", status: "pending" },
  { id: 2, userName: "Suresh", role: "hospital", status: "pending" },
];

export function loginUser(data: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 1000);
  });
}

export function getDoctors(filter = "") {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (filter) {
        resolve(mockDoctors.filter(d => d.specialization.toLowerCase().includes(filter.toLowerCase())));
      } else {
        resolve(mockDoctors);
      }
    }, 500);
  });
}

export function getHospitals(filter = "") {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (filter) resolve(mockHospitals.filter(h => h.name.toLowerCase().includes(filter.toLowerCase())));
      else resolve(mockHospitals);
    }, 500);
  });
}

export function getFeed() {
  return new Promise((resolve) => resolve(mockPosts));
}

export function getStories() {
  return new Promise((resolve) => resolve(mockStories));
}

export function handleAdminAction(id: number, action: "accept" | "decline") {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id, action });
    }, 500);
  });
}
