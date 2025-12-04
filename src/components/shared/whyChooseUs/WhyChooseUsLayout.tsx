import React from "react";
import WhyChooseUsLeft from "./WhyChooseUsLeft";
import WhyChooseUsRight from "./WhyChooseUseRight";
import WhyChooseUsBottom from "./WhyChooseUsBottom";

const WhyChooseUsLayout = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 group">
        {/* Left Image - Takes 1 column on desktop */}
        <WhyChooseUsLeft className="w-full h-64 md:h-96 " />
        
        {/* Right Content - Takes 2 columns on desktop */}
        <WhyChooseUsRight className="w-full md:col-span-2 " />
        
        {/* Bottom Image - Full width on all screens */}
        <WhyChooseUsBottom className="w-full h-64 md:h-96 col-span-1 md:col-span-3 " />
      </div>
    </div>
  );
};

export default WhyChooseUsLayout;
