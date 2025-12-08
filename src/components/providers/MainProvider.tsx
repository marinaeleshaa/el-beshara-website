import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import { NextIntlClientProvider, useLocale } from "next-intl";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale()
  return (
    <NextIntlClientProvider locale={locale}>
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
