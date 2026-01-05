
import { IService } from "@/lib/Interfaces/ServiceInterface";
import ServiceCard from "./ServiceCard";
import { getLocale, getTranslations } from "next-intl/server";

const ServicesLayout = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const services = t.raw("ourServices.servicesData") as Record<
    string,
    IService
  >;
  const servicesArray = Object.values(services);

  return (
    <div className="w-[85%] mx-auto relative " dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative  mx-auto space-y-30 py-20">
        {/* Services Grid with Innovative Cards */}
        <div className="space-y-20">
          {servicesArray.map((service, index) => (
            <div key={service.id}>
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesLayout;
