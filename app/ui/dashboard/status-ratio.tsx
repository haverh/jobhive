'use client';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const statusColors = new Map([
  ["rejected", "bg-red-200"],
  ["accepted", "bg-green-200"],
  ["offered", "bg-blue-200"],
  ["interviewed", "bg-yellow-200"],
  ["pending", "bg-gray-200"]
])

export default function StatusRatio({
  statusratio,
}: {
  statusratio: Array<any>;
}) {

  const pieData = {
    // labels: ['Pending', 'Rejected', 'Interviewed', 'Offered', 'Accepted'],
    labels: statusratio.map((obj) => obj.status),
    datasets: [
      {
        label: 'Amount Applied',
        // data: [12, 19, 3, 5, 2],
        data: statusratio.map((obj) => obj.count),
        backgroundColor: [
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          // 'rgba(255, 204, 0, 0.4)',
          'rgba(191, 192, 194, 0.4',
          'rgba(54, 162, 235, 0.4)',
          'rgba(50, 205, 50, 0.4)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          // 'rgba(255, 204, 0, 1)',
          'rgba(191, 192, 194, 1',
          'rgba(54, 162, 235, 1)',
          'rgba(50, 205, 50, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="stats-background flex w-full items-center justify-center text-center text-4xl rounded-xl 
      col-span-1 
      sm:col-span-4
      lg:col-span-4 ">
      {/* <Pie data={pieData} className='max-w-[100%] max-h-[400px]' /> */}
      <Doughnut data={pieData} className='max-w-[100%] max-h-[400px]' />
    </div>
  )
}