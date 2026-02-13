import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Main, Login, Register, Dashboard, NotFound } from './constants/constants';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import { useState, useEffect } from 'react';
import { IdleTimer } from "./components/IdleTimer";

function App() {
  const token = useAuthStore((state: any) => state.token);
  const [isHydrated, setIsHydrated] = useState(false);

  // Esperamos a que Zustand cargue los datos del storage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mientras no esté hidratado, mostramos una pantalla de carga o nada
  if (!isHydrated) return <div className="min-h-screen bg-[#0f172a]" />;

  const isAuth = !!token;

  return (
    <BrowserRouter>
      <IdleTimer />
      <Routes>
        <Route path="/" element={<Main />} />
        
        {/* Ahora isAuth es confiable porque ya esperamos la hidratación */}
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/dashboard" replace /> : <Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;