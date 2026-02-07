import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { NavBar } from '../components/NavBar';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm'; 
import { UserListTable } from '../components/UserListTable';
import { API_ENDPOINTS, DashboardHeader, StatCard } from '../constants/constants';
// IMPORTAMOS EL STORE
import { useAuthStore } from '../store/useAuthStore';
import { UserTrendChart } from '../components/UserTrendChart';

export const Dashboard = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingUser, setEditingUser] = useState<any>(null);

    // Leemos el token directamente para la primera carga
    const token = useAuthStore(state => state.token) || localStorage.getItem('token');
    const currentUser = useAuthStore(state => state.user) || JSON.parse(localStorage.getItem('user') || 'null');

    const fetchUsers = async () => {
        if (!token) return;
        try {
            const res = await fetch(API_ENDPOINTS.USERS, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    // Esto asegura que cargue apenas entres al componente
    useEffect(() => {
        fetchUsers();
    }, [token]);


    const { deleteUser, saveUser } = useUsers(fetchUsers);

    // Renderizado del Formulario
    if (view === 'form') {
        return (
            <div className="min-h-screen bg-[#0f172a]">
                <NavBar />
                <div className="p-8">
                    <UserForm 
                        user={editingUser} 
                        onSave={async (d:any, id?:number) => {
                            if(await saveUser(d, id)) { setView('list'); setEditingUser(null); }
                        }} 
                        onCancel={() => setView('list')} 
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a]">
            <NavBar />
            <main className="p-8">
                {/* PASAMOS EL CURRENT USER DEL STORE AL HEADER */}
                <DashboardHeader 
                    currentUser={users} 
                    onAdd={() => { setEditingUser(null); setView('form'); }} 
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard title="TOTAL" count={users.length} color="bg-slate-200" />
                    <StatCard title="ACTIVOS" count={users.filter(u => u.status === 'active' || u.status === 'ACTIVE').length} color="bg-green-200" />
                    <StatCard title="INACTIVOS" count={users.filter(u => u.status === 'inactive').length} color="bg-yellow-200" />
                    <StatCard title="ELIMINADOS" count={users.filter(u => u.status === 'deleted').length} color="bg-red-200" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <UserTrendChart />

                    <UserListTable 
                        users={users} 
                        onEdit={(u: any) => { setEditingUser(u); setView('form'); }}
                        onDelete={deleteUser}
                    />
                </div>
            </main>
        </div>
    );
};
