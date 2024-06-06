'use client';
import { useState, MouseEvent } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { User } from "../../lib/definitions";
import { signInUser } from '@/app/lib/action';

export default function SignInForm() {
  const [userData, setUserData] = useState<User>({name:'', email:'', password:''});
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setVisible(prev => !prev);
  }

  const submitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signInUser(userData);
  }

  return (
    <form className="bg-white h-fit w-fit p-7 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl text-center">Sign In</h1>
      <div>
        <div>
          <label htmlFor="email"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Email</label>
          <div className="border border-solid border-gray-400 rounded-xl focus:outline-black">
            <input type="email" id="email" name="email" placeholder="Enter your email address"
              className="w-full px-3 py-1 rounded-xl border-0 focus:ring-0"
              onChange={(e) => { setUserData({...userData, email: e.target.value})}}
              required></input>
          </div>
        </div>

        <div>
          <label htmlFor="password"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Password</label>
          <div className="outline-none border border-solid border-gray-400 rounded-xl flex items-center pr-2 focus:border-2">
            <input type={visible ? "text" :"password"} id="password" name="password" placeholder="Enter your password"
              className="pl-3 py-1 rounded-xl mr-1 border-0 focus:ring-0"
              onChange={(e) => { setUserData({...userData, password: e.target.value})}}
              required></input>
            <div>
              {visible ?
                <EyeSlashIcon className="w-5 hover:cursor-pointer" onClick={(event) => toggleVisibility(event)} /> 
                : <EyeIcon className="w-5 hover:cursor-pointer" onClick={(event) => toggleVisibility(event)} />}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button 
          className="w-full bg-yellow-400 py-2 px-3 rounded-xl font-medium hover:bg-yellow-300 active:bg-yellow-500"
          onClick={(e) => {submitForm(e)}}>
          Sign In
        </button>
      </div>
      
      <hr className="my-4 h-[2px] text-gray-500 bg-gray-500"/>
      <Link href="/reset-password" className="text-yellow-500">Forgot Password?</Link>
      <p>Don&apos;t have an account? <Link href="/register" className="text-yellow-500">Register</Link></p>
    </form>
  )
};