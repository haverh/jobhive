import SideNav from "../ui/dashboard/sidenav";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Modal from "../ui/settings/settings-modal";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data);
  if (error || !data?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav user={data.user} />
      </div>
      <Modal user={data.user} />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}