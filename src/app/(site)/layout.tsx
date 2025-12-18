// app/(site)/layout.tsx

import MainProvider from "@/components/providers/MainProvider";
import Footer from "@/components/shared/footer/Footer";
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
        className="fixed w-full h-fit inset-0 z-49  "
      />
      <div className=" mb-15">{children}</div>
      <Footer />
    </MainProvider>
  );
}
