'use client';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const statusColors = [
  {status: "accepted", color: "#4ade80"},
  {status: "interviewed", color: "#facc15"},
  {status: "offered", color: "#60a5fa"},
  {status: "pending", color: "#9ca3af"},
  {status: "rejected", color: "#f87171"},
]
statusColors.sort((a,b) => a.status.localeCompare(b.status));

export default function StatusRatio({
  statusratio,
}: {
  statusratio: Array<any>;
}) {
  const {theme} = useTheme();

  statusratio.sort((a,b) => a.status.localeCompare(b.status));

  const pieData = {
    labels: statusratio.map((obj) => obj.status),
    datasets: [
      {
        label: 'Amount Applied',
        data: statusratio.map((obj) => obj.count),
        backgroundColor: statusColors.map((obj) => obj.color + "80"),
        borderColor: statusColors.map((obj) => obj.color + "FF"),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#d1d5db" : "#111827"
        }
      }
    }
  }


  return (
    <div className="stats-background flex w-full items-center justify-center text-center text-4xl rounded-xl 
      col-span-1 
      sm:col-span-4
      lg:col-span-4 ">
      <Doughnut data={pieData} options={pieOptions} className='max-w-[100%] max-h-[400px]' />
    </div>
  )
}