'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ApplyTimeline({
  thisWeek,
  prevWeek,
  appCountByMonth,
}: {
  thisWeek: Array<any>;
  prevWeek: Array<any>;
  appCountByMonth: Array<any>;
}) {

  const {theme} = useTheme()
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === "dark" ? "#d1d5db" : "#111827"
        }
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
        color: theme === "dark" ? "#d1d5db" : "#111827"
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#d1d5db" : "#111827"
        },
        grid: {
          color: theme === "dark" ? "#d1d5db1a" : "#1118271a"
        }
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#d1d5db" : "#111827"
        },
        grid: {
          color: theme === "dark" ? "#d1d5db1a" : "#1118271a"
        }
      }
    },
  }
  
  const barData = {
    labels: appCountByMonth.map((obj) => { return obj.status }),
    datasets: [
      {
        label: 'Total Jobs Applied',
        data: appCountByMonth.map((obj) => { return obj.count }),
        backgroundColor: '#ff8c0e66',
        borderColor: '#ff8c0e',
        borderWidth: 1
      },
    ],
  };

  return (
    <div className="stats-background flex w-full items-center justify-center text-center text-4xl rounded-xl 
      col-span-1 
      sm:col-span-4
      lg:col-span-8">
      {/* <Line options={lineOptions} data={lineData} className='min-h-[200px] max-h-[375px]' /> */}
      <Bar options={barOptions} data={barData} className='min-h-[200px] max-h-[375px]' />
    </div>
  )
}