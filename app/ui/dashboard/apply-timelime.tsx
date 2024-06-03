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
}: {
  thisWeek: Array<any>;
  prevWeek: Array<any>;
}) {

  // console.log(thisWeek, prevWeek);

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
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3,4,5,6,7],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [7,6,5,4,3,2,1],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="flex w-full items-center justify-center bg-blue-200 text-center text-4xl rounded-xl 
      col-span-1 
      sm:col-span-4
      lg:col-span-8">
      <Line options={lineOptions} data={lineData} className='min-h-[200px] max-h-[375px]' />
      {/* <Bar options={barOptions} data={barData} className='min-h-[200px] max-h-[375px]' /> */}
    </div>
  )
}