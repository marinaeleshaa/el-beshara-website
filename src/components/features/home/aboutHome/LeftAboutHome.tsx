import Image from "next/image";

const LeftAboutHome = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} `}>
      <div className="w-[90%] h-75 md:h-125 sm:h-125 relative  ">
        <Image
          src="/home/place.png"
          alt="about"
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full "
        />
        <div className="absolute  w-[40%] h-[50%] top-[10%] right-0 translate-x-1/3 ">
          <Image
            src="/home/logo.jpg"
            alt="about"
            width={900}
            height={900}
            className="object-cover rounded-lg border-background w-full h-full border-8 "
          />
        </div>
      </div>
    </div>
  );
};

export default LeftAboutHome;
