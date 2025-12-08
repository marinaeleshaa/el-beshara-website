"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import { images } from "@/data/images";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="space-y-10">
        <DashboardHero />
        <div className="bg-secondary/50 rounded-lg p-4">
      <div className="">
        <MasonryDashboard
          items={images}
          onSelectionChange={(ids) => console.log("Selected images:", ids)}
          onRemove={(id) => console.log("Remove img:", id)}
        />
      </div>
    </div>
      </div>
    </div>
  );
};

export default page;
