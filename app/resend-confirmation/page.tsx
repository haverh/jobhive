import ResendConfirmationForm from "../ui/auth-ui/resend-confirmation-form"
import ThemeToggle from "../ui/ThemeToggle"

export default function ResendConfirmationPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <ResendConfirmationForm />
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </main>
  )
} 