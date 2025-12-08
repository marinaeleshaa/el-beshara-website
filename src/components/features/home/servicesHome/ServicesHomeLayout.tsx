import React from "react";
import ServiceCard from "./ServiceCard";
import { useTranslations } from "next-intl";
import { IService } from "@/lib/Interfaces/ServiceInterface";

const ServicesHomeLayout = () => {
  const t = useTranslations("ourServices");
  const ServicesData = t.raw("servicesData") as IService[];
  const servicesArray = Object.values(ServicesData) 
  return (
    <div className="bg-secondary group/parent   min-h-[70vh]">
      <div className="w-myWidth  mx-auto flex flex-col gap-10 justify-center items-center px-4 pt-10">
        <div className="flex flex-col justify-center items-center gap-4 text-secondary-foreground">
          <h2 className="text-3xl md:text-4xl relative font-bold w-fit before:content-[''] before:absolute before:w-0 before:h-1 before:-bottom-2 before:bg-primary before:transition-all before:duration-500 before:ease-in-out group-hover/parent:before:w-full ">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-center text-secondary-foreground/80 ">
            {t("description")}
          </p>
        </div>
      </div>
      <div className="w-myWidth   mx-auto flex flex-col gap-10  px-4 py-10">
        <div className=" grid grid-cols-1 gap-10 md:grid-cols-3">
          {servicesArray.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesHomeLayout;
