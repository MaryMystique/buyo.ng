import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthStore {
  user: User | null;        // null means not logged in
  loading: boolean;         // true while checking auth state
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));