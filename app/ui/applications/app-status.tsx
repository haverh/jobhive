import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon, 
  ChatBubbleBottomCenterIcon,
  DocumentCheckIcon} from '@heroicons/react/24/solid';
import clsx from "clsx";


const statuses = new Map([
  ["rejected", <XMarkIcon key="rejected" className='w-4 h-4 text-red-600 dark:text-red-400'/>],
  ["accepted", <CheckIcon key="accepted" className='w-4 h-4 text-green-600 dark:text-green-400'/>],
  ["offered", <DocumentCheckIcon key="offered" className='w-4 h-4 text-blue-600 dark:text-blue-400'/>],
  ["interviewed", <ChatBubbleBottomCenterIcon key="interviewed" className='w-4 h-4 text-yellow-600 dark:text-yellow-400'/>],
  ["pending", <ClockIcon key="pending" className='w-4 h-4 text-gray-500  dark:text-gray-400'/>]
]);

const statusColors = new Map([
  ["rejected", "bg-red-200"],
  ["accepted", "bg-green-200"],
  ["offered", "bg-blue-200"],
  ["interviewed", "bg-yellow-200"],
  ["pending", "bg-gray-200"]
])

const capitalize = (status:string) => {
  return status[0].toUpperCase() + status.slice(1);
}

export default function AppStatus({ status }: { status: string; }) {
  return (
    <div className={clsx(
      'flex w-fit items-center py-1 px-2 rounded-full',
      {
        "bg-red-200 dark:bg-red-900" : status === "rejected",
        "bg-green-200 dark:bg-green-900" : status === "accepted",
        "bg-blue-200 dark:bg-blue-900" : status === "offered",
        "bg-yellow-200 dark:bg-yellow-900" : status === "interviewed",
        "bg-gray-200 dark:bg-gray-700" : status === "pending",
      }
    )}>
      <p className='w-fit mr-2'>{capitalize(status)}</p>
      {statuses.get(status)}
    </div>
  ) 
}