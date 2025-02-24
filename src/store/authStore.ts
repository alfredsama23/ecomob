import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  balance: number;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  deductBalance: (amount: number) => boolean;
  addBalance: (amount: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  balance: 5000, // Initial balance of 5000 DZD
  login: (username: string, password: string) => {
    if (username === 'takaya' && password === 'takaya') {
      set({ isAuthenticated: true, username });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, username: null }),
  deductBalance: (amount: number) => {
    let success = false;
    set((state) => {
      if (state.balance >= amount) {
        success = true;
        return { balance: state.balance - amount };
      }
      return state;
    });
    return success;
  },
  addBalance: (amount: number) => set((state) => ({ balance: state.balance + amount })),
}));