import { API_ENDPOINTS } from '../constants/constants';
import { useAuthStore } from '../store/useAuthStore'; // Importamos el store

export const useUsers = (refreshCallback: () => void) => {
    // Usamos el token de Zustand para mayor seguridad
    const token = useAuthStore(state => state.token) || localStorage.getItem('token');
    const { user: currentUser, setAuth } = useAuthStore();

    const deleteUser = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                refreshCallback();
            }
        } catch (err) { console.error(err); }
    };

    const saveUser = async (data: any, id?: number) => {
        const url = id ? `${API_ENDPOINTS.USERS}/${id}` : API_ENDPOINTS.USERS;
        const method = id ? 'PUT' : 'POST';
        
        try {
            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Si editamos nuestro propio perfil, actualizamos el store de Zustand
                if (id && String(id) === String(currentUser?.id)) {
                    const updatedUser = { ...currentUser, ...data };
                    // Guardamos los nuevos datos en Zustand y LocalStorage
                    setAuth(token as string, updatedUser as any);
                }
                
                refreshCallback(); // Refresca la tabla
                return true;
            }
        } catch (err) {
            console.error("Error al guardar usuario:", err);
        }
        return false;
    };

    return { deleteUser, saveUser };
};