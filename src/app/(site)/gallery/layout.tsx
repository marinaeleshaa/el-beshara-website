import GalleryTabs from "@/components/features/gallery/GalleryTabs";
import PageHero from "@/components/shared/PageHero";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PageHero />
      <GalleryTabs/>
      <div className="my-10 w-[80%] mx-auto " >

      {children}
      </div>
    </div>
  );
};

export default Layout;
