import Confirm from "@/app/ui/confirm";
import { Suspense } from "react";
import Loading from "../ui/loading";

export default function ConfirmationPage() {

  return (
    <main className='h-[30vh] flex justify-center items-center'>
      <Suspense fallback={<Loading />}>
        <Confirm />
      </Suspense>
    </main>
  )
}