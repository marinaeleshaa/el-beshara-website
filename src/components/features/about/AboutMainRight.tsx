import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

const AboutMainRight = async ({ className }: { className: string }) => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({ locale: lang, namespace: "about" });
  const visionData = t.raw("visionContent") as string[];
  const missionData = t.raw("missionContent") as string[];
  const valuesData = t.raw("valuesContent") as string[];
  return (
    <div className={`${className} flex flex-col md:flex-row gap-5 h-auto  `}>
      <div className=" shrink-0 sm:h-[600px] md:h-[535px]">
        <Image
          src="/home/about2.jpg"
          alt="about"
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col gap-5 justify-evenly">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-3"
        >
          <AccordionItem
            value="item-1"
            className="bg-secondary p-1 rounded-lg mb-5"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <div className="p-2 cursor-pointer">
              <AccordionTrigger className="text-foreground text-lg md:text-2xl capitalize cursor-pointer">
                {t("visionTitle")}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-foreground/80">
                {visionData.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-secondary p-1 rounded-lg mb-5"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <div className="p-2 cursor-pointer">
              <AccordionTrigger className="text-foreground text-lg md:text-2xl capitalize cursor-pointer">
                {t("missionTitle")}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-foreground/80">
                {missionData.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-secondary p-1 rounded-lg"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <div className="p-2 cursor-pointer">
              <AccordionTrigger className="text-foreground text-lg md:text-2xl capitalize cursor-pointer">
                {t("valuesTitle")}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-foreground/80">
                {valuesData.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AboutMainRight;
