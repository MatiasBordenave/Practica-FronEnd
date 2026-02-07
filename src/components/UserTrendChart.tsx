import Chart from 'react-apexcharts';

export const UserTrendChart = () => {
    const chartOptions: any = {
        chart: {
            id: 'user-trend',
            toolbar: { show: false },
            background: 'transparent',
            dropShadow: {
                enabled: true,
                color: '#3b82f6',
                top: 10,
                left: 0,
                blur: 10,
                opacity: 0.15
            }
        },
        theme: { mode: 'dark' },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#94a3b8', fontSize: '12px' } }
        },
        yaxis: {
            labels: { style: { colors: '#94a3b8', fontSize: '12px' } }
        },
        grid: {
            borderColor: '#334155',
            strokeDashArray: 4,
            xaxis: { lines: { show: true } }
        },
        colors: ["#3b82f6"], // Azul vibrante para que combine con el resto
        stroke: {
            curve: 'smooth',
            width: 4,
            lineCap: 'round'
        },
        markers: {
            size: 6,
            colors: ['#1e293b'],
            strokeColors: '#3b82f6',
            strokeWidth: 3,
            hover: { size: 8 }
        },
        tooltip: { theme: 'dark' }
    };

    const chartSeries = [{
        name: "Registros",
        data: [2, 2, 3, 5, 10, 12, 18, 20]
    }];

    return (
        <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-700/50 h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Tendencia de Usuarios</h3>
                    <p className="text-[10px] text-slate-500">Crecimiento mensual de la plataforma</p>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-xl">
                    <i className="fa-solid fa-arrow-trend-up text-blue-400"></i>
                </div>
            </div>
            <Chart 
                options={chartOptions} 
                series={chartSeries} 
                type="line" 
                height={320} 
            />
        </div>
    );
};