import ForgotPasswordForm from "../ui/auth-ui/forgot-password-form";
import ThemeToggle from "../ui/ThemeToggle";

export default function ForgotPasswordPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <ForgotPasswordForm />
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </main>
    
  )
}