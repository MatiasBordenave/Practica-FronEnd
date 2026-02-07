import React, { useState } from 'react';

export const UserForm = ({ user, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        role: user?.role || 'usuario',
        status: user?.status || 'active'
    });

    return (
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto transition-all">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    {user ? 'Actualizar Perfil' : 'Nuevo Usuario'}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    {user ? `Editando la cuenta de ${user.username}` : 'Completa los datos para el registro'}
                </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onSave(formData, user?.id); }} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Username</label>
                    <input 
                        className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="Nombre de usuario..."
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email</label>
                    <input 
                        className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="ejemplo@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>

                {!user && (
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Password</label>
                        <input 
                            type="password"
                            className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Mínimo 6 caracteres"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Rol</label>
                        <select 
                            className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 outline-none cursor-pointer appearance-none"
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="usuario">Usuario</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Estado</label>
                        <select 
                            className="w-full bg-slate-900/50 text-white p-4 rounded-2xl border border-slate-700 focus:border-blue-500 outline-none cursor-pointer appearance-none"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="active">Activo</option>
                            <option value="deleted">Eliminado</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-slate-700/50">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="text-slate-400 hover:text-white font-medium px-4 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                        {user ? 'Guardar Cambios' : 'Crear Usuario'}
                    </button>
                </div>
            </form>
        </div>
    );
};