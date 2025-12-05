import Image from "next/image";
import React from "react";

const ReserveLeft = ({ className }: { className: string }) => {
  return (
    <div className={`${className} h-full`}>
      <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full max-h-[600px]">
        <div className="row-span-1">
          <Image
            src="/home/about1.jpg"
            alt="about"
            width={900}
            height={900}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="col-span-2 row-span-1">
          <Image
            src="/home/about1.jpg"
            alt="about"
            width={900}
            height={900}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="col-span-2 row-span-1">
          <Image
            src="/home/about1.jpg"
            alt="about"
            width={900}
            height={900}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="row-span-1">
          <Image
            src="/home/about1.jpg"
            alt="about"
            width={900}
            height={900}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ReserveLeft;
