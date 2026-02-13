import Chart from 'react-apexcharts';

// Agregamos { users } como prop
export const UserTrendChart = ({ users = [] }: any) => {
    
    // 1. Contamos cuántos usuarios hay de cada rol
 const roles = ['superadmin', 'admin', 'usuario']; // Los valores exactos que vienen del back
const counts = roles.map(role => 
    users.filter((u: any) => 
        u.role?.toLowerCase().trim() === role
    ).length
);
    const chartOptions: any = {
        chart: {
            id: 'user-role-distribution',
            toolbar: { show: false },
            background: 'transparent',
        },
        theme: { mode: 'dark' },
        // Cambiamos las categorías a los Roles
        xaxis: {
            // Aquí puedes poner los nombres lindos para mostrar
            categories: ['SuperAdmins', 'Admins', 'Usuarios'], 
            labels: { style: { colors: '#94a3b8', fontSize: '10px' } }
        },
        yaxis: {
            labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
            forceNiceScale: true,
            decimalsInFloat: 0 // Para que no muestre 1.5 usuarios
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '50%',
                distributed: true, // Esto permite colores distintos por barra
            }
        },
        colors: ["#8b5cf6", "#3b82f6", "#10b981"], // Violeta, Azul, Verde
        dataLabels: { enabled: false },
        grid: {
            borderColor: '#334155',
            strokeDashArray: 4,
        },
        tooltip: { theme: 'dark' },
        legend: { show: false }
    };

    // 2. Pasamos los datos calculados a la serie
    const chartSeries = [{
        name: "Total",
        data: counts
    }];

    return (
        <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-700/50 h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Distribución de Roles</h3>
                    <p className="text-[10px] text-slate-500">Cantidad de personal por jerarquía</p>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-xl">
                    <i className="fa-solid fa-users-gear text-blue-400"></i>
                </div>
            </div>
            <Chart 
                options={chartOptions} 
                series={chartSeries} 
                type="bar" // Cambiado de "line" a "bar" para que se vea mejor
                height={320} 
            />
        </div>
    );
};