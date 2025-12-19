"use client"; // mark this as client component

import { useDispatch, useSelector } from "react-redux";
import { langSelector, toggleLang } from "@/redux/slices/LangSlice";
import { Button } from "../ui/button";

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const dispatch = useDispatch();
  const { lang } = useSelector(langSelector);
 

  const toggleLanguage = () => {
    dispatch(toggleLang());
  };

  if (!lang) return null; // prevent SSR mismatch if lang is undefined

  return (
    <Button
      variant="outline"
      size="icon"
      className={`${
        scrolled
          ? "bg-background border-b text-foreground "
          : "bg-transparent text-foreground md:text-light"
      } cursor-pointer`}
      onClick={toggleLanguage}
    >
      {lang === "ar" ? "EN" : "AR"}
    </Button>
  );
}
