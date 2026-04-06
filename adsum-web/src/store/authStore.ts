import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/axios';

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      isLoading: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const res = await api.post('/auth/login', credentials);
          const { access_token } = res.data;
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('adsum_token', access_token);
          }

          // Fetch the current user profile (we need to add a /users/me endpoint to the backend)
          const userRes = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${access_token}` }
          });

          set({ 
            token: access_token, 
            user: userRes.data,
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials) => {
        set({ isLoading: true });
        try {
          await api.post('/auth/register', credentials);
          // Auto-login after registration is a common good UX practice
          await useAuthStore.getState().login({ 
            username: credentials.username, 
            password: credentials.password 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('adsum_token');
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'adsum-auth-storage', // unique name for localStorage
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
