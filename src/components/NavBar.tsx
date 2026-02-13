import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; // Importamos el store

export const NavBar = () => {
  // 1. Obtenemos el usuario y la función logout directamente de Zustand
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Esto ya limpia el storage (local o session) según lo que configuramos
    window.location.href = "/"; 
  };

  return (
    <nav className="flex items-center justify-between flex-wrap py-4 lg:px-12 bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-2xl border-t-2 border-blue-500">
      
      <Link to="/" className="text-white font-bold text-xl hover:opacity-80 transition-opacity">
        Mi Web
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
        <Link to="/noticias" className="text-slate-300 hover:text-white transition-colors">Noticias</Link>

        {/* 2. Ahora 'user' viene de Zustand, por lo que será reactivo */}
        {user ? (
          <>
            <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors uppercase text-sm font-semibold tracking-wider">
              Panel de Control
            </Link>
            
            <div className="flex items-center gap-3 border-l border-slate-700/50 pl-6">
              <div className="text-right">
                <p className="text-[10px] text-blue-400 uppercase font-bold leading-none mb-1">Conectado</p>
                <p className="text-white font-bold text-sm leading-tight capitalize">
                   {user.username || 'Usuario'}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all border border-red-500/20 hover:border-red-600 shadow-lg shadow-red-900/20"
              >
                Salir
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/register" className="text-slate-300 hover:text-white transition-colors">Registrarse</Link>
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30 active:scale-95"
            >
              Iniciar Sesión
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;