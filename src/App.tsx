import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Main, Login, Register, Dashboard, NotFound } from './constants/constants';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';

function App() {
  // Verificamos si ya está logueado para no mostrarle el Login de nuevo
  const isAuth = !!(useAuthStore((state) => state.token) || localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<Main />} />
        
        {/* Si ya está logueado y va a login/register, lo mandamos al dashboard */}
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/dashboard" /> : <Register />} />

        {/* --- RUTAS PRIVADAS (Solo con Token) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Aquí puedes meter más rutas protegidas en el futuro como /perfil o /ajustes */}
        </Route>

        {/* --- ERROR 404 --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;