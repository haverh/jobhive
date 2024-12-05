import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import SignInButton from "./ui/auth-ui/sign-in-button";
import RegisterButton from "./ui/auth-ui/register-button";
import { getUser } from "./lib/action";
import { redirect } from "next/navigation";
import ThemeToggle from "./ui/ThemeToggle";
import LandingPageImg from '../public/landing-page.jpg';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})


export default async function Home() {

  const { data, error } = await getUser()
  
  if (!error || data?.user) {
    redirect('/dashboard')
  }


  return (
    <main className="flex flex-col min-h-screen px-28 py-16">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-3xl">JobHive Hub</p>
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
            <p className="w-fit mb-8">JobHive Hub</p>
          </div>
          <hr className="h-[4px] w-full bg-black mb-4" />
          <div>
            <p>
              The only job application management tool you need. Say goodbye to the chaos of tracking your job applications.
              Streamline your job search process and stay organized every step of the way.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-1/2 relative border border-gray-700">
          <Image src={LandingPageImg} alt="Placeholder image of animated bunny" fill className="object-cover" />
        </div>
        
      </div>
      <ThemeToggle className="absolute bottom-4 left-4 inline-flex"/>
    </main>
  );
}
