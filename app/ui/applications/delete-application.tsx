"use client";
import { useState } from "react";
import { deleteApplication } from "@/app/lib/action";

import { TrashIcon } from "@heroicons/react/24/solid";
import router from "next/router";


interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AppDeletionConfirmation = (
  {isOpen, onCancel, onConfirm}
  : ConfirmationModalProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg">
        <p className="text-lg">Are you sure you want to delete this entry?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onCancel} className="bg-gray-300 dark:bg-[#2C2C2C] hover:bg-gray-200 dark:hover:bg-[#333333] px-4 py-2 rounded">Cancel</button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  )
}

export function DeleteApplicationButton({
  appId
}: {
  appId: string;
}) {
  const [isConfirmationOpen, setIsConfrimationOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsConfrimationOpen(true);
  }
  
  const handleCancellation = () => {
    setIsConfrimationOpen(false);
  }

  const handleConfirmation = async () => {
    setIsDeleting(true);

    try {
      // 2. Call the Server Action and await its completion
      const result = await deleteApplication(appId); 

      // 3. Handle the result (optional, but good practice)
      if (result && result.success) {
        // Data is now deleted on the server, and the necessary data is revalidated.
        console.log(`Application ${appId} deleted successfully.`);
      } else {
        console.error("Deletion failed on server:", result.error);
        if (result.redirectTo) {
          router.replace(result.redirectTo);
          return; // Stop further execution in this function
        }
      }

    } catch (error) {
      console.error("Network or unexpected error during deletion:", error);
      // You could show an error toast here
    } finally {
      // 4. Reset states: stop loading and CLOSE the modal.
      setIsDeleting(false);
      setIsConfrimationOpen(false); 
    }
    deleteApplication(appId);
    setIsConfrimationOpen(false);
  }

  

  return (
    <>
      <form className="flex items-end">
        <button onClick={handleDeleteClicked}>
          <TrashIcon className='w-5 h-5 text-red-500' />
        </button>
      </form>
      <AppDeletionConfirmation 
        isOpen={isConfirmationOpen}
        onCancel={handleCancellation}
        onConfirm={handleConfirmation}
      />
    </>
    
    
    
  )
}