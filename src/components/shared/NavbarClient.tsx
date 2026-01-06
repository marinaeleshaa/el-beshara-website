"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "../ui/spinner";
import { MenuItem } from "@/lib/Interfaces/ServiceInterface";
import { langSelector } from "@/redux/slices/LangSlice";
import { useSelector } from "react-redux";
import { IProfile } from "@/lib/Interfaces/AboutInterface";

interface NavbarClientProps {
  profile: IProfile;
  menu: MenuItem[];
  studioName: string;
  className?: string;
}

const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), {
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 flex items-center justify-center">
      <Spinner />
    </div>
  ),
});

const NavbarClient = ({
  profile,
  menu,
  studioName,
  className,
}: NavbarClientProps) => {
  const pathname = usePathname();
  const { lang } = useSelector(langSelector);
  const isRTL = lang === "ar";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const displayMenu = isRTL ? [...menu].reverse() : menu;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`py-2 md:py-3 ${
        scrolled
          ? "bg-background border-b text-foreground"
          : "bg-transparent text-light"
      } ${className}`}
    >
      <div className="max-w-[80%] mx-auto">

        {/* ================= Desktop ================= */}
        <nav className="hidden md:flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {profile?.logo?.url && (
              <Image
                src={profile.logo.url}
                alt="logo"
                width={40}
                height={40}
                className="max-h-8"
              />
            )}
            <span className="text-lg font-semibold">{studioName}</span>
          </Link>

          <div className="flex gap-6">
            {displayMenu.map((item) => {
              const isActive =
                item.url === "/gallery/images"
                  ? pathname.includes("gallery")
                  : pathname === item.url;

              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`link-underline ${
                    isActive ? "link-active" : ""
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="flex gap-4">
            <ModeToggle />
            <LanguageSwitcher scrolled={scrolled} />
          </div>
        </nav>

        {/* ================= Mobile ================= */}
        <div className="flex md:hidden justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            {profile?.logo?.url && (
              <Image
                src={profile.logo.url}
                alt="logo"
                width={40}
                height={40}
              />
            )}
            <span className="font-semibold">{studioName}</span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side={isRTL ? "left" : "right"}>
              <SheetHeader>
                <SheetTitle>{studioName}</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className="font-semibold border-b pb-2"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <ModeToggle />
                <LanguageSwitcher scrolled={scrolled} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default NavbarClient;
