import Animate from "@/components/ui/Animate";
import ImpactHomeRight from "./ImpactHomeRight";
import ImpactHomeLeft from "./ImpactHomeLeft";

const ImpactHomeLayout = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-x-20 lg:gap-x-30 gap-5 justify-center items-center ">
      <Animate className="w-full md:w-1/2">
        <ImpactHomeRight className="w-full " />
      </Animate>
      <Animate className="w-myWidth  mx-auto md:w-1/2!" myDelay>
        <ImpactHomeLeft className="w-full " />
      </Animate>
    </div>
  );
};

export default ImpactHomeLayout;
