import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/ui/globals.css';
import { ThemeProvider } from "./ui/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: '/icon.ico',
  },
  title: {
    template: "%s | JobHive Hub",
    default: "JobHive Hub",
  },
  description: "The perfect place to keep track of your job applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full">
      <body className={`${inter.className} antialiased min-h-full`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      <script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API}&callback=Function.prototype&libraries=places`}
      ></script>
      </body>
    </html>
  );
}
