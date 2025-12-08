import MyBtn from "@/components/ui/MyBtn";
import { useTranslations } from "next-intl";

const WhyChooseUsRight = ({ className }: { className?: string }) => {
  const t = useTranslations("whyChooseUs");
  return (
    <div
      className={`${className} flex flex-col justify-center p-6 md:p-8 bg-secondary rounded-lg`}
    >
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline mb-4">
        {t("title")}
      </p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
        {t("heading")}
      </h2>
      <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
        {t("description")}
      </p>
      <MyBtn
        text={t("btnText")}
        href={t("href")}
        variant="primary"
        className="mt-4 w-fit"
      />
    </div>
  );
};

export default WhyChooseUsRight;
