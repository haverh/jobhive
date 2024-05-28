import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/ui/globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | JobHive",
    default: "JobHive",
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
      <body className={`${inter.className} antialiased min-h-full`}>{children}</body>
    </html>
  );
}
