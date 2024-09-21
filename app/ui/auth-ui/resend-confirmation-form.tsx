'use client';
import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { resendConfirmation } from "@/app/lib/action";

export default function ResendConfirmationForm() {
  const [confirmed, setConfirmed] = useState(false)
  const [email, setEmail] = useState("");

  const handleConfirm = async (formData: FormData) => {
    const my_email = formData.get('email') as string;
    setEmail(my_email);

    const {error} = await resendConfirmation(my_email);

    setConfirmed(true);
    // console.log(my_email);
  }

  return (
    <div>
      {confirmed
      ? <div className="text-center flex flex-col items-center p-4">
          <EnvelopeIcon className="size-[150px] text-yellow-300" />
          <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
          <p>Check your email & click the link to verify sent to</p>
          <p className="font-bold text-yellow-400">{email}</p>
        </div>
      : <form action={handleConfirm} className="account-form h-fit w-fit p-4 rounded-lg shadow-lg">
          <h1 className="text-center">Verify Email</h1>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <br />
            <input type="email" id="email" name="email" />
          </div>
          <div className="text-center">
            <button 
            type="submit"
              className="bg-yellow-400 py-2 px-3 font-medium rounded-xl"
            >
              Resend Confirmation
            </button>
          </div>
        </form>
      }
    </div>
  )
}