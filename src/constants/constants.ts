// src/config/api.js

// Si estás usando variables de entorno (.env), lo ideal sería:
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    // Endpoints de Usuarios
    USERS: `${BASE_URL}/users`,

    REGISTRER: `${BASE_URL}/users/register`,
    REGISTRER_ADMIN: `${BASE_URL}/users/admin-create`,

    EDIT_USER: `${BASE_URL}`,
    
    // Endpoints de Auth (si los separaste, si no usa el de arriba)
    LOGIN: `${BASE_URL}/users/login/`,
    
};

export default BASE_URL;


// pages/index.ts
export * from '../pages/Login';
export * from '../pages/Register';
export * from '../pages/Dashboard';
export * from '../pages/Main';
export * from '../pages/NotFound';


// components

export * from '../components/NavBar'
export * from '../components/UserList'
export * from '../components/StatCard'
export * from '../components/DashboardHeader'