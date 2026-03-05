import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export const UserForm = ({ user, onSave, onCancel, isSameUser: isSameUserProp }: any) => {
    const currentUser = useAuthStore((state: any) => state.user);
    
    // 1. SOLUCIÓN AL REFRESCO: Sincronizar el estado cuando la prop 'user' cambie
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'usuario',
        status: 'active'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '', // Password siempre vacío en edición por seguridad
                role: user.role || 'usuario',
                status: user.status || 'active'
            });
        }
    }, [user]); // Cada vez que el usuario seleccionado cambie, actualizamos el form

    // --- LÓGICA DE RANGOS ---
    const currentId = currentUser?.id || currentUser?._id;
    const targetId = user?.id || user?._id;
    const isOwnProfile = isSameUserProp ?? Boolean(currentId && targetId && String(currentId) === String(targetId));

    const isSuperAdmin = currentUser?.role?.toLowerCase() === 'superadmin';
    const isAdmin = currentUser?.role?.toLowerCase() === 'admin';

    const canChangeRole = isSuperAdmin && !isOwnProfile;
    const canSeeStatus = isSuperAdmin || isAdmin;
    const canEditStatus = isSuperAdmin && !isOwnProfile;

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.role === 'superadmin' && !isSuperAdmin) {
        alert("No tienes rango suficiente para asignar 'Superadmin'.");
        setFormData({...formData, role: user?.role || 'usuario'});
        return;
    }

    if (isAdmin && user?.role === 'admin' && !isOwnProfile) {
        alert("Un administrador no puede editar a otro administrador.");
        return;
    }
    const success = await onSave(formData, user?.id);
    
    if (success) {
        setFormData(prev => ({ ...prev, password: '' }));
    }
};

    return (
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto transition-all">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    {user ? 'Actualizar Perfil' : 'Nuevo Usuario'}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    {user ? `Editando a ${user.username}` : 'Completa los datos para el registro'}
                    {isOwnProfile && <span className="ml-2 text-blue-400 font-semibold">(Tu perfil)</span>}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Username</label>
                    <input 
                        className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 outline-none"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email</label>
                    <input 
                        type="email"
                        className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                {!user && (
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Password</label>
                        <input 
                            type="password"
                            className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required={!user}
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {/* Campo de ROL */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Rol</label>
                        <select 
                            disabled={!canChangeRole} 
                            className={`w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 outline-none appearance-none ${!canChangeRole ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer focus:border-blue-500'}`}
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="usuario">Usuario</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                        {!canChangeRole && (
                             <p className="text-[10px] text-amber-500 mt-1 ml-1 italic">
                                {isOwnProfile ? "No puedes cambiar tu propio rango." : "Solo Superadmins cambian roles."}
                             </p>
                        )}
                    </div>

                    {canSeeStatus ? (
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Estado</label>
                            <select 
                                disabled={!canEditStatus} 
                                className={`w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 outline-none ${!canEditStatus ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer focus:border-blue-500'}`}
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                                <option value="deleted">Eliminado</option>
                            </select>
                        </div>
                    ) : (
                        <div className="flex items-center pt-6">
                            <span className="text-slate-600 text-[10px] uppercase italic tracking-widest">Estado Protegido</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-slate-700/50">
                    <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white font-medium px-4">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                        {user ? 'Guardar Cambios' : 'Crear Usuario'}
                    </button>
                </div>
            </form>
        </div>
    );
};