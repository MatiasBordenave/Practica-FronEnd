import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm'; 
import { UserListTable } from '../components/UserListTable';
import { API_ENDPOINTS, DashboardHeader, StatCard } from '../constants/constants';
import { useAuthStore } from '../store/useAuthStore';
import { UserTrendChart } from '../components/UserTrendChart';

export const Dashboard = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingUser, setEditingUser] = useState<any>(null);

    // Obtenemos todo del store de forma limpia
    const token = useAuthStore(state => state.token);
    const currentUser = useAuthStore(state => state.user);

    const fetchUsers = async () => {
        // Usamos el token del store o el del localStorage como respaldo
        const activeToken = token || localStorage.getItem('token');
        if (!activeToken) return;

        try {
            const res = await fetch(API_ENDPOINTS.USERS, {
                headers: { 'Authorization': `Bearer ${activeToken}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    // IMPORTANTE: Definimos los hooks antes de cualquier "return"
    const { deleteUser, saveUser } = useUsers(fetchUsers);

    // 1. Calculamos si el usuario que estamos editando es el mismo que está logueado
const isSameUser = editingUser && currentUser && String(editingUser.id || editingUser._id) === String(currentUser.id || currentUser._id);

            // Renderizado condicional del Formulario
            if (view === 'form') {
                return (
                    <div className="min-h-screen bg-[#0f172a]">
                        <NavBar />
                        <div className="p-8">
                            <UserForm 
                                user={editingUser} 
                                isSameUser={isSameUser} // <-- Pasamos la nueva prop
                                onSave={async (d: any, id?: number) => {
                                    const success = await saveUser(d, id);
                                    if (success) { 
                                        setView('list'); 
                                        setEditingUser(null); 
                                    }
                                }} 
                                onCancel={() => {
                                    setView('list');
                                    setEditingUser(null);
                                }} 
                            />
                        </div>
                    </div>
                );
            }

    return (
        <div className="min-h-screen bg-[#0f172a]">
            <NavBar />
            <main className="p-8">
                <DashboardHeader 
                    // Aquí pasamos el currentUser real (el objeto del que está logueado)
                    currentUser={currentUser} 
                    onAdd={() => { setEditingUser(null); setView('form'); }} 
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard title="TOTAL" count={users.length} color="bg-slate-200" />
                    <StatCard title="ACTIVOS" count={users.filter(u => u.status?.toLowerCase() === 'active').length} color="bg-green-200" />
                    <StatCard title="INACTIVOS" count={users.filter(u => u.status?.toLowerCase() === 'inactive').length} color="bg-yellow-200" />
                    <StatCard title="ELIMINADOS" count={users.filter(u => u.status?.toLowerCase() === 'deleted').length} color="bg-red-200" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <UserTrendChart users={users} />
                    </div>

                    <div className="lg:col-span-2">
                        <UserListTable 
                            users={users} 
                            onEdit={(u: any) => { 
                                setEditingUser(u); 
                                setView('form'); 
                            }}
                            onDelete={deleteUser} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};