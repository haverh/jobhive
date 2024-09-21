/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect, MouseEvent } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { RegistrationFormData, User } from "../../lib/definitions";
import { registerUser } from "@/app/lib/action";
import clsx from "clsx";

export default function RegistrationForm() {
  const [visible, setVisible] = useState<[boolean, boolean]>([false, false]);
  const [openLinks, setOpenLinks] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({name: '', email: '', password: '', confirmPassword: ''});
  const [missmatch, setMissmatch] = useState(false);
  const [errors, setErrors] = useState<RegistrationFormData>({name: '', email: '', password: '', confirmPassword: ''});
  const [validForm, setValidForm] = useState(false);


  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisible(prev => [!prev[0], prev[1]]);
  }

  const toggleConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisible(prev => [prev[0], !prev[1]]);
  }

  const checkPasswords = (inputPassword: string) => {
    setMissmatch(formData?.password !== inputPassword && formData?.confirmPassword !== inputPassword);
  }

  const validateForm = () => {
    let errors:RegistrationFormData = {name: '', email: '', password: '', confirmPassword: ''};
    let mark = 0;

    if (!formData.name) { 
      errors.name = 'Name is required.'; 
      mark += 1
    } 

    if (!formData.email) { 
      errors.email = 'Email is required.'; 
      mark += 1
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { 
      errors.email = 'Email is invalid.'; 
      mark += 1
    } 

    if (!formData.password) { 
      errors.password = 'Password is required.'; 
      mark += 1
    } else if (formData.password.length < 6) { 
      errors.password = 'Password must be at least 6 characters.'; 
      mark += 1
    }

    setValidForm(mark === 0)
    setErrors(errors);
  }

  const submitForm = async (event: MouseEvent<HTMLButtonElement>) => {
    // console.log(validForm)
    validateForm();
    event.preventDefault();
    if (validForm && formData.password === formData.confirmPassword) {
      const user:User = {name: formData.name, email: formData.email, password: formData.password }
      const msg = await registerUser(user);

      if (msg === "user_already_exists") {
        alert("An account with the email already exist")
      }
    }
  }

  return (
    <form className="account-form min-w-[300px] max-w-[350px] p-4 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl text-center">Register</h1>
      <div className="pb-4">
        <div>
          <label htmlFor="name"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Name</label>
          <div className="border border-solid border-gray-400 rounded-xl">
            <input type="text" id="name" name="name" placeholder="Enter your name"
              className="w-full px-3 py-1 rounded-xl border-0 focus:ring-0"
              onChange={(e) => { setFormData({...formData, name: e.target.value})}}
              required/>
          </div>
          {errors.name && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Email</label>
          <div className="border border-solid border-gray-400 rounded-xl">
            <input type="email" id="email" name="email" placeholder="Enter your email"
              className="w-full px-3 py-1 rounded-xl border-0 focus:ring-0"
              onChange={(e) => { setFormData({...formData, email: e.target.value})}}
              required/>
          </div>
          {errors.email && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password"
            className="mb-2 mt-3 block text-md font-medium text-gray-900">Password</label>
          <div className="account-form-eye-div border border-solid border-gray-400 rounded-xl flex pr-2">
            <input type={visible[0] ? "text" :"password"} id="password" name="password" placeholder="Enter your password"
              className="flex-grow w-auto pl-3 py-1 rounded-full border-0 focus:ring-0"
              onChange={(e) => { setFormData({...formData, password: e.target.value}); checkPasswords(e.target.value);}}
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
          <div className="account-form-eye-div border border-solid border-gray-400 rounded-xl focus:outline-black flex items-center pr-2">
            <input type={visible[1] ? "text" :"password"} id="confirm-password" name="confirm-password" placeholder="Confirm your password"
              className="w-full pl-3 py-1 rounded-xl border-0 focus:ring-0"
              onChange={(e) => { setFormData({...formData, confirmPassword: e.target.value}); checkPasswords(e.target.value);}}
              required/>
            <CheckIcon className={clsx("h-5 text-2xl", {
                'invisible': formData.confirmPassword === '',
                'text-gray-500': missmatch,
                'text-green-500': !missmatch
              }
              )}/>
            <button  type="button" onClick={(event) => toggleConfirmPassword(event)}>
              {visible[1] ? <EyeSlashIcon className="w-5" /> : <EyeIcon className="w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-[red]">
            <ExclamationCircleIcon className="text-[red] h-full w-6 inline" />{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button type="submit" className="w-full bg-yellow-400 py-2 px-3 rounded-xl font-medium hover:bg-yellow-300 active:bg-yellow-500"
          onClick={(e) => {submitForm(e)}}>Register</button>
      </div>

      <hr className="my-4 h-[2px] text-gray-500 bg-gray-500"/>
      <p className="mt-3">Already have an account? <Link href="/sign-in" className="text-yellow-500 hover:text-yellow-400">Sign in</Link></p>
    </form>
  )
};