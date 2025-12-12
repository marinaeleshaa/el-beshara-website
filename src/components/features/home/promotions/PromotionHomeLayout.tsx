"use client";

import { promotionsSelector } from "@/redux/slices/PromotionsSlice";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { useSelector } from "react-redux";
import PromotionSlider from "./PromotionSlider";
import Animate from "@/components/ui/Animate";

const PromotionHomeLayout = () => {
  const { promotions, meta } = useSelector(promotionsSelector);

  if (promotions) {
    return (
      <Animate>
        <div className="space-y-8">
          {/* Merged Hero + Promotions Container */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-dark rounded-2xl">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-dark/20 rounded-full blur-3xl" />

            {/* Hero Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 pb-8">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
                  <Sparkles className="w-4 h-4" />
                  Exclusive Offers
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Amazing Promotions
                  <br />
                  Just for You
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                  Discover unbeatable deals and limited-time offers. Save big on
                  your favorite products and services.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold">
                        {meta.total || 0}
                      </div>
                      <div className="text-sm text-white/80">Active Deals</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold">Up to 70%</div>
                      <div className="text-sm text-white/80">Discounts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* if no offers */}
            <PromotionSlider />
          </div>
        </div>
      </Animate>
    );
  }
};

export default PromotionHomeLayout;
