import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any;
  rememberMe: boolean;
  setAuth: (token: string, user: any, remember: boolean) => void;
  // Agregamos esta función para actualizar datos puntuales
  updateUser: (userData: any) => void; 
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      rememberMe: false,

      setAuth: (token, user, remember) => {
        set({ token, user, rememberMe: remember });
      },

      // Implementación de la actualización parcial
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      },

      logout: () => {
        set({ token: null, user: null, rememberMe: false });
        // Con persist, esto limpia el localStorage automáticamente por el nombre 'auth-storage'
        localStorage.removeItem('auth-storage'); 
        window.location.href = "/";
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);