import { API_ENDPOINTS } from '../constants/constants';
import { useAuthStore } from '../store/useAuthStore';

export const useUsers = (refreshCallback: () => void) => {
    const token = useAuthStore(state => state.token) || localStorage.getItem('token');
    // Extraemos correctamente updateUser y el usuario actual
    const { user: currentUser, updateUser } = useAuthStore();

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
                const result = await response.json();
                // Importante: Asegúrate de qué estructura devuelve tu backend
                const updatedUserData = result.user || result;

                // 1. Si es mi propio perfil, actualizo el store global
                if (id && String(id) === String(currentUser?.id || currentUser?._id)) {
                    updateUser(updatedUserData);
                }
                
                // 2. Ejecutamos el callback para refrescar la tabla de usuarios
                refreshCallback(); 

                // 3. Devolvemos el usuario actualizado para que el Form sepa que terminó
                return updatedUserData; 
            }
        } catch (err) {
            console.error("Error en saveUser:", err);
        }
        return null;
    };

    return { deleteUser, saveUser };
};