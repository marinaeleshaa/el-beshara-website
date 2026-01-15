import Animate from "@/components/ui/Animate";
import { getTranslations } from "next-intl/server";

const FixedHomeImgLayout = async() => {
  const t = await getTranslations("common");
  return (
    <div className="w-full h-75 relative overflow-hidden">
      {/* Background */}
      <div className="absolute overflow-hidden inset-0 bg-[url('/home/newFixed.jpg')] bg-cover bg-center bg-fixed"></div>

      {/* Overlay content */}
      <div className="relative overflow-hidden z-10 flex justify-center bg-dark/50 backdrop-blur-[2px] items-center h-full ">
      <Animate className="text-center" >
        <h1 className="text-dark-foreground text-3xl sm:text-5xl md:text-6xl font-bold">
          {t("studioName")}
        </h1>
        </Animate>
      </div>
    </div>
  );
};

export default FixedHomeImgLayout;
