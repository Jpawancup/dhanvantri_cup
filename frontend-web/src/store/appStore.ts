import { create } from 'zustand';

interface AppState {
  user: any | null;
  setUser: (user: any) => void;
  selectedDoctor: any | null;
  setDoctor: (doc: any) => void;
  likedPosts: number[];
  toggleLike: (id: number) => void;
  likedStories: number[];
  toggleStoryLike: (id: number) => void;
  savedReels: number[];
  toggleSavedReel: (id: number) => void;
  adminRequests: any[];
  setAdminRequests: (requests: any[]) => void;
  handleAdminRequest: (id: number, action: 'accept' | 'decline') => void;
  filters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  selectedDoctor: null,
  setDoctor: (doc) => set({ selectedDoctor: doc }),

  likedPosts: [],
  toggleLike: (id) =>
    set((state) => ({
      likedPosts: state.likedPosts.includes(id)
        ? state.likedPosts.filter((i) => i !== id)
        : [...state.likedPosts, id],
    })),

  likedStories: [],
  toggleStoryLike: (id) =>
    set((state) => ({
      likedStories: state.likedStories.includes(id)
        ? state.likedStories.filter((i) => i !== id)
        : [...state.likedStories, id],
    })),

  savedReels: [],
  toggleSavedReel: (id) =>
    set((state) => ({
      savedReels: state.savedReels.includes(id)
        ? state.savedReels.filter((i) => i !== id)
        : [...state.savedReels, id],
    })),

  adminRequests: [],
  setAdminRequests: (requests) => set({ adminRequests: requests }),
  handleAdminRequest: (id, action) =>
    set((state) => ({
      adminRequests: state.adminRequests.filter((req) => req.id !== id),
    })),

  filters: {},
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
}));
