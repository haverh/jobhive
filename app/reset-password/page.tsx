import ResetPasswordForm from "../ui/auth-ui/reset-password-form";
import { Suspense } from "react";
import Loading from "../ui/loading";

export default async function ResetPasswordPage() {

  return (
    <main className="h-screen flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <ResetPasswordForm />
      </Suspense >
    </main>
    
  )
}