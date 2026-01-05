import Animate from "@/components/ui/Animate";
import MyBtn from "@/components/ui/MyBtn";
import DynamicIcon from "@/hooks/DynamicIconHook";
import { IService } from "@/lib/Interfaces/ServiceInterface";
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

  // Unified button data - supports both old and new structure
  const buttonText = service.action?.text || service.toContact || "Contact Us";
  const buttonHref = service.action?.href || "/contact";

  return (
    <div key={service.id} id={String(service.id)} className="relative group ">
      <div
        className={`grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 rounded-3xl backdrop-blur-sm group-hover:border-primary/30 transition-all duration-500 ${
          index % 2 === 1 ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Service Image - 2 Columns */}

        <div
          className={`relative lg:col-span-2 ${
            index % 2 === 1 ? "lg:order-2" : ""
          }`}
        >
          <Animate className="relative h-full">
            {/* Number Badge */}
            <div
              className={`absolute -top-6 ${
                index % 2 === 0
                  ? isRTL
                    ? "-right-6"
                    : "-left-6"
                  : isRTL
                  ? "-left-6"
                  : "-right-6"
              } z-20`}
            >
              <div className="w-15 h-15 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-4xl font-black text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {index + 1}
              </div>
            </div>

            <div className="relative h-full min-h-100 rounded-3xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Animate>
        </div>

        {/* Service Content - 3 Columns */}
        <div
          className={`relative lg:col-span-3 flex flex-col justify-between space-y-6 ${
            index % 2 === 1 ? "lg:order-1" : ""
          }`}
        >
          <Animate myDelay>
            <div className="relative rounded-3xl backdrop-blur-xl group-hover:shadow-primary/20 group-hover:border-primary/40 transition-all duration-500 flex flex-col">
              {/* Content Header */}
              <div className="space-y-2.5 mb-5">
                {service.subtitle && (
                  <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {service.subtitle}
                  </div>
                )}

                <div className="relative w-fit">
                  <h2 className="text-3xl md:text-4xl w-fit font-black text-primary leading-tight animated-underline">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Service Points - Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {service.points.map((point, idx) => (
                  <div
                    key={idx + 2}
                    className="flex items-start gap-3 p-3 rounded-xl bg-secondary transition-colors duration-300 group/point"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-foreground/20 to-secondary flex items-center justify-center text-primary text-sm group-hover/point:scale-110 transition-transform">
                      <DynamicIcon iconName={point.icon as string} />
                    </div>
                    <p className="text-foreground/80 font-medium text-sm">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Statistics - Horizontal Cards */}
              <div className="flex flex-wrap gap-3 mb-5">
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
              <Link href={buttonHref} className="mt-auto">
                <MyBtn width="full" variant="primary">
                  <span>{buttonText}</span>
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
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
