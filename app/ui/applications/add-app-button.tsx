import Link from "next/link"
import { PlusIcon } from "@heroicons/react/24/solid"

export default function AddApplicationButton() {
  return (
    <div className="flex h-16 items-center">
      <Link href='/dashboard/applications/add' className="flex items-center bg-yellow-400 px-3 py-2 h-10 rounded-lg hover:bg-yellow-500">
        <p className="inline mr-2">Add Application</p> <PlusIcon className="inline w-4 h-4"/>
      </Link>
      
    </div>
    
  )
}