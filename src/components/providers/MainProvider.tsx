import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" closeButton className=""/>
      {children}
    </ThemeProvider>
  );
};

export default MainProvider;
