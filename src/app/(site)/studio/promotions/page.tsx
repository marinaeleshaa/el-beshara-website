import React from "react";
import PageHero from "@/components/shared/PageHero";
import PromotionHomeLayout from "@/components/features/home/promotions/PromotionHomeLayout";

export const metadata = {
  title: "Studio Promotions | El-Beshara Charity",
  description:
    "Special offers and promotions on studio recording sessions. Book now and support our charitable work.",
};

const PromotionsPage = () => {
  return (
    <div className="space-y-10">
      <PageHero />
      <div className="w-myWidth mx-auto pb-20">
        <PromotionHomeLayout />
      </div>
    </div>
  );
};

export default PromotionsPage;
