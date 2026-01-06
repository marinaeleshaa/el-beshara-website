import AboutHomeSectionLayout from "./aboutHome/AboutHomeSectionLayout";
import ServicesHomeLayout from "./servicesHome/ServicesHomeLayout";
import FixedHomeImgLayout from "./fixedHomeImg/FixedHomeImgLayout";
import ImpactHomeLayout from "./impactHome/ImpactHomeLayout";
import WhyChooseUsLayout from "@/components/shared/whyChooseUs/WhyChooseUsLayout";
import HomeHero from "./hero/HomeHero";

const HomeLayout = () => {
  return (
    <div>
      <HomeHero />
      <div className="space-y-20">
        <div className="w-myWidth mx-auto relative ">
          <AboutHomeSectionLayout />
        </div>
        <ServicesHomeLayout />
        <FixedHomeImgLayout />
        <div className="w-myWidth space-y-20 mx-auto relative ">
          <ImpactHomeLayout />
          <WhyChooseUsLayout />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
