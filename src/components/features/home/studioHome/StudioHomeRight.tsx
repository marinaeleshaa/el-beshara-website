import MyBtn from "@/components/ui/MyBtn";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

const GalleryHomeRight =async ({ className }: { className?: string }) => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({
    locale: lang,
    namespace: "home.homeStudio",
  })
  const points = t.raw("points");
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={`${className} p-4 group space-y-5`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        {t("sectionLabel")}
      </p>
      <h2 className="text-foreground max-w-[80%] capitalize md:text-5xl text-3xl font-extrabold mt-5">
        {t("title")}
      </h2>
      <ul className="list-disc list-inside text-foreground/90">
        {points.map((point: string, index: number) => (
          <li key={index} className="text-foreground/80  md:text-lg text-base">
            {point}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="w-full p-4 bg-secondary text-secondary-foreground rounded-md">
          <p className="text-base font-bold">{t("stats.hoursTitle")}</p>
          <p className="text-secondary-foreground/80">
            {t("stats.hoursFirstDescription")}
            <span className="font-bold text-primary">
              {t("stats.hoursNumber")}
            </span>
            {t("stats.hoursSecondDescription")}
          </p>
        </div>
        <div className="w-full p-4 bg-secondary text-secondary-foreground rounded-md">
          <p className="text-base font-bold">{t("stats.projectsTitle")}</p>
          <p className="text-secondary-foreground/80">
            {t("stats.projectsFirstDescription")}
            <span className="font-bold text-primary">
              {t("stats.projectsNumber")}
            </span>
            {t("stats.projectsSecondDescription")}
          </p>
        </div>
      </div>
      {/* <Link href="/gallery" className="inline-block bg-primary transition duration-300 cursor-pointer text-primary-foreground  hover:scale-105  rounded-md font-bold  capitalize p-2 px-4"></Link> */}
      <MyBtn href={t("href")} text={t("btnText")} />
    </div>
  );
};

export default GalleryHomeRight;
