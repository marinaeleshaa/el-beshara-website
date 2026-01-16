import React from "react";
import StudioServices from "./StudioServices";
import StudioStats from "./StudioStats";
import Animate from "@/components/ui/Animate";
import PromotionHomeLayout from "../home/promotions/PromotionHomeLayout";
import { getTranslations } from "next-intl/server";

const StudioLayout = async () => {
  const t = await getTranslations("studio");

  return (
    <div className="w-myWidth mx-auto space-y-20 pb-20">
      {/* Section Header with Creative Badge */}
      <Animate>
        <div className="text-center space-y-6 ">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-primary/10 to-primary/20 rounded-full border-2 border-primary/30">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl leading-relaxed md:text-6xl font-black bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            {t("title")}
          </h2>

          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>
      </Animate>
      {/* Studio Statistics */}
      <Animate>
        <StudioStats />
      </Animate>
      <PromotionHomeLayout />
      {/* Studio Services */}
      <StudioServices />
    </div>
  );
};

export default StudioLayout;
