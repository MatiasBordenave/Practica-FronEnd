// src/pages/NotFound.tsx
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white px-4">
      <h1 className="text-9xl font-black text-blue-600 animate-bounce">404</h1>
      <h2 className="text-3xl font-bold mt-4 text-center">
        ¡Ups! Parece que te has perdido
      </h2>
      <p className="text-slate-400 mt-2 mb-8 text-center max-w-md">
        La página que estás buscando no existe o ha sido movida. 
        No te preocupes, puedes volver a la seguridad del inicio.
      </p>
      
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
      >
        Volver al Inicio
      </button>
    </div>
  );
};