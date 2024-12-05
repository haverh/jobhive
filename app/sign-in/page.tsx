import SignIn from "../ui/auth-ui/sign-in-form"
import { redirect } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";
import { getUser } from "../lib/action";

export default async function SignInPage() {

  const { data, error } = await getUser()

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