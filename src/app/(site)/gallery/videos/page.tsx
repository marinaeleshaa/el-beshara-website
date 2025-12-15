import React from "react";
import { getVideosServerAction } from "./actions";
import VideosLayout from "@/components/features/gallery/videos/VideosLayout";

export const metadata = {
  title: "Videos | El-Beshara Studio",
  description: "Creating amazing musical experiences for the world.",
}
interface PageProps {
  searchParams: Promise<{ page?: string }>;
}
const VideoPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;

  const { data: videos, meta } = await getVideosServerAction({ page, limit: 20 });
  return <div>
    <VideosLayout videos={videos} meta={meta} />
  </div>;
};

export default VideoPage;
