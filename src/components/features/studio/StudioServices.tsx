import { IService } from "@/lib/Interfaces/ServiceInterface";
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
