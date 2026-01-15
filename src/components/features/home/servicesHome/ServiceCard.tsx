import MyBtn from "@/components/ui/MyBtn";
import { IService } from "@/lib/Interfaces/ServiceInterface";
import Image from "next/image";

const ServiceCard = ({ service }: { service: IService }) => {
  return (
    <div className="group relative">
      <div
        className="
          bg-foreground/70 rounded-lg flex flex-col justify-center 
          items-center text-primary-foreground hover:scale-105 transition 
          duration-300 h-75 overflow-hidden relative
        "
      >
        <Image
          src={service.image}
          alt={service.title}
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full"
        />

        {/* Overlay */}
        <div
          className="
            absolute bottom-0 left-0 w-full
            bg-dark/80 
            flex flex-col items-center
            overflow-hidden p-4 
            transition-all duration-500 ease-out
          "
        >
          {/* Title: always visible */}
          <p className="text-dark-foreground text-center text-lg font-bold shrink-0">
            {service.title}
          </p>

          {/* Hidden content: appears on hover */}
          <div
            className="
              grid grid-rows-[0fr] 
              transition-all duration-500 ease-out
              group-hover:grid-rows-[1fr]
              w-full
            "
          >
            <div className="overflow-hidden">
              <div className="text-center px-4 mt-2 flex flex-col gap-2">
                <p className="line-clamp-3">{service.description}</p>
                <MyBtn
                  text={service.action.text}
                  href={service.action.href}
                  width="full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;