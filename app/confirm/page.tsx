import Confirm from "@/app/ui/confirm";
import { Suspense } from "react";
import Loading from "../ui/loading";
import ThemeToggle from "../ui/ThemeToggle";

export default function ConfirmationPage() {

  return (
    <main className='h-[30vh] flex justify-center items-center'>
      <Suspense fallback={<Loading />}>
        <Confirm />
        <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
      </Suspense>
    </main>
  )
}