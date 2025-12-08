import MyBtn from "@/components/ui/MyBtn";
import { useTranslations } from "next-intl";

const RightAboutHome = ({
  className,
  isInHome = true,
}: {
  className?: string;
  isInHome?: boolean;
}) => {
  const t = useTranslations("home.homeAbout");
  const points = t.raw("points");
  return (
    <div className={`${className} p-4 group space-y-5`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        {t("title")}
      </p>
      <h2 className="text-foreground max-w-[70%] capitalize md:text-5xl text-3xl font-extrabold mt-5">
        {t("subtitle")}
      </h2>
      <p className="text-foreground/90  md:text-lg text-base">
        {t("description")}
      </p>
      <ul className="list-disc list-inside">
        {points.map((point: string, index: number) => (
          <li key={index} className="text-foreground/80  md:text-lg text-base">
            {point}
          </li>
        ))}
      </ul>
      {isInHome && <MyBtn text={t("btnText")} href={t("href")} className="mt-4 " />}
    </div>
  );
};

export default RightAboutHome;
