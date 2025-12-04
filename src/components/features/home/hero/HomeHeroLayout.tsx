import MyBtn from "@/components/ui/MyBtn";
import Image from "next/image";
import Link from "next/link";

const HomeHeroLayout = () => {
  return (
    <div className=" h-screen relative">
      <div className=" clip-wave absolute inset-0 z-0  bg-primary sm:h-[85%] h-[95%]"></div>
      <div className="h-[90%] sm:h-[80%] w-full p-4 md:p-10 z-10 relative clip-wave flex justify-center items-center md:justify-between ">
        <Image
          src="/home/hero.jpg"
          alt="hero"
          width={900}
          height={900}
          className="object-cover w-full h-full absolute inset-0 -z-1 -scale-x-[1]"
        />
        <div className="clip-wave overflow-hidden absolute bg-secondary/30 backdrop-blur-[6px] inset-0 w-full h-full z-10"></div>
        <div className="clip-wave overflow-hidden absolute bg-primary/20 backdrop-blur-[7px] inset-0 w-full h-full z-9"></div>
        {/* content */}
        <div className="flex h-fit p-10 max-w-2xl  rounded-lg flex-col items-center justify-center relative z-20 text-primary-foreground gap-5">
          <div className="flex flex-col justify-center gap-2">
            <p className="text-primary-foreground sm:text-2xl text-lg">welcome to</p>
            <h1 className="sm:text-7xl text-5xl font-extrabold">El-Beshara Studio</h1>
            <p className="text-sm md:text-lg text-light/80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cum minus, et magnam soluta odit molestiae dignissimos omnis quam </p>
          </div>
          <div className="flex text-center justify-evenly flex-col sm:flex-row gap-5 w-full">
          <MyBtn text="contact us" href="/contact" variant="primary"  width="full" />
          <MyBtn text="about us" href="/about" variant="light" outline width="full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroLayout;
