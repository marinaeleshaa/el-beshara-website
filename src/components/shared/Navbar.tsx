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
import { useTranslations } from "next-intl";
import { MenuItem } from "@/lib/Interfaces/ServiceInterface";
import { langSelector } from "@/redux/slices/LangSlice";
import { useSelector } from "react-redux";

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcn Blocks",
  },
  className,
}: NavbarProps) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang } = useSelector(langSelector);
  const t = useTranslations("common");
  const menu = t.raw("menu") as MenuItem[];
  const isRTL = lang === "ar";

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), {
    ssr: false,
    loading: () => (
      <div className="w-8 h-8 bg-background text-foreground flex justify-center items-center rounded-lg">
        <Spinner />
      </div>
    ),
  });

  // Prevent hydration mismatch by not rendering direction-dependent classes until mounted
  if (!mounted) {
    return (
      <section
        className={`py-2 md:py-3  ${
          scrolled
            ? "bg-background border-b text-foreground "
            : "bg-transparent text-light"
        }  ${className}`}
      >
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
                {t("studioName")}
              </span>
            </Link>

            {/* Menu Items */}
            <div className="flex items-center gap-6 lg:gap-8">
              {menu?.map((item) => {
                const isActive =
                  item.url === "/gallery/images"
                    ? pathname.includes("gallery")
                    : pathname === item.url;

                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`text-md font-medium link-underline ${
                      isActive ? "link-active" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Mode Toggle  & Language Switcher*/}
            <div className="hidden md:flex items-center gap-4">
              <ModeToggle />
              <LanguageSwitcher />
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
              {/* Mobile Menu Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`ml-2 cursor-pointer border-background ${
                      scrolled
                        ? "bg-background border-b text-foreground "
                        : "bg-transparent text-light"
                    }`}
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
                        className={`text-lg cursor-pointer font-semibold hover:text-foreground/80 transition-colors py-2 border-b last:border-0 ${
                          pathname === item.url
                            ? "text-primary hover:text-primary/80"
                            : ""
                        }`}
                        onClick={() => document.body.click()}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  {/* Optional: Mobile Theme Toggle Inside Sheet */}
                  <div className="pt-6 border-t flex p-5 gap-4">
                    <div className="flex justify-center">
                      <ModeToggle />
                    </div>
                    <div className="flex justify-center">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Reverse menu array for RTL
  const displayMenu = isRTL ? [...menu].reverse() : menu;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`py-2 md:py-3  ${
        scrolled
          ? "bg-background border-b text-foreground "
          : "bg-transparent text-light"
      }  ${className}`}
    >
      <div className="max-w-[80%] mx-auto">
        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.url} className={`flex items-center gap-2 `}>
            <Image
              width={40}
              height={40}
              src={logo.src}
              className="max-h-8 dark:invert"
              alt={logo.alt}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {t("studioName")}
            </span>
          </Link>

          {/* Menu Items */}
          <div className={`flex items-center gap-6 lg:gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {displayMenu?.map((item) => {
              const isActive =
                item.url === "/gallery/images"
                  ? pathname.includes("gallery")
                  : pathname === item.url;

              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`text-md font-medium link-underline ${
                    isActive ? "link-active" : ""
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Desktop Mode Toggle  & Language Switcher*/}
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <ModeToggle />
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between px-4">
          {/* Mobile Logo */}
          <Link href={logo.url} className={`flex items-center gap-2 `}>
            <Image
              width={40}
              height={40}
              src={logo.src}
              className="max-h-8 dark:invert"
              alt={logo.alt}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {t("studioName")}
            </span>
          </Link>

          {/* Mobile Right Side (Menu + Mode Toggle) */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${isRTL ? "mr-2" : "ml-2"} cursor-pointer border-background ${
                    scrolled
                      ? "bg-background border-b text-foreground "
                      : "bg-transparent text-light"
                  }`}
                >
                  <Menu className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side={isRTL ? "left" : "right"}
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle className={isRTL ? "text-right" : "text-left"}>
                    <Link href={logo.url} className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Image
                        width={40}
                        height={40}
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                      <span>{t("studioName")}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Items */}
                <div className="flex flex-col gap-4 mt-8 px-4">
                  {menu?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={`text-lg cursor-pointer font-semibold hover:text-foreground/80 transition-colors py-2 border-b last:border-0 ${
                        pathname === item.url
                          ? "text-primary hover:text-primary/80"
                          : ""
                      } ${isRTL ? "text-right" : "text-left"}`}
                      onClick={() => document.body.click()}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Optional: Mobile Theme Toggle Inside Sheet */}
                <div className={`pt-6 border-t flex p-5 gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="flex justify-center">
                    <ModeToggle />
                  </div>
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;