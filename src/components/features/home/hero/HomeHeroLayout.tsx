import Image from "next/image";
import React from "react";

const HomeHeroLayout = () => {
  return (
    <div className=" h-screen relative">
      <div className=" clip-wave-pic absolute inset-0 z-0  bg-primary h-[85%]"></div>
      <div className="h-[80%] w-full z-10 relative clip-wave">
        <Image
          src="/home/hero.jpg"
          alt="hero"
          width={900}
          height={900}
          className="object-cover w-full h-full"
        />
      <div className="clip-wave absolute bg-primary/20 backdrop-blur-[2px] inset-0 w-full h-full z-10"></div>
      </div>
    </div>
  );
};

export default HomeHeroLayout;
