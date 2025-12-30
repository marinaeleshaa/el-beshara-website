"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StudioServices from "./StudioServices";
import StudioStats from "./StudioStats";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const StudioLayout = () => {
  const t = useTranslations("studio");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="w-myWidth mx-auto space-y-20 pb-20">
      {/* Studio Hero Section */}
      <div className="text-center space-y-6 pt-10">
        <div className="inline-block">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            {t("subtitle")}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          {t("title")}
        </h1>

        <p
          className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {t("description")}
        </p>

        <div className="pt-6">
          <Link href={t("href")}>
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              {t("btnText")}
              {isRTL ? (
                <FaArrowLeft className="mr-2 group-hover:translate-x-1 transition-transform" />
              ) : (
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </Link>
        </div>

        {/* Impact Banner */}
        <div className="mt-10 p-6 bg-primary/5 border-2 border-primary/20 rounded-xl">
          <p
            className="text-primary font-semibold text-lg"
            dir={isRTL ? "rtl" : "ltr"}
          >
            ✨ {t("impact")}
          </p>
        </div>
      </div>

      {/* Studio Statistics */}
      <StudioStats />

      {/* Studio Services */}
      <StudioServices />
    </div>
  );
};

export default StudioLayout;
