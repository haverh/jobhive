import Link from "next/link"
import { Button } from "../button"

export default function RegisterButton() {
  return (
    <Link href='/register'>
      <Button className="px-4 py-2 bg-yellow-400 font-bold dark:text-[#333333] text-lg rounded-xl hover:bg-yellow-300 active:bg-yellow-500">Register</Button>
    </Link>
    
  )
}