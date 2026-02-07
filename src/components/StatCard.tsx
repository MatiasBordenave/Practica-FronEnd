export const StatCard = ({ title, count, color, icon }: any) => {
    // Mapeo de colores para el resplandor sutil
    const glowColors: any = {
        "bg-slate-200": "shadow-slate-500/10 border-slate-700/50",
        "bg-green-200": "shadow-emerald-500/10 border-emerald-500/20",
        "bg-yellow-200": "shadow-amber-500/10 border-amber-500/20",
        "bg-red-200": "shadow-rose-500/10 border-rose-500/20"
    };

    return (
        <div className={`bg-[#1e293b]/40 backdrop-blur-md p-6 rounded-3xl border ${glowColors[color]} shadow-xl transition-all duration-300 hover:translate-y-[-4px]`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
                    <p className="text-3xl font-black text-white">{count}</p>
                </div>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color.replace('200', '500/20')} ${color.replace('bg-', 'text-')}`}>
                    <i className={`fa-solid ${icon || 'fa-chart-simple'} text-lg`}></i>
                </div>
            </div>
            {/* Decoración inferior: una pequeña línea de progreso estética */}
            <div className="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div className={`h-full opacity-50 ${color.replace('200', '500')}`} style={{ width: '60%' }}></div>
            </div>
        </div>
    );
};