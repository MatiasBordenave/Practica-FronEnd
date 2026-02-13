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
                const updatedUserData = result.user || result;

                // Si editamos nuestro propio perfil, actualizamos el store global
                if (id && String(id) === String(currentUser?.id)) {
                    
                    // USAMOS UPDATEUSER EN LUGAR DE SETAUTH
                    updateUser(updatedUserData);
                    
                    // Validamos si el rol cambió para refrescar la seguridad de la App
                    if (updatedUserData.role !== currentUser.role) {
                        // Un pequeño delay para que Zustand persista en LocalStorage antes de recargar
                        setTimeout(() => {
                            window.location.reload();
                        }, 300);
                    }
                }
                
                refreshCallback(); 
                return true;
            }
        } catch (err) {
            console.error("Error:", err);
        }
        return false;
    };

    return { deleteUser, saveUser };
};