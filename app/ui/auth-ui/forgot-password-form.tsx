import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';

export default function ForgotPasswordForm() {

  const forgotPassword = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password` }
    )

    if ( error ) {
      redirect('/forgot-password?message=Could not authenticate user')
    }

    redirect('/confirm?message=Password Reset link has been sent to your email address')
  }

  return (
    <form action={forgotPassword} className="bg-white h-fit w-fit p-7 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl text-center mb-8">Forgot Password</h1>
      <div>
        <div>
          <label htmlFor="email"
            className="mb-2 mt-3 block text-md text-gray-900">Email</label>
          <div className="border border-solid border-gray-400 rounded-full focus:outline-black">
            <input type="email" id="email" name="email" placeholder="Enter your email address"
              className="w-full px-3 py-1 rounded-full focus:outline-none"
              required></input>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button 
          className="w-full bg-yellow-500 py-2 px-3 rounded-full text-sm hover:bg-yellow-400">
          Send reset link
        </button>
      </div>
      
      <hr className="my-4 h-[2px] text-gray-500 bg-gray-500"/>
      <p>Already have an account? <Link href="/sign-in" className="text-sky-500">Sign in</Link></p>
    </form>
  )
};