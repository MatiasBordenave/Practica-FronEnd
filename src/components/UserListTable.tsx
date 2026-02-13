import { useAuthStore } from '../store/useAuthStore';

export const UserListTable = ({ users = [], onEdit, onDelete }: any) => {
    // Traemos el usuario logueado desde Zustand
    const currentUser = useAuthStore((state: any) => state.user);

    // Función segura para detectar si el usuario de la fila soy "YO"
    const checkIsMe = (rowUser: any) => {
        if (!currentUser || !rowUser) return false;
        
        const matchId = String(rowUser.id) === String(currentUser.id);
        const matchUsername = rowUser.username === currentUser.username;
        
        return matchId || matchUsername;
    };

    // Ordenar: Primero "Yo", luego el resto
    const sortedUsers = [...(users || [])].sort((a: any, b: any) => {
        if (checkIsMe(a)) return -1;
        if (checkIsMe(b)) return 1;
        return 0;
    });

    return (
        <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-700/50">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-700/50">
                        <th className="p-4 font-semibold">Usuario</th>
                        <th className="p-4 font-semibold">Estado</th>
                        <th className="p-4 font-semibold text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                    {sortedUsers.map((u: any) => {
                        // Determinamos si es el perfil del usuario logueado
                        const isOwnProfile = checkIsMe(u);
                        
                        // Roles para la jerarquía
                        const myRole = currentUser?.role?.toLowerCase() || '';
                        const targetRole = u.role?.toLowerCase() || '';

                        // LÓGICA DE PERMISOS
                        let canEdit = false;
                        if (isOwnProfile) {
                            canEdit = true; // Yo siempre puedo editarme
                        } else if (myRole === 'superadmin') {
                            canEdit = true; // Superadmin edita a todos
                        } else if (myRole === 'admin') {
                            canEdit = targetRole !== 'superadmin'; // Admin edita a todos menos superadmin
                        }

                        const canDelete = !isOwnProfile && (
                            myRole === 'superadmin' || 
                            (myRole === 'admin' && targetRole !== 'superadmin' && targetRole !== 'admin')
                        );

                        return (
                            <tr key={u.id} className="group hover:bg-slate-700/20 transition-all duration-300">
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-slate-200 font-medium flex items-center gap-2">
                                            {u.username} 
                                            {isOwnProfile && (
                                                <span className="bg-blue-500/10 text-blue-400 text-[9px] px-2 py-0.5 rounded-full border border-blue-500/20">
                                                    Tú
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-slate-500 text-xs">{u.email}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg border ${
                                        u.status === 'active' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    }`}>
                                        {u.status || 'active'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center items-center gap-2">
                                        {canEdit ? (
                                            <>
                                                <button 
                                                    onClick={() => onEdit(u)} 
                                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all duration-200"
                                                >
                                                    <i className="fa-solid fa-pen-to-square text-lg"></i>
                                                </button>
                                                
                                                {canDelete && (
                                                    <button 
                                                        onClick={() => onDelete(u.id)} 
                                                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-200"
                                                    >
                                                        <i className="fa-solid fa-trash-can text-lg"></i>
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-1 text-slate-600 italic text-[10px]">
                                                <i className="fa-solid fa-lock text-xs"></i>
                                                <span>Protegido</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};