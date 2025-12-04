import React from "react";
import LeftAboutHome from "./LeftAboutHome";
import RightAboutHome from "./RightAboutHome";

const AboutHomeSectionLayout = () => {
  return <div className="flex flex-col md:flex-row md:gap-x-10  justify-evenly items-center ">
    <LeftAboutHome className="w-full md:w-1/2" />
    <RightAboutHome className="w-full md:w-1/2" />
  </div>;
};

export default AboutHomeSectionLayout;
