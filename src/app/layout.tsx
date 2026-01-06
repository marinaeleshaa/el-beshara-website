import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

import MainProvider from "@/components/providers/MainProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "El-Beshara Charity | Home",
  description:
    "Serving our community with faith, hope, and love through charitable programs and support services.",
};





export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const locale =
    cookieStore.get("NEXT_LOCALE")?.value ||
    cookieStore.get("locale")?.value ||
    "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoKufiArabic.variable} antialiased`}
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
