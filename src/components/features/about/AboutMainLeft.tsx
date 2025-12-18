import MyBtn from "@/components/ui/MyBtn";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

const AboutMainLeft = async ({ className }: { className: string }) => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({ locale: lang, namespace: "about" });
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={`${className} p-4 group space-y-5`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        {t("sectionLabel")}
      </p>
      <h2 className="text-foreground  capitalize md:text-5xl text-3xl font-extrabold mt-5">
        {t("title")}
      </h2>
      <p className="text-foreground/90  md:text-lg text-base">
        {t("description")}
      </p>
      <MyBtn
        text={t("btnText")}
        href={t("href")}
        variant="primary"
        className="mt-4 w-full"
      />
    </div>
  );
};

export default AboutMainLeft;
