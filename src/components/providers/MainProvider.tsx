import React from "react";
import { ThemeProvider } from "./ThemeProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default MainProvider;
