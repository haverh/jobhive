'use client';
import ThemeToggle from "../ui/ThemeToggle";


export default function ErrorPage() {

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-lg text-center">Oops. Something went wrong.</h1>
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </div>
  )
}