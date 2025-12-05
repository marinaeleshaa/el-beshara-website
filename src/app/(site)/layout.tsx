// app/(site)/layout.tsx

import MainProvider from "@/components/providers/MainProvider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { NavMenuItems } from "@/data/NavMenuItems";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainProvider>
      <Navbar
        menu={NavMenuItems}
        className="fixed w-full h-fit inset-0 z-49 bg-background "
      />
      <div className=" my-15">{children}</div>
      <Footer />
    </MainProvider>
  );
}
