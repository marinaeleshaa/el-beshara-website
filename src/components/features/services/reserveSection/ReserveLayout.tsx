import React from "react";
import ReserveLeft from "./ReserveLeft";
import ReserveRight from "./ReserveRight";

const ReserveLayout = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 p-5">
      <ReserveLeft className="w-full md:w-1/2" />
      <ReserveRight className="w-full md:w-1/2" />
    </div>
  );
};

export default ReserveLayout;