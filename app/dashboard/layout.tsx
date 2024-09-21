'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from '@supabase/supabase-js';
import { getUser } from "../lib/action";

import SideNav from "../ui/dashboard/sidenav";
import Modal from "../ui/settings/settings-modal";
import Loading from "../ui/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (!user) {
          router.push("/sign-in");
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [router])

  if (!user) return <Loading />;

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav user={user} />
      </div>
      <Modal user={user} />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}