import ResetPasswordForm from "../ui/reset-password-form";
import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/server";

export default async function ResetPasswordPage() {

  return (
    <div className="h-screen flex justify-center items-center">
      <ResetPasswordForm />
    </div>
    
  )
}