import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "./ui/button";
import { JetBrains_Mono } from "next/font/google";
import SignInButton from "./ui/auth-ui/sign-in-button";
import RegisterButton from "./ui/auth-ui/register-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})


export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  
  if (!error || data?.user) {
    redirect('/dashboard')
  }


  return (
    <main className="flex flex-col min-h-screen px-28 py-16">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-3xl">JobHive</p>
        </div>
        <div className="flex gap-2">
          <SignInButton />
          <RegisterButton />
        </div>
      </div>

      {/* <div className={styles.center}> */}
      <div className="flex flex-grow w-full h-full gap-20 py-32">
        <div className="w-1/2">
          <div className={`${jetbrains.className} text-6xl font-bold`}>
            <p className="w-fit mb-4">Simplify,</p>
            <p className="w-fit mb-4">Organize,</p>
            <p className="w-fit mb-8">Track<span className="text-yellow-300">with</span></p>
            <p className="w-fit mb-8">JobHive</p>
          </div>
          <hr className="h-[4px] w-full bg-black mb-4" />
          <div>
            <p>
              The only job application management tool you need. Say goodbye to the chaos of tracking your job applications.
              Streamline your job search process and stay organized every step of the way.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-1/2">
          <Image src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1717564958~exp=1717568558~hmac=8263fed64594674386f8185f1b1a517dbac0837e9f9b70fb8633db9d587ba7dd&w=826"
            width={500} height={500} alt="Placeholder image of animated bunny" />
        </div>
        
      </div>
    </main>
  );
}
