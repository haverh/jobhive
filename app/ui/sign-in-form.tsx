'use client';
import { useState, MouseEvent } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { User } from "../lib/definitions";
import { signInUser } from '@/app/lib/action';

export default function SignInForm() {
  const [userData, setUserData] = useState<User>({name:'', email:'', password:''});
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (event: MouseEvent<HTMLButtonElement>) => {
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
          <div className="border border-solid border-gray-400 rounded-full focus:outline-black">
            <input type="email" id="email" name="email" placeholder="Enter your email address"
              className="w-full px-3 py-1 rounded-full focus:outline-none"
              onChange={(e) => { setUserData({...userData, email: e.target.value})}}
              required></input>
          </div>
        </div>

        <div>
          <label htmlFor="password"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Password</label>
          <div className="outline-none border border-solid border-gray-400 rounded-full flex pr-2">
            <input type={visible ? "text" :"password"} id="password" name="password" placeholder="Enter your password"
              className="pl-3 py-1 rounded-full focus:border-red-600"
              onChange={(e) => { setUserData({...userData, password: e.target.value})}}
              required></input>
            <button onClick={(event) => toggleVisibility(event)}>
              {visible ? <EyeSlashIcon className="w-5" /> : <EyeIcon className="w-5" />}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button 
          className="w-full bg-yellow-500 py-2 px-3 rounded-full font-medium hover:bg-yellow-400"
          onClick={(e) => {submitForm(e)}}>
          Sign In
        </button>
      </div>
      
      <hr className="my-4 h-[2px] text-gray-500 bg-gray-500"/>
      <p className="text-sky-500">Forgot Password?</p>
      <p>Don&apos;t have an account? <Link href="/sign-up" className="text-sky-500">Sign up</Link></p>
    </form>
  )
};