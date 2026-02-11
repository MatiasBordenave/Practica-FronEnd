import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const AdminRoute = () => {
    const user = useAuthStore((state) => state.user) || JSON.parse(localStorage.getItem('user') || '{}');
    const role = user?.role?.toLowerCase();

    // Si no es admin ni superadmin, lo devolvemos al dashboard común
    if (role !== 'admin' && role !== 'superadmin') {
        return <Navigate to="/dashboard" replace />;
    }

    // Si tiene permisos, adelante
    return <Outlet />;
};