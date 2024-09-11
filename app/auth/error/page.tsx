'use client';
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import { usePathname, useSearchParams, redirect } from "next/navigation"
import ThemeToggle from "@/app/ui/ThemeToggle";


export default function ErrorPage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const error = searchParams.get("error");
  console.log(error)

  let error_msg = null;

  if (!error) {
    // error_msg = "Oops. Something went wrong."
    error_msg = (<h1 className="text-lg text-center">Oops. Something went wrong.</h1>)
  } else if (error === "email_not_confirmed") {
    // error_msg = "We were unable to verify your email address. Please verify your email and try again."
    error_msg = (
      <div className="text-lg text-center">
        <p>
          We were unable to verify your email address. Please verify your email and try again. 
        </p>
        <p>
          <Link href='/resend-confirmation' className="text-yellow-500">
            Click here&nbsp;
          </Link>
          to resend an email confirmation.
        </p>
        
      </div>
      
    )
  }
  
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <XCircleIcon className=" size-[150px] text-red-600" />
      {/* <h1 className="text-lg text-center">{error_msg}</h1> */}
      {error_msg}
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </div>
  )
}