"use client";
import React, { useState } from "react";

interface AnimatedLineProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedLine = ({ children, className }: AnimatedLineProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-10">{children}</span>
      {/* Simulated ::before */}
      <span
        className={`
          absolute left-0 -bottom-2 h-[2px] bg-primary 
          transition-all duration-500 ease-in-out
        `}
        style={{ width: hover ? "100%" : "0%" }}
      />
    </div>
  );
};

export default AnimatedLine;
