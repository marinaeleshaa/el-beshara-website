import React from "react";
import AboutMainLeft from "./AboutMainLeft";
import AboutMainRight from "./AboutMainRight";
import Animate from "@/components/ui/Animate";

const AboutMainSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-10   justify-evenly items-center ">
      <Animate className="w-full lg:w-1/3" amount={0}>
        <AboutMainLeft className="w-full  " />
      </Animate>
      <Animate className="w-full lg:w-2/3" myDelay amount={0}>
        <AboutMainRight className="w-full " />
      </Animate>
    </div>
  );
};

export default AboutMainSection;
