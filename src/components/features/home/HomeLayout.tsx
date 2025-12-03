import HomeHeroLayout from "./hero/HomeHeroLayout";
import AboutHomeSectionLayout from "./aboutHome/AboutHomeSectionLayout";
import ServicesHomeLayout from "./servicesHome/ServicesHomeLayout";

const HomeLayout = () => {
  return (
    <div>
      <HomeHeroLayout />
      <div className="space-y-20">

      <div className="w-myWidth mx-auto relative ">
        <AboutHomeSectionLayout />
      </div>
      <ServicesHomeLayout />
      </div>
    </div>
  );
};

export default HomeLayout;
