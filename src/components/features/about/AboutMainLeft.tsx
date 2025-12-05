import MyBtn from "@/components/ui/MyBtn";
import React from "react";

const AboutMainLeft = ({ className }: { className: string }) => {
  return (
    <div className={`${className} p-4 group space-y-5`} >
      <p className="text-primary/80 relative w-fit capitalize font-bold text-md md:text-lg  animated-underline">
        about us
      </p>
      <h2 className="text-foreground  capitalize md:text-5xl text-3xl font-extrabold mt-5">
        know more about us
      </h2>
      <p className="text-foreground/90  md:text-lg text-base">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos,
        doloribus cumque ad ullam sunt sit officia voluptas. Quo, repudiandae
        ipsam?
      </p>
      <MyBtn text='contact us' href="/contact" variant="primary" className="mt-4 w-full" />
    </div>
  );
};

export default AboutMainLeft;
