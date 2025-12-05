import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { NavMenuItems } from "@/data/NavMenuItems";
import MainProvider from "@/components/providers/MainProvider";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El-Beshara Studio | Home",
  description: "Creating amazing musical experiences for the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <Navbar
            menu={NavMenuItems}
            className="fixed w-full h-fit inset-0 z-49 bg-background "
          />
          <div className=" my-15">{children}</div>
          <Footer />
        </MainProvider>
      </body>
    </html>
  );
}
