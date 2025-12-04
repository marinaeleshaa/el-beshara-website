import MyBtn from "@/components/ui/MyBtn";
import Link from "next/link";
import React from "react";

const RightAboutHome = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} p-4 group space-y-5`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        about us
      </p>
      <h2 className="text-foreground max-w-[70%] capitalize md:text-5xl text-3xl font-extrabold mt-5">
        know more about us
      </h2>
      <p className="text-foreground/90  md:text-lg text-base">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, doloribus cumque ad ullam sunt sit officia voluptas. Quo, repudiandae ipsam?
      </p>
      <ul className="list-disc list-inside">
        <li className="text-foreground/80  md:text-lg text-base">
          Lorem ipsum dolor sit amet 
        </li>
        <li className="text-foreground/80  md:text-lg text-base">
        Lorem ipsum dolor sit amet 
        </li>
      </ul>
      <MyBtn text="read more" href="/about"  className="mt-4 " />
    </div>
  );
};

export default RightAboutHome;
