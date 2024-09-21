'use client';
import { Button } from "../../button"
import clsx from "clsx"
import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { deleteAccount } from "@/app/lib/action";
import { XMarkIcon } from "@heroicons/react/24/outline";

function ConfirmPopUp({
  user_id,
  setModal
}: {
  user_id: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {

  const confirmDeletion = () => {
    // event.preventDefault();
    setModal(false);
    // console.log("Confirmed Deletion of your Account with ID:", user_id)
    // deleteAccount(user_id);
  }

  return (
    <div className="absolute flex items-center justify-center w-full h-full bg-gray-400 rounded-xl p-4">
      <div className="relative flex flex-col w-fit max-w-[400px] pl-4 pb-4 shadow-lg absolute bg-gray-200 rounded-xl">
        <div className="w-full flex justify-end">
          <button className="mt-2 mr-2" onClick={() => setModal(false)}>
            <XMarkIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center pt-4 pr-4">
          <h1 className="text-center mb-2 text-lg font-bold sm:text-xl">Account Deletion Confirmation</h1>
          <p className="text-center mb-4 text-sm sm:text-base">This action is permanent and you will lose all your data. Are your sure your want to continue?</p>
          <Button className="w-4/5 text-sm mx-auto px-3 py-2 bg-yellow-400 rounded-xl hover:bg-yellow-300 active:bg-yellow-500 sm:w-3/5 sm:text-base"
            onClick={() => confirmDeletion()}>
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
  const [confirmModal, setConfirmModal] = useState(false);
  const confirmationMsg = 'Delete My JobHive Account';

  const initializeDeletion = ( event: MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    setConfirmModal(true);

    // console.log("Initalizing Deletion of your Account with ID:", user_id)

    // deleteAccount(user_id);
  }

  return (
    <div className="relative w-full h-full">
      {confirmModal && <ConfirmPopUp user_id={user_id} setModal={setConfirmModal} />}
      <h1 className="font-bold text-xl mb-4">Delete Your Account</h1>
      <h2 className="text-base mb-2">To delete your account, type the text below in the input box to confirm.</h2>
      
      <div className="flex justify-center bg-gray-200 mb-4 py-2 rounded-lg">
        <p className="text-base">&quot;Delete My JobHive Account&quot;</p>
      </div>
      
      <form className="settings-form flex flex-col p-4 rounded-xl">
        <label htmlFor="confirmText" className="mb-2">Confirm Deletion</label>
        <input type="text" id="confirmText" name="confirmText" className="text-red-800 rounded-xl focus:ring-0"
          onChange={(e) => {setMatch(e.target.value === confirmationMsg)}}></input>
        <Button disabled={!match} className={clsx(
        "px-3 py-2 mt-4 rounded-xl font-bold",
        {
          "text-gray-400 bg-red-100" : !match,
          "text-black bg-red-400 hover:text-gray-700 hover:bg-red-400 active:bg-red-500" : match,
        }
        )}
          onClick={(e) => {initializeDeletion(e)}}>
          Delete Account
        </Button>
      </form>
    </div>
  )
}