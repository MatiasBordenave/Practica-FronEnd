import { useUsers } from '../hooks/useUsers';

export const UserList = ({ users, onEdit, onCreate, refresh, loading }: any) => {
    // Extraemos la lógica del hook
    const { deleteUser } = useUsers(refresh);

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-white text-3xl font-bold">Panel de Gestión</h1>
                <button 
                    onClick={onCreate}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-500/20"
                >
                    <i className="fa-solid fa-plus"></i> Nuevo Usuario
                </button>
            </div>

            {/* Ejemplo de cómo usarías el deleteUser en tu tabla */}
            <button onClick={() => deleteUser(users.id)}>
                <i className="fa-solid fa-trash text-red-500"></i>
            </button>
        </>
    );
};