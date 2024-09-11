import SignIn from "../ui/auth-ui/sign-in-form"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default async function SignInPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (!error || data?.user) {
    redirect('/dashboard')
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <SignIn />
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </main>
  )
};