'use client';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function StatusRatio({
  statusratio,
}: {
  statusratio: Array<any>;
}) {

  console.log(statusratio)
  const pieData = {
    // labels: ['Pending', 'Rejected', 'Interviewed', 'Offered', 'Accepted'],
    labels: statusratio.map((obj) => obj.status),
    datasets: [
      {
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2],
        data: statusratio.map((obj) => obj.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="flex w-full items-center justify-center bg-blue-200 text-center text-4xl rounded-xl 
      col-span-1 
      sm:col-span-4
      lg:col-span-4 ">
      <Pie data={pieData} className='max-w-[100%] max-h-[400px]' />
    </div>
  )
}