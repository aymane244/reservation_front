// BarChart.tsx
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
    labels: ['Jan', 'Fév' ,'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', "Déc"],
    datasets: [
        {
            label: 'Compléter',
            data: [26, 10, 20, 42, 37, 35, 10, 15, 8, 12, 7, 11],
            backgroundColor: '#198754',
        },
        {
            label: 'En attente',
            data: [20, 22, 19, 25, 18, 24, 8, 14, 3, 1, 5, 3],
            backgroundColor: '#0d6efd',
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                color: '#000',
                font: {
                    size: 14,
                },
            },
        },
        title: {
            display: true,
            text: 'Tickets',
            align: 'start',
            color: '#000',
            font: {
                size: 18,
                weight: 'bold',
            },
            padding: {
                top: 10,
                bottom: 20,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 5,
                color: '#000',
                font: {
                    size: 12,
                },
            },
            grid: {
                color: '#e0e0e0',
            },
        },
        x: {
            ticks: {
                color: '#000',
                font: {
                    size: 12,
                },
            },
            grid: {
                display: false,
            },
        },
    },
};

export default function AdminBarChart() {
    return <Bar data={data} options={options} />;
}
