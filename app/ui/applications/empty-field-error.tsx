import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Dispatch, SetStateAction } from "react"


export default function EmptyFieldError({
  setDisplay
}: {
  setDisplay: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className='absolute top-40 mx-2 flex h-[75px] w-4/5 md:w-full min-w-[300px] max-w-[400px] bg-white shadow-lg shadow-red-200 md:top-8 md:right-8'>
      <div className='h-full w-[5px] bg-red-500 mr-4'></div>
      <div className='pt-4 mr-4'><ExclamationCircleIcon className='w-6 h-6 text-red-500' /></div>
      <div className='flex-grow pt-4 '>
        <h3 className='font-bold'>Error</h3>
        <p>Please fill in all fields.</p>
      </div> 
      <div className='pt-1 pr-1'>
        <button onClick={() => setDisplay(false)}><XMarkIcon className='w-5 h-5 text-red-500' /></button>
      </div>
    </div>
  )
}