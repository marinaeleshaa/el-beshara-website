import React from "react";
import ServiceCard from "./ServiceCard";

const ServicesHomeLayout = () => {
  return (
    <div className="bg-secondary group/parent   min-h-[70vh]">
      <div className="w-myWidth  mx-auto flex flex-col gap-10 justify-center items-center px-4 py-10">
        <div className="flex flex-col justify-center items-center gap-4 text-secondary-foreground">
          <h2 className="text-3xl md:text-4xl relative font-bold w-fit before:content-[''] before:absolute before:w-0 before:h-1 before:-bottom-2 before:bg-primary before:transition-all before:duration-500 before:ease-in-out group-hover/parent:before:w-full ">
            Our Services
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem, fuga.
          </p>
        </div>
      </div>
      <div className="w-myWidth   mx-auto flex flex-col gap-10  px-4 py-10">
        <div className=" grid grid-cols-1 gap-10 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ServiceCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesHomeLayout;
