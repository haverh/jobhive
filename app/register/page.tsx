import RegistrationForm from "../ui/auth-ui/registration-form"
import ThemeToggle from "../ui/ThemeToggle"

export default function SignUpPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <RegistrationForm />
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </main>
  )
}