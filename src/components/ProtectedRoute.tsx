import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token) || localStorage.getItem('token');

    // Si no hay token, redirige al login
    if (!token) return <Navigate to="/" replace />;

    // Si hay token, renderiza la ruta hija (el Dashboard)
    return <Outlet />;
};