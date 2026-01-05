import MyBtn from "@/components/ui/MyBtn";
import DynamicIcon from "@/hooks/DynamicIconHook";
import { IService } from "@/lib/Interfaces/ServiceInterface";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = async ({
  service,
  index,
}: {
  service: IService;
  index: number;
}) => {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <div key={service.id} className="relative group">
      <div
        className={`grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 rounded-3xl  backdrop-blur-sm  group-hover:border-primary/30 transition-all duration-500 ${
          index % 2 === 1 ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Service Image with Creative Frame */}
        <div
          className={`relative lg:col-span-2 ${
            index % 2 === 1 ? "lg:order-2" : ""
          }`}
        >
          <div className="relative">
            {/* Number Badge - Positioned on Image */}
            <div
              className={`absolute -top-6 ${
                index % 2 === 0 ? "-left-6" : "-right-6"
              } z-20`}
            >
              <div className="w-15 h-15 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-4xl font-black text-white  group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {index + 1}
              </div>
            </div>

            <div className="relative h-125 rounded-3xl overflow-hidden  ">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Service Content  */}
        <div
          className={`relative lg:col-span-3 ${
            index % 2 === 1 ? "lg:order-1" : ""
          }`}
        >
          <div className="relative  rounded-3xl  backdrop-blur-xl   group-hover:shadow-primary/20 group-hover:border-primary/40 transition-all duration-500 h-125 flex flex-col">
            {/* Content Header */}
            <div className="space-y-2.5 mb-5">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                {service.subtitle}
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                {service.title}
              </h2>

              <p className="text-sm text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Service Points - Compact */}
            <div className="space-y-2 mb-5 grow overflow-y-auto">
              {service.points.map((point, idx) => (
                <div
                  key={idx + 2}
                  className="flex items-center gap-3 p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-base">
                    <DynamicIcon iconName={point.icon as string} />
                  </div>
                  <p className="text-foreground/80 font-medium text-sm">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Statistics - Compact Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {service.statistics.map((stat, idx) => (
                <div
                  key={idx + 1}
                  className="relative p-2.5 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 text-center group/stat hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-xl font-black bg-linear-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-foreground/60 font-semibold mt-0.5 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="mt-auto">
              <MyBtn
                width="full"
                variant="primary"
                //   className={`${isRTL ? "flex-row-reverse" : ""}  }`}
              >
                <span>{service.action.text}</span>
                <span
                  className={`ms-2 group-hover/btn:translate-x-1 transition-transform ${
                    isRTL ? "rotate-180" : ""
                  }`}
                >
                  <DynamicIcon iconName="FaArrowRightLong" />
                </span>
              </MyBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
