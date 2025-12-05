import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "react-hot-toast";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </ThemeProvider>
  );
};

export default MainProvider;
