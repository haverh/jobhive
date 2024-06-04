'use client';
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SettingsNav from "./settings-nav";
import LinksForm from "./links-form";
import AccountForm from "./account/account-form";

export default function Modal({
  user,
}: {
  user: any;
}) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const tab = searchParams.get("tab");
  const pathname = usePathname(); 

  // console.log("FROM MODAL", user);

  return (
    <>
      {modal && <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <div className="flex flex-col h-4/5 w-3/5 min-w-[300px] rounded-xl bg-gray-100 m-auto p-8">
          <div className="w-full flex justify-end">
            <Link href={pathname}>
              <button className="w-7 h-7 bg-red-[100] hover:bg-red-[100]" ><XMarkIcon className="w-6 h-6 text-[red]" /></button>
            </Link>
          </div>
          <div>
            <SettingsNav />
          </div>
          <div className="flex-grow px-3 md:px-2">
            {(tab === 'links') && <LinksForm user={user} /> }
            {(tab === 'account') && <AccountForm user={user} /> }
          </div>
        </div>
        
      </dialog>}
    </>
  )
}