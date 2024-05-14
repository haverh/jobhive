/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect, MouseEvent } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { SignUpFormData, User } from "../lib/definitions";
import { signUpUser } from "@/app/lib/action";
import clsx from "clsx";

export default function SignUpForm() {
  const [visible, setVisible] = useState<[boolean, boolean]>([false, false]);
  const [formData, setFormData] = useState<SignUpFormData>({name: '', email: '', password: '', confirmPassword: ''});
  const [missmatch, setMissmatch] = useState(false);
  const [errors, setErrors] = useState<SignUpFormData>({name: '', email: '', password: '', confirmPassword: ''});
  
  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Toggled Visiblity")
    setVisible(prev => [!prev[0], prev[1]]);
  }

  const toggleConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Toggled Visiblity")
    setVisible(prev => [prev[0], !prev[1]]);
  }

  const checkPasswords = () => {
    return formData?.password === formData.confirmPassword;
  }

  const validateForm = () => {
    let errors:SignUpFormData = {name: '', email: '', password: '', confirmPassword: ''};

    if (!formData.name) { 
      errors.name = 'Name is required.'; 
    } 

    if (!formData.email) { 
      errors.email = 'Email is required.'; 
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { 
      errors.email = 'Email is invalid.'; 
    } 

    if (!formData.password) { 
      errors.password = 'Password is required.'; 
    } else if (formData.password.length < 6) { 
      errors.password = 'Password must be at least 6 characters.'; 
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Password confirmation is required.'; 
    } else if (formData.confirmPassword.length < 6) { 
      errors.confirmPassword = 'Password confirmation must be at least 6 characters.'; 
    }

    setErrors(errors);
  }

  const submitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const user:User = {name: formData.name, email: formData.email, password: formData.password }
      console.log(user)
      signUpUser(user);
    }
    console.log(formData);
  }

  // useEffect(() => {
  //   validateForm();
  // }, [formData.name, formData.email, formData.password, formData.confirmPassword])

  return (
    <form className="bg-white h-fit max-w-[350px] p-7 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl text-center">Sign Up</h1>
      <div>
        <div>
          <label htmlFor="name"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Name</label>
          <div className="border border-solid border-gray-400 rounded-full focus:outline-black">
            <input type="text" id="name" name="name" placeholder="Enter your name"
              className="w-full px-3 py-1 rounded-full border-0 focus:ring-0"
              onChange={(e) => { setFormData({...formData, name: e.target.value})}}
              required/>
          </div>
          {errors.name && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Email</label>
          <div className="border border-solid border-gray-400 rounded-full focus:outline-black">
            <input type="email" id="email" name="email" placeholder="Enter your email"
              className="w-full px-3 py-1 rounded-full outline-yellow-500"
              onChange={(e) => { setFormData({...formData, email: e.target.value})}}
              required/>
          </div>
          {errors.email && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Password</label>
          <div className="border border-solid border-gray-400 rounded-full focus:outline-black flex pr-2">
            <input type={visible[0] ? "text" :"password"} id="password" name="password" placeholder="Enter your password"
              className="flex-grow w-auto pl-3 py-1 border-0 rounded-full"
              onChange={(e) => { setFormData({...formData, password: e.target.value})}}
              required/>
            <button type="button" onClick={(event) => togglePassword(event)}>
              {visible[0] ? <EyeSlashIcon className="w-5" /> : <EyeIcon className="w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.password}</p>}
        </div>
        
        <div>
          <label htmlFor="confirm-password"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Confirm Password</label>
          <div className="border border-solid border-gray-400 rounded-full focus:outline-black flex pr-2">
            <input type={visible[1] ? "text" :"password"} id="confirm-password" name="confirm-password" placeholder="Confirm your password"
              className="w-full pl-3 py-1 border-0 rounded-full focus:outline-none"
              onChange={(e) => { setFormData({...formData, confirmPassword: e.target.value})}}
              required/>
            <button  type="button" onClick={(event) => toggleConfirmPassword(event)}>
              {visible[1] ? <EyeSlashIcon className="w-5" /> : <EyeIcon className="w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.confirmPassword}</p>}
        </div>

      </div>
      <div className="mt-6 flex justify-center">
        <button type="submit" className="w-3/5 bg-yellow-500 py-2 px-3 rounded-full font-medium hover:bg-yellow-400"
          onClick={(e) => {submitForm(e)}}>Sign Up</button>
      </div>

      <hr className="my-4 h-[2px] text-gray-500 bg-gray-500"/>
      <p className="mt-3">Already have an account? <Link href="/sign-in" className="text-sky-500">Sign in</Link></p>
    </form>
  )
};