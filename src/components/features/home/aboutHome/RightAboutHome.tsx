import Link from "next/link";
import React from "react";

const RightAboutHome = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} p-4 group space-y-5`}>
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        about us
      </p>
      <h2 className="text-foreground max-w-[80%] capitalize md:text-5xl text-3xl font-extrabold mt-5">
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
      <Link href="/about" className="inline-block bg-primary transition duration-300 cursor-pointer text-primary-foreground  hover:scale-105  rounded-md font-bold  capitalize p-2 px-4">read more</Link>
    </div>
  );
};

export default RightAboutHome;
