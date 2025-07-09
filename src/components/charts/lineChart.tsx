// LineChartComponent.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const data = {
    labels: ['Jan', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', "Déc"],
    datasets: [
        {
            label: 'Réseravations compléter',
            data:  [17, 25, 30, 20, 7, 22, 15, 47, 33, 78, 90],
            borderColor: 'rgba(17, 104, 0, 0.69)',
            backgroundColor: 'rgba(17, 104, 0, 0.69)',
            tension: 0.4,
        },
        {
            label: 'Réseravations annuler',
            data: [27, 12, 53, 10, 13, 27, 20, 55, 50, 87, 80],
            borderColor: 'rgba(231, 0, 0, 0.69)',
            backgroundColor: 'rgba(231, 0, 0, 0.69)',
            tension: 0.4,
        },
    ],
};

const options = {
    plugins: {
        legend: { position: 'top' as const },
        title: { display: true, text: 'Réservations par mois' },
    },
};

export default function LineChart(){
    return <Line data={ data } options = { options } />;
}
