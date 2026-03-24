import { create } from 'zustand'

interface User {
  name: string
  role: 'patient' | 'doctor' | 'admin'
  avatar: string
  verified: boolean
}

interface UIState {
  user: User | null
  setUser: (user: User | null) => void
  
  notificationsCount: number
  setNotificationsCount: (count: number) => void
  
  selectedDoctorId: string | null
  setSelectedDoctorId: (id: string | null) => void
  
  selectedHospitalId: string | null
  setSelectedHospitalId: (id: string | null) => void
  
  isCommentModalOpen: boolean
  setIsCommentModalOpen: (isOpen: boolean) => void
  
  activeConversationId: string | null
  setActiveConversationId: (id: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  user: {
    name: "Prakash Kumar",
    role: "patient",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2070&auto=format&fit=crop",
    verified: true
  },
  setUser: (user) => set({ user }),
  
  notificationsCount: 2,
  setNotificationsCount: (count) => set({ notificationsCount: count }),
  
  selectedDoctorId: null,
  setSelectedDoctorId: (id) => set({ selectedDoctorId: id }),
  
  selectedHospitalId: null,
  setSelectedHospitalId: (id) => set({ selectedHospitalId: id }),
  
  isCommentModalOpen: false,
  setIsCommentModalOpen: (isOpen) => set({ isCommentModalOpen: isOpen }),
  
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
}))
