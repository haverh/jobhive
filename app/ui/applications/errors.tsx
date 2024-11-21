import { MouseEvent, useEffect, useState } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { Dispatch, SetStateAction } from "react"


export function EmptyFieldError({
  display,
  setDisplay,
  errorDescription,
}: {
  display: boolean,
  setDisplay: Dispatch<SetStateAction<boolean>>,
  errorDescription: string
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(display);
  }, [display]);

  const handleExit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setVisible(false)
    setTimeout(() => {
      setDisplay(false);
    }, 700);
  }
  
  return (
    <div className={
      clsx('absolute top-40 mx-2 flex h-[75px] w-4/5 md:w-full min-w-[300px] max-w-[400px] bg-white dark:bg-[#1E1E1E] shadow-md shadow-red-300 dark:shadow-red-400 md:top-8 md:right-8 transition-opacity duration-500',
        {
          'opacity-100': visible,
          'opacity-0': !visible,
        }
      )}>
      <div className='h-full w-[5px] bg-red-500 mr-4'></div>
      <div className='pt-4 mr-4'><ExclamationCircleIcon className='w-6 h-6 text-red-500' /></div>
      <div className='flex-grow pt-4 '>
        <h3 className='font-bold'>Error</h3>
        <p>{errorDescription}</p>
      </div> 
      <div className='pt-1 pr-1'>
        <button onClick={(e) => {handleExit(e)}}><XMarkIcon className='w-5 h-5 text-red-500' /></button>
      </div>
    </div>
  )
}