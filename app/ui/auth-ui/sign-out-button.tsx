import { MouseEvent } from "react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { signOutUser } from "../../lib/action";

export default function SignOutButton() {
  const signOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOutUser();
  };

  return (
    <button className="nav-link hoverable flex h-full w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:h-[48px] md:flex-none md:justify-start md:p-2 md:px-3"
      onClick={(e) => {signOut(e)}}>
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  )
}