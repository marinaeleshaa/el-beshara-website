"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { IService } from "@/lib/Interfaces/ServiceInterface";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const StudioServices = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const studioServices = t.raw("studio.studioServices") as Record<
    string,
    IService
  >;
  const servicesArray = Object.values(studioServices);

  const DynamicIcon = dynamic(() => import("@/hooks/DynamicIconHook"), {
    ssr: false,
  });

  return (
    <section className="relative space-y-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Section Header with Creative Badge */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/20 rounded-full border-2 border-primary/30">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            🎬 Professional Studio Services
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
          {t("studio.title")}
        </h2>

        <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
          {t("studio.description")}
        </p>
      </div>

      {/* Services Cards Grid */}
      <div className="space-y-24">
        {servicesArray.map((service, index) => (
          <div
            key={service.id}
            id={service.title.toLowerCase().replace(/\s+/g, "")}
            className="relative group"
          >
            {/* Animated Border Gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div
              className={`relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 rounded-3xl bg-background/80 backdrop-blur-sm border-2 border-primary/10 group-hover:border-primary/30 transition-all duration-500 ${
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
                <div className="absolute -top-4 -left-4 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center text-xl font-black text-white shadow-xl border-4 border-background">
                  {index + 1}
                </div>

                <div className="relative h-[350px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                  />

                  {/* Creative Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Badge on Image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-background/90 backdrop-blur-md rounded-xl border border-primary/30">
                    <p className="text-sm font-bold text-primary">
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
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-base text-foreground/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Points - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 group/point"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary text-sm group-hover/point:scale-110 transition-transform">
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
                      key={idx}
                      className="flex-1 min-w-[120px] relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 group/stat hover:scale-105 transition-transform duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover/stat:translate-x-[100%] transition-transform duration-1000" />
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
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white font-bold shadow-lg hover:shadow-primary/40 transition-all duration-300 group/btn"
                  >
                    <span>{service.action.text}</span>
                    <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">
                      →
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudioServices;
