import { 
  UserIcon,
  PencilIcon,
  TrashIcon,
  } from "@heroicons/react/24/outline";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import clsx from 'clsx';

export default function SubNav() {
  const searchParams = useSearchParams();
  const task = searchParams.get("task");

  return (
    <div className="p-2">
      <div className="flex w-full items-center gap-2 bg-gray-100 mr-4 p-2 lg:flex-col lg:h-full ">
        <Link href='?modal=true&tab=account&task=view'
          className={clsx(
            'w-fit flex item-center p-3 items-center mb-1 rounded-xl bg-gray-200 hover:bg-yellow-100 hover:text-yellow-600 hover:cursor-pointer lg:w-full',
            {
              "bg-yellow-100 text-yellow-500": task === 'view',
            }
        )}>
          <UserIcon className="w-5 h-5" /> <span className="ml-1 text-sm hidden sm:block">Profile</span>
        </Link>
        <Link href='?modal=true&tab=account&task=edit'
          className={clsx(
            'w-fit flex  p-3 items-center mb-1 rounded-xl bg-gray-200 hover:bg-yellow-100 hover:text-yellow-600 hover:cursor-pointer lg:w-full',
            {
              "bg-yellow-100 text-yellow-500": task === 'edit',
            }
        )}>
          <PencilIcon className="w-5 h-5" /> <span className="ml-1 text-sm hidden sm:block">Edit Profile</span>
        </Link>
        <Link href='?modal=true&tab=account&task=delete'
          className={clsx(
            'w-fit flex  p-3 items-center mb-1 rounded-xl bg-gray-200 hover:bg-yellow-100 hover:text-yellow-600 hover:cursor-pointer lg:w-full',
            {
              "bg-yellow-100 text-yellow-500": task === 'delete',
            }
        )}>
          <TrashIcon className="w-5 h-5" /> <span className="ml-1 text-sm hidden sm:block">Delete Account</span>
        </Link>
      </div>
    </div>
  )
}