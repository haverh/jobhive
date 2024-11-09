import Link from "next/link"
import { PlusIcon, PencilSquareIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"


export function AddApplicationButton() {
  return (
    <div className="flex h-16 items-center font-bold dark:text-[#333333]">
      <Link href='/dashboard/applications/add' className="flex items-center bg-yellow-400 dark:bg-[#FF8C42] px-3 py-2 h-10 rounded-lg hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500">
        <p className="text-sm lg:text-base hidden md:inline mr-2">Add Application</p> <PlusIcon className="inline w-4 h-4"/>
      </Link>
    </div>
  )
}

export function JobPostingButton({
  href
}: {
  href: string;
}) {
  
  return (
    <Link target="_blank" href={href} className="flex items-end">
      <ArrowTopRightOnSquareIcon className='w-5 h-5 text-blue-500' />
    </Link>
  )
}

export function EditApplicationButton({
  appId
}: {
  appId: string;
}) {

  return (
    <Link href={`/dashboard/applications/${appId}/edit`} className="flex items-end">
      <PencilSquareIcon className="inline w-5 h-5"/>
    </Link>
  )
}