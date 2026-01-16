"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

type IBtnVariant = "primary" | "secondary" | "light" | "dark";

interface IBtn {
  text?: string | React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: IBtnVariant;
  outline?: boolean;
  icon?: React.ReactNode;
  className?: string;
  width?: "fit" | "full" | "auto";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
}

const CheckVariant = (variant?: IBtnVariant, outline?: boolean) => {
  if (outline) {
    switch (variant) {
      case "primary":
        return "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground";
      case "secondary":
        return "border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground";
      case "light":
        return "border-2 border-light text-light hover:bg-light hover:text-light-foreground";
      case "dark":
        return "border-2 border-dark text-dark hover:bg-dark hover:text-dark-foreground";
      default:
        return "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground";
    }
  } else {
    switch (variant) {
      case "primary":
        return "bg-primary text-primary-foreground hover:bg-primary/80";
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "light":
        return "bg-light text-light-foreground hover:bg-light/80";
      case "dark":
        return "bg-dark text-dark-foreground hover:bg-dark/80";
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/80";
    }
  }
};

const MyBtn = ({
  text,
  onClick,
  href,
  variant = "primary",
  icon,
  className,
  width = "fit",
  outline = false,
  type = "button",
  disabled = false,
  children,
}: IBtn) => {
  const router = useRouter();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const handleClick = () => {
    if (onClick) onClick();
    if (href) router.push(href);
  };

  const widthClass =
    width === "fit" ? "w-fit" : width === "full" ? "w-full" : "w-auto";

  return (
    <button
      className={`${CheckVariant(
        variant,
        outline
      )} ${className} flex justify-center items-center font-semibold px-4 py-2 hover:scale-102 transition duration-300 cursor-pointer capitalize ${widthClass} rounded-lg ${
        disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
      }`}
      onClick={handleClick}
      type={type}
      dir={dir}
      disabled={disabled}
    >
      {icon && (
        <span
          className={`transition duration-500 ${
            dir === "rtl" ? "ms-2" : "me-2"
          }`}
        >
          {icon}
        </span>
      )}
      <span>{text}</span>
      {children}
    </button>
  );
};

export default MyBtn;
