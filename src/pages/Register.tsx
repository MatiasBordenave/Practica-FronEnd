import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/constants';


export const Register = () => {
  // 1. Estados para los campos
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Función de validación y envío
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpieza de datos (trim)
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    // VALIDACIONES
    // A. Campos vacíos
    if (!username || !email || !password || !confirmPassword) {
      return alert("Por favor, completa todos los campos.");
    }

    // B. No caracteres raros en el username (Solo letras, números y guiones bajos)
    const userRegex = /^[a-zA-Z0-9_]+$/;
    if (!userRegex.test(username)) {
      return alert("El usuario solo puede contener letras, números y guiones bajos.");
    }

    // C. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Por favor, ingresa un correo electrónico válido.");
    }

    // D. Coincidencia de contraseñas
    if (password !== confirmPassword) {
      return alert("Las contraseñas no coinciden.");
    }

    // E. Largo mínimo
    if (password.length < 6) {
      return alert("La contraseña debe tener al menos 6 caracteres.");
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.REGISTRER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: 'usuario' }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        alert(data.message || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center py-12 px-6">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-3xl mb-8 text-white">Crear Cuenta</h1>

        <form onSubmit={handleRegister} className="bg-zinc-900 shadow-2xl w-full rounded-2xl border border-zinc-800 px-5 py-8">
          <label className="font-semibold text-sm text-zinc-400 block mb-1">Nombre de Usuario</label>
          <input 
            name="username"
            type="text" 
            value={formData.username}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mb-4 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          <label className="font-semibold text-sm text-zinc-400 block mb-1">Correo Electrónico</label>
          <input 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mb-4 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          <label className="font-semibold text-sm text-zinc-400 block mb-1">Contraseña</label>
          <input 
            name="password"
            type="password" 
            value={formData.password}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mb-4 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500" 
          />

          <label className="font-semibold text-sm text-zinc-400 block mb-1">Confirmar Contraseña</label>
          <input 
            name="confirmPassword"
            type="password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mb-6 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          <button 
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl font-bold shadow-lg transition-all ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Creando Usuario...' : 'Crear Usuario'}
          </button>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-zinc-500 hover:text-blue-400">
              ¿Ya tienes cuenta? <span className="text-blue-500">Inicia sesión</span>
            </Link>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};