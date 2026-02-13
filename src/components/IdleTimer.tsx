import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export const IdleTimer = () => {
  const logout = useAuthStore((state: any) => state.logout);
  const token = useAuthStore((state: any) => state.token);
  const rememberMe = useAuthStore((state: any) => state.rememberMe);

  const handleLogout = useCallback(() => {
    if (token) {
      console.log("Sesión cerrada por inactividad");
      logout();
    }
  }, [token, logout]);

  useEffect(() => {
    // SI EL USUARIO MARCÓ "MANTENER SESIÓN", NO HACEMOS NADA
    if (!token || rememberMe) return;

    let timeoutId: any;

    const setupTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // 15 minutos de inactividad
      timeoutId = setTimeout(handleLogout, 15 * 60 * 1000);
    };

    const resetEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    resetEvents.forEach(event => document.addEventListener(event, setupTimer));

    setupTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      resetEvents.forEach(event => document.removeEventListener(event, setupTimer));
    };
  }, [token, rememberMe, handleLogout]);

  return null;
};