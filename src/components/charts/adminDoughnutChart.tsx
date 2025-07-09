// DoughnutChart.tsx
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Plan 1', 'Plan 2', 'Plan 3'],
    datasets: [
        {
            label: 'Plans',
            data: [26, 50, 10],
            backgroundColor: ['#0d6efd', '#198754', '#dc3545'], // Bootstrap colors
            borderColor: ['#fff', '#fff', '#fff'],
            borderWidth: 2,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                color: '#000', // text color
                font: {
                    size: 14,
                },
            },
        },
    },
};

export default function AdminDoughnutChart() {
    return <Doughnut data={data} options={options} />;
}
