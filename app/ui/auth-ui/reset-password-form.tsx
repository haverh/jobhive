'use client';
import { useState, MouseEvent } from "react"
import { EyeIcon, EyeSlashIcon, CheckIcon } from "@heroicons/react/24/solid";
import { updatePassword } from "../../lib/action";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const code = params.get('code');
  
  const [visible, setVisible] = useState([false, false]);

  const togglePassword = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setVisible(prev => [!prev[0], prev[1]]);
  }

  const toggleConfirmPassword = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setVisible(prev => [prev[0], !prev[1]]);
  }

  const resetPassword = async (formData: FormData) => {

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if ( password === confirmPassword ) {
      const data = await updatePassword(password, code);

      // console.log(data);
      redirect(`/${data.subdirectory}?${data.parameters}`);
    }
  }

  return (
    <form action={resetPassword} className="bg-white h-fit w-fit p-7 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl text-center mb-4">Reset Password</h1>
      <p className="max-w-[300px] text-sm text-center">Enter a new password to change your password.</p>
      <div>
        <div className="w-fit">
          <label htmlFor="password"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Password</label>
          <div className="outline-none border border-solid border-gray-400 rounded-xl flex pr-2">
            <input type={visible[0] ? "text" :"password"} id="password" name="password" placeholder="Enter your password"
              className="pl-3 py-1 rounded-xl border-0 focus:ring-0"
              required></input>
            <CheckIcon className="w-5 text-yellow-500" />
            {visible[0] ? 
              <EyeSlashIcon className="w-5 hover:cursor-pointer" onClick={(event) => togglePassword(event)} /> 
              : <EyeIcon className="w-5 hover:cursor-pointer" onClick={(event) => togglePassword(event)} />}
          </div>
        </div>

        <div className="w-fit">
          <label htmlFor="confirmPassword"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Confirm Password</label>
          <div className="outline-none border border-solid border-gray-400 rounded-xl flex pr-2">
            <input type={visible[1] ? "text" :"password"} id="confirmPassword" name="confirmPassword" placeholder="Enter your password again"
              className="pl-3 py-1 rounded-xl border-0 focus:ring-0"
              required></input>
            <CheckIcon className="w-5 text-yellow-500" />
            {visible[1] ? 
              <EyeSlashIcon className="w-5 hover:cursor-pointer" onClick={(event) => toggleConfirmPassword(event)} /> 
              : <EyeIcon className="w-5 hover:cursor-pointer" onClick={(event) => toggleConfirmPassword(event)} />}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button 
          className="w-full bg-yellow-400 py-2 px-3 rounded-xl font-medium hover:bg-yellow-300 focus:bg-yellow-500">
          Reset Password
        </button>
      </div>
    </form>
  )
};