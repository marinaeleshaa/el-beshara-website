import WhyChooseUsLeft from "./WhyChooseUsLeft";
import WhyChooseUsRight from "./WhyChooseUseRight";
import WhyChooseUsBottom from "./WhyChooseUsBottom";
import Animate from "@/components/ui/Animate";

const WhyChooseUsLayout = () => {
  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 group">
        {/* Left Image - Takes 1 column on desktop */}
        <Animate className="w-full h-64 md:h-96 md:col-span-1 ">
          <WhyChooseUsLeft className="w-full h-64 md:h-96 " />
        </Animate>
        {/* Right Content - Takes 2 columns on desktop */}
        <Animate className="w-full md:col-span-2 " myDelay>
          <WhyChooseUsRight className="w-full md:col-span-2 h-full " />
        </Animate>
        {/* Bottom Image - Full width on all screens */}
        <Animate className="w-full h-64 md:h-96 col-span-1 md:col-span-3 ">
          <WhyChooseUsBottom className="w-full h-64 md:h-96 col-span-1 md:col-span-3 " />
        </Animate>
      </div>
    </div>
  );
};

export default WhyChooseUsLayout;
