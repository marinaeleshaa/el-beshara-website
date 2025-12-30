"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { IService } from "@/lib/Interfaces/ServiceInterface";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ServicesLayout = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const services = t.raw("ourServices.servicesData") as Record<
    string,
    IService
  >;
  const servicesArray = Object.values(services);

  const DynamicIcon = dynamic(() => import("@/hooks/DynamicIconHook"), {
    ssr: false,
  });

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse" />

      <div className="relative w-[85%] mx-auto space-y-32 py-20">
        {/* Services Header with Floating Badge */}
        <div className="text-center space-y-6 relative">
          <p className="text-xl md:text-2xl text-foreground/60 max-w-4xl mx-auto leading-relaxed">
            {t("ourServices.description")}
          </p>
        </div>

        {/* Services Grid with Innovative Cards */}
        <div className="space-y-40">
          {servicesArray.map((service, index) => (
            <div
              key={service.id}
              id={Object.keys(services)[index]}
              className="relative group"
            >
              {/* Floating Number Badge */}
              <div
                className={`absolute -top-8 ${
                  index % 2 === 0 ? "left-0" : "right-0"
                } z-10`}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-black text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Service Image with Creative Frame */}
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  {/* Decorative Background Shape */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform ${
                      index % 2 === 0 ? "rotate-3" : "-rotate-3"
                    } group-hover:rotate-6 transition-transform duration-500`}
                  />

                  <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-background">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Service Content with Glassmorphism Card */}
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="relative p-8 rounded-3xl bg-background/60 backdrop-blur-xl border-2 border-primary/20 shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/40 transition-all duration-500">
                    {/* Content Header */}
                    <div className="space-y-4 mb-6">
                      <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {service.subtitle}
                      </div>

                      <h2 className="text-4xl md:text-5xl font-black text-foreground">
                        {service.title}
                      </h2>

                      <p className="text-lg text-foreground/70 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Service Points with Modern Icons */}
                    <div className="space-y-3 mb-6">
                      {service.points.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xl">
                            <DynamicIcon iconName={point.icon as string} />
                          </div>
                          <p className="text-foreground/80 font-medium pt-2">
                            {point.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Statistics with Gradient Cards */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {service.statistics.map((stat, idx) => (
                        <div
                          key={idx}
                          className="relative p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center group/stat hover:scale-105 transition-transform duration-300"
                        >
                          <p className="text-2xl md:text-3xl font-black bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                            {stat.value}
                          </p>
                          <p className="text-xs text-foreground/60 font-semibold mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button with Gradient */}
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold text-lg py-6 shadow-lg hover:shadow-primary/50 transition-all duration-300 group/btn"
                      >
                        <span>{service.toContact || "Contact Us"}</span>
                        <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">
                          →
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesLayout;
