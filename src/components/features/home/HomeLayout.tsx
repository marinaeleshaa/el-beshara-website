import HomeHeroLayout from "./hero/HomeHeroLayout";
import AboutHomeSectionLayout from "./aboutHome/AboutHomeSectionLayout";
import ServicesHomeLayout from "./servicesHome/ServicesHomeLayout";
import FixedHomeImgLayout from "./fixedHomeImg/FixedHomeImgLayout";
import GalleryHomeLayout from "./gallery/GalleryHomeLayout";
import WhyChooseUsLayout from "@/components/shared/whyChooseUs/WhyChooseUsLayout";

const HomeLayout = () => {
  return (
    <div>
      <HomeHeroLayout />
      <div className="space-y-20">
        <div className="w-myWidth mx-auto relative ">
          <AboutHomeSectionLayout />
        </div>
        <ServicesHomeLayout />
        <FixedHomeImgLayout />
        <div className="w-myWidth space-y-20 mx-auto relative ">
          <GalleryHomeLayout/>
          <WhyChooseUsLayout/>
        </div>
      </div>
     
    </div>
  );
};

export default HomeLayout;
