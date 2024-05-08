import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function AppSearch() {
  return (
    <div className="md:w-3/5 h-16 flex items-center">
      <input className="w-full h-10 pl-2 mr-2 rounded-lg" type="text" placeholder="Search for role..."></input>
      <button className="h-10 w-12 flex justify-center items-center bg-yellow-400 rounded-lg hover:bg-yellow-500">
        <MagnifyingGlassIcon className="w-5 font-bold" />
      </button>
    </div>
  )
}