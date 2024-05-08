import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon, 
  ChatBubbleBottomCenterIcon,
  DocumentCheckIcon} from '@heroicons/react/24/solid';
import clsx from "clsx";


const statuses = new Map([
  ["rejected", <XMarkIcon key="rejected" className='w-4 h-4 text-red-500'/>],
  ["accepted", <CheckIcon key="accepted" className='w-4 h-4 text-green-500'/>],
  ["offered", <DocumentCheckIcon key="offered" className='w-4 h-4 text-blue-500'/>],
  ["interviewed", <ChatBubbleBottomCenterIcon key="interviewed" className='w-4 h-4 text-yellow-500'/>],
  ["pending", <ClockIcon key="pending" className='w-4 h-4 text-gray-500'/>]
]);

const statusColors = new Map([
  ["rejected", "bg-red-200"],
  ["accepted", "bg-green-200"],
  ["offered", "bg-blue-200"],
  ["interviewed", "bg-yellow-200"],
  ["pending", "bg-gray-200"]
])

const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
}

export default function AppStatus({ status }: { status: string; }) {
  return (
    <div className={clsx(
      'flex w-fit items-center py-1 px-2 rounded-full',
      {
        "bg-red-200 " : status === "rejected",
        "bg-green-200" : status === "accepted",
        "bg-blue-200" : status === "offered",
        "bg-yellow-200" : status === "interviewed",
        "bg-gray-200" : status === "pending",
      }
    )}>
      <p className='w-fit mr-2'>{capitalize(status)}</p>
      {statuses.get(status)}
    </div>
  ) 
}