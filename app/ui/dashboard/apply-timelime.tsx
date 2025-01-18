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
import { Chart, Bar } from 'react-chartjs-2';
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
  appCountByWeek,
  appCountByMonth,
}: {
  appCountByWeek: Array<any>;
  appCountByMonth: Array<any>;
}) {

  const calculateMovingAverage = (data:Array<number>, windowSize:number) => {
    const trend = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - windowSize + 1); // Start of the window
      const slice = data.slice(start, i + 1);       // Get values in the window
      const average = slice.reduce((sum, val) => sum + val, 0) / slice.length;
      trend.push(average);
    }
    return trend;
  }

  const trend = calculateMovingAverage(appCountByWeek.map((obj) => { return obj.count }),3)
  console.log("TRHEND LINE", trend)

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
        text: 'Applications and Trend',
        color: theme === "dark" ? "#d1d5db" : "#111827"
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw;
            if (datasetLabel === 'Trend (3-week Moving Average)') {
              return `${datasetLabel}: ~${value.toFixed(1)} applications`;
            }
            return `${datasetLabel}: ${value} applications`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip for contrast
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
        ticks: {
          maxRotation: 45,
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.split('-')[0].trim(); // Show only the starting date
          },
        },
        grid: {
          color: theme === "dark" ? "#d1d5db1a" : "#1118271a"
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Applications',
        },
        ticks: {
          color: theme === "dark" ? "#d1d5db" : "#111827"
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light gridlines for readability
        },
      }
    },
  }
  
  const barData = {
    labels: appCountByWeek.map((obj) => { return obj.status }),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Applications',
        data: appCountByWeek.map((obj) => { return obj.count }),
        backgroundColor: '#ff8c0e66',
        borderColor: '#ff8c0e',
        borderWidth: 1
      },
      {
        type: 'line' as const,
        label: 'Trend (3-week Moving Average)',
        data: trend,
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#FFF',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="stats-background flex w-full items-center justify-center text-center text-4xl rounded-xl 
      col-span-1 
      sm:col-span-4
      lg:col-span-8">
      {/* <Line options={lineOptions} data={lineData} className='min-h-[200px] max-h-[375px]' /> */}
      <Chart type='bar' options={barOptions} data={barData} className='min-h-[200px] max-h-[375px]' />
    </div>
  )
}