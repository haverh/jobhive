import Link from "next/link";
import { NavLinks, Settings } from "@/app/ui/dashboard/nav-links";
import ClipBoardLinks from "./clipboard-links";
import SignOutButton from "../auth-ui/sign-out-button";
import JobHiveLogo from "@/public/jobhive-logo.png";
import Image from 'next/image'
import ThemeToggle from "../ThemeToggle";

export default function SideNav({
  user
}: {
  user: any;
}) {

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-yellow-500 dark:bg-[#1F1F1F] p-4 md:h-40 md:flex-col"
        href="/"
      > 
        <div className="bg-black flex justify-center items-center mb-2 p-2 rounded-full">
          <Image
            src="/jobhive-logo.png"
            width={50}
            height={50}
            alt="JobHive Logo"
          />
        </div>
        <p className="text-gray-100 dark:text-yellow-500 font-bold text-lg">JobHive</p>
      </Link>

      <div className="nav-bar flex grow flex-col justify-between space-x-2 sm:flex-row md:flex-col md:space-x-0 md:space-y-2">
        <ClipBoardLinks links={user.user_metadata.links} />
        <hr className="h-full sm:w-[2px] shadow-sm justify-self-center text-gray-300 bg-gray-300 md:h-[1.5px] md:w-full" />
        <div className="flex grow justify-between md:flex-col">
          <NavLinks />
          <div className="nav-bar hidden h-auto w-full grow rounded-md md:block"></div>
          <div className="flex items-center p-2">
            <ThemeToggle />
          </div>
          <div>
            <Settings/>
          </div>
          <div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  )
}