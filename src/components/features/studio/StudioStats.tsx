"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

const StudioStats = () => {
  const t = useTranslations("studio.stats");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section
      className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-16">
        {/* Hours of Recording */}
        <div className="text-center space-y-4 p-8 bg-background/80 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-primary">{t("hoursTitle")}</h3>
          <div className="space-y-2">
            <p className="text-foreground/70">{t("hoursFirstDescription")}</p>
            <p className="text-6xl md:text-7xl font-bold text-primary">
              {t("hoursNumber")}
            </p>
            <p className="text-foreground/70">{t("hoursSecondDescription")}</p>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="text-center space-y-4 p-8 bg-background/80 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-primary">
            {t("projectsTitle")}
          </h3>
          <div className="space-y-2">
            <p className="text-foreground/70">
              {t("projectsFirstDescription")}
            </p>
            <p className="text-6xl md:text-7xl font-bold text-primary">
              {t("projectsNumber")}
            </p>
            <p className="text-foreground/70">
              {t("projectsSecondDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioStats;
