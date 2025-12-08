"use client";

import { langSelector } from "@/redux/slices/LangSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

interface PageHeroProps {
  imgPath?: string;
}

const PageHero = ({ imgPath = "/home/fixed.jpg" }: PageHeroProps) => {
  const [mounted, setMounted] = useState(false);
  const { lang } = useSelector(langSelector);
  const pathname = usePathname();
  const t = useTranslations("common.pageHero");

  useEffect(() => {
    setMounted(true);
  }, []);

  // split route → remove empty values
  const segments = pathname.split("/").filter(Boolean);

  // Current page title = last segment, fallback to "home"
  const title = segments.length > 0 ? segments.at(-1) : "home";

  // Function to get translated text for a segment
  const getTranslatedText = (text: string) => {
    const key = text.toLowerCase();
    try {
      return t(key);
    } catch (error) {
      return text
        .replaceAll("-", " ")
        .replaceAll(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  // Build breadcrumb items
  const breadcrumbItems = [];

  // Always start with home
  breadcrumbItems.push({
    label: t("home"),
    href: "/",
    isLast: segments.length === 0,
  });

  // Add path segments
  segments.forEach((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const finalHref = segment === "gallery" ? "/gallery/images" : href;

    breadcrumbItems.push({
      label: getTranslatedText(segment),
      href: finalHref,
      isLast,
    });
  });

  const isRTL = mounted && lang === "ar";

  // Use the same structure always, but with conditional classes
  return (
    <div className="w-full h-[50vh] relative flex justify-center items-center">
      {/* Background Image */}
      <Image
        src={imgPath}
        alt={title!}
        width={1600}
        height={900}
        className="object-cover absolute inset-0 w-full h-full"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-[4px] z-10"></div>

      {/* Main content */}
      <div 
        className="relative z-20 text-primary-foreground flex flex-col items-center gap-4 px-6"
        dir={isRTL ? "rtl" : "ltr"} // Add text direction here
      >
        {/* Title */}
        <h1 className="sm:text-7xl text-5xl font-extrabold capitalize">
          {getTranslatedText(title!)}
        </h1>

        {/* Breadcrumbs - Keep order same, just change text direction */}
        <div className="flex items-center gap-2 text-light/80 sm:text-lg text-base">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Don't show separator before first item */}
              {index > 0 && <span>/</span>}
              
              {item.isLast ? (
                <span className="text-light capitalize">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-light capitalize">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHero;