import React from "react";
import StudioServices from "./StudioServices";
import StudioStats from "./StudioStats";

const StudioLayout = () => {
  return (
    <div className="w-myWidth mx-auto space-y-20 pb-20">
      {/* Studio Hero Section */}

      {/* Studio Services */}
      <StudioServices />
      {/* Studio Statistics */}
      <StudioStats />
    </div>
  );
};

export default StudioLayout;
