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
    <div className="w-fit bg-gray-50 mr-4 p-2">
      <Link href='?modal=true&tab=account&task=view'
        className={clsx(
          'flex w-full p-3 items-center mb-1 rounded-xl bg-gray-100 hover:bg-yellow-100 hover:text-yellow-600 hover:cursor-pointer',
          {
            "bg-yellow-100 text-yellow-500": task === 'view',
          }
      )}>
        <UserIcon className="w-5 h-5 mr-1" /> <span className="hidden xl:block">Profile</span>
      </Link>
      <Link href='?modal=true&tab=account&task=edit'
        className={clsx(
          'flex w-full p-3 items-center mb-1 rounded-xl bg-gray-100 hover:bg-yellow-100 hover:text-yellow-600 hover:cursor-pointer',
          {
            "bg-yellow-100 text-yellow-500": task === 'edit',
          }
      )}>
        <PencilIcon className="w-5 h-5 mr-1" /> <span className="hidden xl:block">Edit Profile</span>
      </Link>
      <Link href='?modal=true&tab=account&task=delete'
        className={clsx(
          'flex w-full p-3 items-center mb-1 rounded-xl bg-gray-100 hover:bg-yellow-100 hover:text-yellow-600 hover:cursor-pointer',
          {
            "bg-yellow-100 text-yellow-500": task === 'delete',
          }
      )}>
        <TrashIcon className="w-5 h-5 mr-1" /> <span className="hidden xl:block">Delete Account</span>
      </Link>
    </div>
  )
}