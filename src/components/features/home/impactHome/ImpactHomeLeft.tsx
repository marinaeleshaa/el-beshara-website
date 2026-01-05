import Image from "next/image";

const ImpactHomeLeft = ({ className }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <div className="w-full h-75 md:h-125 sm:h-125 relative">
        <Image
          src="/home/2.jpg"
          alt="charity impact"
          width={900}
          height={900}
          className="object-cover rounded-lg w-full h-full"
        />
        <div className="absolute w-[50%] h-[70%] -bottom-[10%] left-0 -translate-x-1/3">
          <Image
            src="/home/about3.jpg"
            alt="community outreach"
            width={900}
            height={900}
            className="object-fit rounded-lg border-background w-full h-full border-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ImpactHomeLeft;
