"use client";
import React, { useEffect } from "react";
import MyBtn from "../ui/MyBtn";
import { RiErrorWarningLine } from "react-icons/ri";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "warning" | "danger" | "info";
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
}: ConfirmationModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    warning: "text-yellow-500",
    danger: "text-red-500",
    info: "text-blue-500",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        className="bg-background rounded-2xl w-[90%] max-w-md shadow-2xl border border-secondary animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon Header */}
        <div className="flex justify-center pt-6 pb-4">
          <div className={`relative ${variantStyles[variant]}`}>
            <div className="absolute inset-0 blur-xl opacity-50 animate-pulse" />
            <RiErrorWarningLine className="relative w-16 h-16" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-center text-foreground">
            {title}
          </h2>

          {/* Optional Message */}
          {message && (
            <p className="text-sm md:text-base text-center text-foreground/70">
              {message}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-secondary to-transparent my-4" />

          {/* Actions */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg border border-secondary bg-background text-foreground hover:bg-secondary hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-medium shadow-sm hover:shadow-md"
            >
              {cancelText}
            </button>

            <MyBtn 
              onClick={onConfirm}
              className="px-6 py-2.5 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {confirmText}
            </MyBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;