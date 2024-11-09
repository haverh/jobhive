'use client';
import { Button } from "../../button"
import clsx from "clsx"
import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { deleteAccount } from "@/app/lib/action";
import { XMarkIcon } from "@heroicons/react/24/outline";


interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmPopUp({
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {

  if (!isOpen) return null;

  return (
    <div className="absolute flex items-center justify-center w-full h-full bg-gray-400 dark:bg-[#2C2C2C] rounded-xl p-4">
      <div className="relative flex flex-col w-fit max-w-[400px] pl-4 pb-4 shadow-lg absolute bg-gray-200 dark:bg-[#383838] rounded-xl">
        <div className="flex flex-col justify-center items-center pt-4 pr-4">
          <h1 className="text-center mb-2 text-lg font-bold sm:text-xl">Account Deletion Confirmation</h1>
          <p className="text-center mb-4 text-sm sm:text-base">This action is permanent and you will lose all your data. Are your sure your want to continue?</p>
          <Button className="w-4/5 text-sm mx-auto px-3 py-2 bg-yellow-400 dark:bg-[#FF8C42] rounded-xl hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500 sm:w-3/5 sm:text-base"
            onClick={() => onCancel}>
            Cancel
          </Button>
          <Button className="w-4/5 text-sm mx-auto px-3 py-2 bg-yellow-400 dark:bg-[#FF8C42] rounded-xl hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500 sm:w-3/5 sm:text-base"
            onClick={() => onConfirm}>
            Confirm Deletion
          </Button>
        </div>
        
      </div>
    </div>
  )
}

export default function DeleteAccount({
  user_id
}: {
  user_id: string;
}) {
  const [match, setMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirmationMsg = 'Delete My JobHive Account';

  const initializeDeletion = ( event: MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    setIsModalOpen(true);
  }

  const handleCancellation = () => {
    setIsModalOpen(false);
  }

  const handleDeletion = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="relative w-full h-full">
      <h1 className="font-bold text-xl mb-4">Delete Your Account</h1>
      <h2 className="text-base mb-2">To delete your account, type the text below in the input box to confirm.</h2>
      
      <div className="flex justify-center mb-4 py-2 border border-solid border-[#555555] bg-gray-200 dark:bg-[#2C2C2C] dark:text-[#FFFFFF] rounded-lg">
        <p className="text-base">&quot;Delete My JobHive Account&quot;</p>
      </div>
      
      <form className="settings-form flex flex-col p-4 rounded-xl">
        <label htmlFor="confirmText" className="mb-2">Confirm Deletion</label>
        <input type="text" id="confirmText" name="confirmText" className="text-red-800 rounded-xl focus:ring-0"
          onChange={(e) => {setMatch(e.target.value === confirmationMsg)}}></input>
        <Button disabled={!match} className={clsx(
        "px-3 py-2 mt-4 rounded-xl font-bold",
        {
          "text-gray-400 bg-red-100 dark:bg-red-200" : !match,
          "text-black dark:text-white bg-red-400 dark:bg-red-[#FF4C4C] hover:text-gray-700 hover:bg-red-400 dark:hover:bg-[#FF1F1F] active:bg-red-500" : match,
        }
        )}
          onClick={(e) => {initializeDeletion(e)}}>
          Delete Account
        </Button>
      </form>
      <ConfirmPopUp
        isOpen={isModalOpen}
        onCancel={handleCancellation}
        onConfirm={handleDeletion}
      />
    </div>
  )
}