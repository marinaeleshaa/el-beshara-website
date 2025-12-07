import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import { NextIntlClientProvider } from "next-intl";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider>
      <StoreProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </ThemeProvider>
      </StoreProvider>
    </NextIntlClientProvider>
  );
};

export default MainProvider;
