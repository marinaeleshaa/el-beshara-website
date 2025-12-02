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

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  className?: string;
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcn Blocks",
  },
  menu,
  className,
}: NavbarProps) => {
  const pathname = usePathname();

  return (
    <section className={`py-2 md:py-3 border-b ${className}`}>
      <div className="max-w-[80%] mx-auto">
        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src={logo.src}
              className="max-h-8 dark:invert"
              alt={logo.alt}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>

          {/* Menu Items */}
          <div className="flex items-center gap-6 lg:gap-8">
            {menu?.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`text-sm font-medium link-underline
    ${pathname === item.url ? "link-active" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Desktop Mode Toggle */}
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between px-4">
          {/* Mobile Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src={logo.src}
              className="max-h-8 dark:invert"
              alt={logo.alt}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>

          {/* Mobile Right Side (Menu + Mode Toggle) */}
          <div className="flex items-center gap-2">
            {/* Mobile Mode Toggle */}
            <ModeToggle />

            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2 cursor-pointer"
                >
                  <Menu className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image
                        width={40}
                        height={40}
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                      <span>{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Items */}
                <div className="flex flex-col gap-4 mt-8 px-4">
                  {menu?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={`text-lg cursor-pointer font-semibold hover:text-foreground/80 transition-colors py-2 border-b last:border-0 ${pathname === item.url ? "text-primary hover:text-primary/80" : ""} `}
                      onClick={() => document.body.click()} // Close sheet on click
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Optional: Mobile Theme Toggle Inside Sheet */}
                {/* <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-center">
                    <ModeToggle />
                  </div>
                </div> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
