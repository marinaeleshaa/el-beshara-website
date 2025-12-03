import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard = () => {
  return (
    <div className="group relative">
      <div
        className="
          bg-foreground/70 rounded-lg flex flex-col justify-center 
          items-center text-primary-foreground hover:scale-105 transition 
          duration-300 h-[300px] overflow-hidden relative
        "
      >
        <Image
          src="/home/service.jpg"
          alt="service"
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full"
        />

        {/* Overlay */}
        <div
          className="
            absolute bottom-0 left-0 w-full
            bg-foreground/80 dark:bg-background/80
            flex flex-col items-center justify-evenly
            overflow-hidden p-4 
            h-[60px] sm:h-[65px] md:h-[70px] lg:h-[60px] group-hover:h-60 sm:group-hover:h-[190px] md:group-hover:h-[250px]
           lg:group-hover:h-[220px] transition-[height] duration-500 ease-out
          "
        >
          {/* Title: always visible */}
          <p className="text-light text-lg font-bold ">Service</p>

          {/* Hidden content: appears on hover */}
          <div
            className="
              opacity-0 translate-y-4
              transition-all duration-500 ease-out
              group-hover:opacity-100 group-hover:translate-y-0
              text-center px-4 mt-2 flex flex-col gap-2
            "
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
              accusantium nesciunt vero 
            </p>
            <Link
              href="/services"
              className="inline-block bg-primary transition duration-300 cursor-pointer text-primary-foreground hover:scale-105 rounded-md font-bold capitalize p-2 px-4"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
