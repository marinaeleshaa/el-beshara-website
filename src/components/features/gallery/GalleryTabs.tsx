"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GalleryTabs = () => {
  const pathname = usePathname();
  const current = pathname.split("/").pop();
  const t = useTranslations("gallery.tabs");
  return (
    <div className="flex justify-center items-center my-10">
      <Tabs
        value={current}
        className="w-[400px] flex justify-evenly  flex-col items-center"
      >
        <TabsList defaultValue={"images"}>
          <TabsTrigger value="images" asChild>
            <Link href="/gallery/images">{t("images")}</Link>
          </TabsTrigger>

          <TabsTrigger value="videos" asChild>
            <Link href="/gallery/videos">{t("videos")}</Link>
          </TabsTrigger>

          <TabsTrigger value="reels" asChild>
            <Link href="/gallery/reels">{t("reels")}</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default GalleryTabs;
