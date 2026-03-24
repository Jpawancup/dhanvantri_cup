import { create } from "zustand"

export const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  posts: [],
  setPosts: (posts) => set({ posts }),

  reels: [],
  setReels: (reels) => set({ reels }),
}))
