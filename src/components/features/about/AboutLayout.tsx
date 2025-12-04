import React from "react";
import AboutHomeSectionLayout from "../home/aboutHome/AboutHomeSectionLayout";
import AboutMainSection from "./AboutMainSection";

const AboutLayout = () => {
  return (
    <div className="w-myWidth mx-auto space-y-40 mb-40 ">
      <AboutMainSection />
      <AboutHomeSectionLayout isInHome={false} />
    </div>
  );
};

export default AboutLayout;
