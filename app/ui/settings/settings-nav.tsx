import Link from "next/link";
import { SettingsNavLinks } from "@/app/ui/settings/nav-links";
import SignOutButton from "../auth-ui/sign-out-button";

export default function SettingsNav() {

  return (
    <div className="flex w-full rounded-t-xl flex-col px-3 pt-4 md:px-2">
      <div className="modal-nav bg-white rounded-t-xl flex grow justify-between space-x-2 md:space-x-0">
        <SettingsNavLinks />
        <div className="modal-nav hidden h-auto w-full grow rounded-xl md:block"></div>
      </div>
    </div>
  )
}