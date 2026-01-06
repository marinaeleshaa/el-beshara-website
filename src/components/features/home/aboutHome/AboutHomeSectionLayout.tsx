import LeftAboutHome from "./LeftAboutHome";
import RightAboutHome from "./RightAboutHome";
import Animate from "@/components/ui/Animate";

const AboutHomeSectionLayout = ({ isInHome }: { isInHome?: boolean }) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-x-10  justify-evenly items-center ">
      <Animate className="w-full md:w-1/2" myDelay>
        <LeftAboutHome className="w-full" />
      </Animate>
      <Animate className="w-full md:w-1/2">
        <RightAboutHome className="w-full " isInHome={isInHome} />
      </Animate>
    </div>
  );
};

export default AboutHomeSectionLayout;
