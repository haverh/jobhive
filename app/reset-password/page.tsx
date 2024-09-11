import { Suspense } from "react";
import Loading from "../ui/loading";
import ResetPasswordForm from "../ui/auth-ui/reset-password-form";
import ThemeToggle from "../ui/ThemeToggle";

export default async function ResetPasswordPage() {

  return (
    <main className="h-screen flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <ResetPasswordForm />
        <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
      </Suspense >
    </main>
    
  )
}