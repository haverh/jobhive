import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import { deleteApplication } from "@/app/lib/action";


export function AddApplicationButton() {
  return (
    <div className="flex h-16 items-center">
      <Link href='/dashboard/applications/add' className="flex items-center bg-yellow-400 px-3 py-2 h-10 rounded-lg hover:bg-yellow-500">
        <p className="inline mr-2">Add Application</p> <PlusIcon className="inline w-4 h-4"/>
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
    <Link target="_blank" href={href}>
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
    <Link href={`/dashboard/applications/${appId}/edit`} >
      <PencilSquareIcon className="inline w-5 h-5"/>
    </Link>
  )
}

export function DeleteApplicationButton({
  appId
}: {
  appId: string;
}) {

  const deleteAppWithId = deleteApplication.bind(null, appId); 

  return (
    <form action={deleteAppWithId}>
      <button>
        <TrashIcon className='w-5 h-5 text-red-500' />
      </button>
    </form>
    
    
  )
}