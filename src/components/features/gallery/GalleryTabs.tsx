"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GalleryTabs = () => {
  const pathname = usePathname();

  const current = pathname.split("/").pop(); // account | password

  return (
    <div className="flex justify-center items-center my-10">
      <Tabs
        value={current}
        className="w-[400px] flex justify-evenly  flex-col items-center"
      >
        <TabsList defaultValue={"images"}>
          <TabsTrigger value="images" asChild>
            <Link href="/gallery/images">Images</Link>
          </TabsTrigger>

          <TabsTrigger value="videos" asChild>
            <Link href="/gallery/videos">Videos</Link>
          </TabsTrigger>

          <TabsTrigger value="reels" asChild>
            <Link href="/gallery/reels">Reels</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default GalleryTabs;
