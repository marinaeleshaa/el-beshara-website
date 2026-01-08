import React from "react";
import MyBtn from "../ui/MyBtn";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  title = "No items found",
  description,
  icon,
  action,
  className = "",
}: Readonly<EmptyStateProps>) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      {icon && <div className="mb-4 text-primary animate-pulse">{icon}</div>}

      <h3 className="text-2xl font-semibold  mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-foreground/60 text-center max-w-md mb-6">
          {description}
        </p>
      )}

      {action && (
        <MyBtn
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          {action.label}
        </MyBtn>
      )}
    </div>
  );
}
