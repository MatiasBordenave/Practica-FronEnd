import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/constants';
import { useAuthStore } from '../store/useAuthStore'; // Importamos el store

export const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Nuevo estado para el checkbox
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth); // Función del store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Usamos el store de Zustand con la preferencia de 'rememberMe'
        // Esto decidirá automáticamente el tipo de almacenamiento
        setAuth(data.token, data.user, rememberMe);
        
        navigate("/dashboard");
      } else {
        alert(data.message || "Error al ingresar");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center py-12 px-6">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-3xl mb-8 text-white tracking-tight">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="bg-zinc-900 shadow-2xl w-full rounded-2xl border border-zinc-800 divide-y divide-zinc-800">
          <div className="px-5 py-8">
            <label className="font-semibold text-sm text-zinc-400 pb-1 block">Usuario o Email</label>
            <input 
              type="text" 
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Tu usuario o correo"
            />
            
            <label className="font-semibold text-sm text-zinc-400 pb-1 block">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mt-1 mb-4 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="••••••••"
            />

            {/* --- CHECKBOX DE MANTENER SESIÓN --- */}
            <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-blue-600 border-blue-600' : 'bg-zinc-800 border-zinc-700 group-hover:border-zinc-500'}`}>
                {rememberMe && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-zinc-400 select-none group-hover:text-zinc-300 transition-colors">Mantener sesión iniciada</span>
            </div>
            
            <button 
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center active:scale-[0.98] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>

          <div className="py-5 text-center">
            <Link to="/register" className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
              ¿No tienes cuenta? <span className="text-blue-500 font-bold">Regístrate</span>
            </Link>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center justify-center gap-2 transition-colors text-sm">
            <i className="fa-solid fa-arrow-left text-xs"></i>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;