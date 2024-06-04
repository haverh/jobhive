'use client';
import { Button } from "../../button"
import clsx from "clsx"
import { useState } from "react";

export default function DeleteAccount() {
  const [match, setMatch] = useState(false);
  const confirmationMsg = 'Delete My JobHive Account';

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">Delete Your Account</h1>
      <h2 className="text-base mb-2">To delete your account, type the text below in the input box to confirm.</h2>
      
      <div className="flex justify-center bg-gray-200 mb-4 py-2 rounded-lg">
        <p className="text-base">&quot;Delete My JobHive Account&quot;</p>
      </div>
      
      <form className="flex flex-col">
        <label htmlFor="confirmText" className="text-gray-400">Confirm Deletion</label>
        <input type="text" id="confirmText" name="confirmText" className="text-red-800 rounded-xl focus:ring-0"
          onChange={(e) => {setMatch(e.target.value === confirmationMsg)}}></input>
        <Button disabled={!match} className={clsx(
        "px-3 py-2 mt-4 rounded-xl",
        {
          "bg-red-100" : !match,
          "bg-red-400 hover:bg-red-300 active:bg-red-500" : match,
        }
        )}>
          Delete Account
        </Button>
      </form>
    </div>
  )
}