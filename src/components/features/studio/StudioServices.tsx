import { IService } from "@/lib/Interfaces/ServiceInterface";
import Animate from "@/components/ui/Animate";
import { getLocale, getTranslations } from "next-intl/server";
import ServiceCard from "../services/ServiceCard";

const StudioServices = async () => {
  const t = await getTranslations("studio");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const studioServices = t.raw("studioServices") as Record<string, IService>;
  const servicesArray = Object.values(studioServices);

  return (
    <section className="relative space-y-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Section Header with Creative Badge */}
      <Animate>
        <div className="text-center space-y-6 ">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-primary/10 to-primary/20 rounded-full border-2 border-primary/30">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl leading-relaxed md:text-6xl font-black bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            {t("title")}
          </h2>

          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>
      </Animate>
      {/* Services Cards Grid */}
      <div className="space-y-24">
        {servicesArray.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default StudioServices;
