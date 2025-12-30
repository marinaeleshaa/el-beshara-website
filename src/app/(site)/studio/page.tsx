import React from "react";
import StudioLayout from "@/components/features/studio/StudioLayout";
import PageHero from "@/components/shared/PageHero";

export const metadata = {
  title: "Music Studio | El-Beshara Charity",
  description:
    "Professional Christian music studio supporting our charitable work. Book recording, mixing, and mastering services.",
};

const StudioPage = () => {
  return (
    <div className="space-y-10">
      <PageHero />
      <StudioLayout />
    </div>
  );
};

export default StudioPage;
