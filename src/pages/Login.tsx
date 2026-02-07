import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { API_ENDPOINTS }  from '../constants/constants';

export const Login = () => {
  // 1. Estados para los inputs y el cargando
  const [identifier, setIdentifier] = useState(''); // Usuario o Email
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // 2. Función para manejar el envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch( API_ENDPOINTS.LOGIN , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }), // Enviamos 'identifier' como espera tu back
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos sesión
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // ¡Al Dashboard!
        navigate("/dashboard");
      } else {
        alert(data.message || "Error al ingresar");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo conectar con el servidor. ¿Está el backend encendido?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center py-12 px-6">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-3xl mb-8 text-white">Iniciar Sesion</h1>

        {/* Cambiamos el div por un form para que funcione el 'Enter' al escribir */}
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
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 mt-1 mb-6 text-sm w-full text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="••••••••"
            />
            
            <button 
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>

          <div className="py-5 text-center">
            <Link to="/register" className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
              ¿No tienes cuenta? <span className="text-blue-500">Regístrate</span>
            </Link>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center justify-center gap-2 transition-colors text-sm">
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

export default Login;