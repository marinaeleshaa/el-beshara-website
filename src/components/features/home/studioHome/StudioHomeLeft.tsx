import Image from "next/image";
import React from "react";

const GalleryHomeLeft = ({ className }: { className?: string }) => {
  return (
    <div className={`${className}  `}>
      <div className="w-full h-[300px] md:h-[500px] sm:h-[500px] relative  ">
        <Image
          src="/home/2.jpg"
          alt="about"
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full "
        />
        <div className="absolute   w-[50%] h-[70%] -bottom-[10%] left-0 -translate-x-1/3 ">
          <Image
            src="/home/about3.jpg"
            alt="about"
            width={900}
            height={900}
            className="object-fit rounded-lg border-background w-full h-full border-8 "
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryHomeLeft;
