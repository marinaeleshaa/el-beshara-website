import React from "react";
import StudioServices from "./StudioServices";
import StudioStats from "./StudioStats";
import Animate from "@/components/ui/Animate";

const StudioLayout = () => {
  return (
    <div className="w-myWidth mx-auto space-y-20 pb-20">
      {/* Studio Services */}
      <StudioServices />
      {/* Studio Statistics */}
      <Animate>
        <StudioStats />
      </Animate>
    </div>
  );
};

export default StudioLayout;
