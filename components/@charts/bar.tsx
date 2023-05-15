'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

interface BarChartProps {
  data: ChartData<'bar', (number | [number, number] | null)[], unknown>;
}

export const BarChart = ({ data }: BarChartProps) => {
  return (
    <div className="w-full">
      <Bar options={options} data={data} />
    </div>
  );
};
