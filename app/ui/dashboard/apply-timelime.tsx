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
import { Line, Bar } from 'react-chartjs-2';

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

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Application Timeline',
      },
    },
  };
  
  const lineData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'This Week',
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // data: [1,2,3,4,5,6,7],
        data: thisWeek.map((obj) => { return obj.count }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Previous Week',
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // data: [7,6,5,4,3,2,1],
        data: prevWeek.map((obj) => { return obj.count }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }
  
  const barData = {
    labels: appCountByMonth.map((obj) => { return obj.status }),
    datasets: [
      {
        label: 'Total Jobs Applied',
        data: appCountByMonth.map((obj) => { return obj.count }),
        backgroundColor: 'rgba(255, 87, 51, 0.4)',
        borderColor: 'rgb(255, 87, 51)',
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