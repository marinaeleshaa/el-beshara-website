import MyBtn from "@/components/ui/MyBtn";
import ServicesData from "@/data/ServicesData";
import Image from "next/image";
import React from "react";

const MixLayout = () => {
  const mixData = ServicesData()[2];
  return (
    <div className="flex group flex-col  items-center  md:flex-row lg:p-8 md:p-6 p-2 ">
      {/* left */}
      <div className="w-full md:w-1/2 flex flex-col space-y-4 p-4  dark:bg-secondary rounded-t-lg md:rounded-l-lg md:rounded-r-none ">
        <h2 className="text-3xl w-fit font-bold text-primary capitalize relative animated-underline  mb-4">
          {mixData.title}
        </h2>
        <p className="text-foreground">{mixData.subtitle}</p>
        <p>{mixData.description}</p>
        <div className="  flex  flex-col justify-evenly items-start gap-2 p-2 w-full rounded-lg">
          {mixData.points.map((point, index) => (
            <div
              key={index}
              className="flex   text-center items-center gap-2 text-secondary-foreground "
            >
              <p className="text-xl font-bold">{point.icon}</p>
              <p className="text-sm ">{point.label}</p>
            </div>
          ))}
        </div>
        <MyBtn text="book your session now" href="/contact" variant="primary" width="full" />
      </div>
      {/* right */}
      <div className="w-full md:w-1/2 min-h-[300px] md:h-[560px] lg:h-[490px] xl:h-[410px]">
        <Image
          src={mixData.image}
          alt={mixData.title}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg dark:rounded-b-lg dark:md:rounded-r-lg dark:md:rounded-l-none"
        />
      </div>
      
    </div>
  );
};

export default MixLayout;
