// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  
  // Try to get locale from NEXT_LOCALE cookie (next-intl standard)
  let currentLocale = cookieStore.get("NEXT_LOCALE")?.value;
  
  // Fallback to locale cookie
  if (!currentLocale) {
    currentLocale = cookieStore.get("locale")?.value;
  }
  
  // Default to 'en'
  if (!currentLocale || !["en", "ar"].includes(currentLocale)) {
    currentLocale = "en";
  }

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default,
  };
});