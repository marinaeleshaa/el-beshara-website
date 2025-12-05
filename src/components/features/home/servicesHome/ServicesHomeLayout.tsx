import React from "react";
import ServiceCard from "./ServiceCard";
import ServicesData from "@/data/ServicesData";

const ServicesHomeLayout = () => {
  return (
    <div className="bg-secondary group/parent   min-h-[70vh]">
      <div className="w-myWidth  mx-auto flex flex-col gap-10 justify-center items-center px-4 pt-10">
        <div className="flex flex-col justify-center items-center gap-4 text-secondary-foreground">
          <h2 className="text-3xl md:text-4xl relative font-bold w-fit before:content-[''] before:absolute before:w-0 before:h-1 before:-bottom-2 before:bg-primary before:transition-all before:duration-500 before:ease-in-out group-hover/parent:before:w-full ">
            Our Services
          </h2>
          <p className="max-w-2xl text-center text-secondary-foreground/80 ">
            Discover how we help artists, worship teams, and creators bring
            their musical vision to life. From reserving a peaceful studio space
            to recording powerful vocals and producing a fully mixed and
            mastered track — we’re here to support every step of your creative
            journey.
          </p>
        </div>
      </div>
      <div className="w-myWidth   mx-auto flex flex-col gap-10  px-4 py-10">
        <div className=" grid grid-cols-1 gap-10 md:grid-cols-3">
          {ServicesData().map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesHomeLayout;
