import React from "react";
import ReserveLayout from "./reserveSection/ReserveLayout";
import RecordLayout from "./recordSection/RecordLayout";
import MixLayout from "./mixSection/MixLayout";

const ServicesLayout = () => {
  return (
    <div className="w-[80%] mx-auto space-y-20 my-20">
      <div id="reserve" className="">
        <ReserveLayout />
      </div>
      <div id="mix" className="">
        <MixLayout />
      </div>
      <div id="record" className="">
        <RecordLayout />
      </div>
    </div>
  );
};

export default ServicesLayout;
