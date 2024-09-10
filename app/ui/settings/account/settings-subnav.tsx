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
    <div className="modal-nav p-2">
      <div className="flex w-full items-center gap-2 mr-4 p-2 lg:flex-col lg:h-full ">
        <Link href='?modal=true&tab=account&task=view'
          className={clsx(
            'hoverable w-fit flex item-center p-3 items-center mb-1 rounded-xl lg:w-full',
            {
              "text-yellow-500": task === 'view',
            }
        )}>
          <UserIcon className="size-5" /> <span className="ml-1 text-sm hidden sm:block">Profile</span>
        </Link>
        <Link href='?modal=true&tab=account&task=edit'
          className={clsx(
            'hoverable w-fit flex  p-3 items-center mb-1 rounded-xl lg:w-full',
            {
              "text-yellow-500": task === 'edit',
            }
        )}>
          <PencilIcon className="size-5" /> <span className="ml-1 text-sm hidden sm:block">Edit Profile</span>
        </Link>
        <Link href='?modal=true&tab=account&task=delete'
          className={clsx(
            'hoverable w-fit flex  p-3 items-center mb-1 rounded-xl lg:w-full',
            {
              "text-yellow-500": task === 'delete',
            }
        )}>
          <TrashIcon className="size-6" /> <span className="ml-1 text-sm hidden sm:block">Delete Account</span>
        </Link>
      </div>
    </div>
  )
}