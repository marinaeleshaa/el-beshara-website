"use client";

import { useRouter } from "next/navigation";
import React from "react";

type IBtnVariant = "primary" | "secondary" | "light" | "dark";

interface IBtn {
  text: string | React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: IBtnVariant;
  outline?: boolean;
  icon?: React.ReactNode;
  className?: string;
  width?: "fit" | "full" | "auto";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
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
}: IBtn) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    if (href) router.push(href);
  };

  return (
    <button
      className={` ${CheckVariant(variant, outline)} ${className} flex justify-center items-center ${
        icon ? "gap-2" : ""
      } font-semibold px-4 py-2 hover:scale-105 transition duration-300 cursor-pointer capitalize w-${width} rounded-lg ${disabled ? "opacity-50 cursor-not-allowed hover:scale-none" : ""}`}
      onClick={handleClick}
      type={type}
    >
      {text}
      {icon && (
        <span className="group-hover:translate-x-3 transition duration-500">
          {icon}
        </span>
      )}
    </button>
  );
};

export default MyBtn;
