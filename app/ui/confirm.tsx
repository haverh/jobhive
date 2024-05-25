'use client';
import { useSearchParams } from "next/navigation";

export default function Confirm() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const message = params.get('message');

    return (
    <p className='w-fit text-center'>
      {message}
    </p>
  )
}