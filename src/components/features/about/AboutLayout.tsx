import React from "react";
import AboutHomeSectionLayout from "../home/aboutHome/AboutHomeSectionLayout";
import AboutMainSection from "./AboutMainSection";
import WhyChooseUsLayout from "@/components/shared/whyChooseUs/WhyChooseUsLayout";

const AboutLayout = () => {
  return (
    <div className="w-myWidth mx-auto space-y-20 my-30 ">
      <AboutMainSection />
      <WhyChooseUsLayout/>
      <AboutHomeSectionLayout isInHome={false} />
    </div>
  );
};

export default AboutLayout;
