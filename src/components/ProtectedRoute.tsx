import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = () => {
    const token = useAuthStore((state: any) => state.token);
    const logout = useAuthStore((state: any) => state.logout);

    // 1. Si ni siquiera hay token, al login
    if (!token) return <Navigate to="/" replace />;

    try {
        // 2. Decodificamos el token para ver cuándo expira
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        // 3. Verificamos si ya pasó la fecha de expiración (exp)
        if (decoded.exp < currentTime) {
            console.warn("Sesión expirada por tiempo de JWT");
            logout(); // Esto limpia Zustand y el storage persistente
            return <Navigate to="/" replace />;
        }
    } catch (error) {
        // Si el token está mal formado o hay error, cerramos sesión por seguridad
        logout();
        return <Navigate to="/" replace />;
    }

    // 4. Si el token existe y es válido, dejamos pasar
    return <Outlet />;
};