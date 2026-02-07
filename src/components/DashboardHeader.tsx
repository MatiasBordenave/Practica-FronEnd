export const DashboardHeader = ({ onAdd, currentUser }: any) => (
    <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-3xl font-bold font-sans">Panel de Control</h1>
        
        {/* Lógica de rol con el usuario del store */}
        {(currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
            <button 
                onClick={onAdd} 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 active:scale-95"
            >
                + Nuevo Usuario
            </button>
        )}
    </div>
);
