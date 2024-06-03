import ResetPasswordForm from "../ui/auth-ui/reset-password-form";
import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/server";

export default async function ResetPasswordPage() {

  return (
    <main className="h-screen flex items-center justify-center">
      <ResetPasswordForm />
    </main>
    
  )
}