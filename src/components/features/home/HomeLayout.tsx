import HomeHeroLayout from "./hero/HomeHeroLayout";
import AboutHomeSectionLayout from "./aboutHome/AboutHomeSectionLayout";

const HomeLayout = () => {
  return (
    <div>
      <HomeHeroLayout />
      <div className="max-w-[80%] mx-auto relative -top-20">
        <AboutHomeSectionLayout />
      </div>
    </div>
  );
};

export default HomeLayout;
