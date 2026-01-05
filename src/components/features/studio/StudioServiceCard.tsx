import MyBtn from "@/components/ui/MyBtn";
import DynamicIcon from "@/hooks/DynamicIconHook";
import { IService } from "@/lib/Interfaces/ServiceInterface";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const StudioServiceCard = async ({
  service,
  index,
}: {
  service: IService;
  index: number;
}) => {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <div
      key={service.id}
      id={service.title.toLowerCase().replaceAll(/\s+/g, "")}
      className="relative group"
    >
      {/* Animated Border Gradient */}
      {/* <div className="absolute -inset-1 bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" /> */}

      <div
        className={`relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 rounded-3xl bg-background/80 backdrop-blur-sm  group-hover:border-primary/30 transition-all duration-500 ${
          index % 2 === 1 ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Service Image - Takes 2 columns */}
        <div
          className={`relative lg:col-span-2 ${
            index % 2 === 1 ? "lg:order-2" : ""
          }`}
        >
          {/* Image Number Badge */}
          <div
            className={`absolute -top-6 ${
              index % 2 === 0 ? "-left-6" : "-right-6"
            } z-20`}
          >
            <div className="w-15 h-15 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-4xl font-black text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              {index + 1}
            </div>
          </div>

          <div className="relative h-87.5 lg:h-full min-h-100 rounded-2xl overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            />

            {/* Creative Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Badge on Image */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-secondary/90 backdrop-blur-md rounded-xl border border-primary/30">
              <p className="text-sm font-bold text-secondary-foreground">
                {service.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Service Content - Takes 3 columns */}
        <div
          className={`lg:col-span-3 flex flex-col justify-between space-y-6 ${
            index % 2 === 1 ? "lg:order-1" : ""
          }`}
        >
          {/* Header */}
          <div className="space-y-4 ">
            <h3 className="text-3xl md:text-4xl w-fit font-black text-primary leading-tight  relative">
              <span className="animated-underline ">{service.title}</span>
            </h3>

            <p className="text-base text-foreground/70 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Service Points - Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.points.map((point, idx) => (
              <div
                key={idx + 1}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary  transition-all duration-300 group/point"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-foreground/20 to-secondary   flex items-center justify-center text-primary text-sm group-hover/point:scale-110 transition-transform">
                  <DynamicIcon iconName={point.icon as string} />
                </div>
                <p className="text-sm text-foreground/80 font-medium pt-1.5">
                  {point.label}
                </p>
              </div>
            ))}
          </div>

          {/* Statistics - Horizontal Cards */}
          <div className="flex flex-wrap gap-3">
            {service.statistics.map((stat, idx) => (
              <div
                key={idx + 1}
                className="flex-1 min-w-30 relative overflow-hidden p-4 rounded-xl bg-linear-to-br from-secondary/5 via-secondary/10 to-secondary/5 border border-foreground/20 group/stat hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover/stat:translate-x-full transition-transform duration-1000" />
                <p className="relative text-2xl md:text-3xl font-black text-primary mb-1">
                  {stat.value}
                </p>
                <p className="relative text-xs text-foreground/60 font-semibold uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href={service.action.href} className="mt-auto">
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
  );
};

export default StudioServiceCard;
