"use client";

import Masonry from "@/components/Masonry";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { IMediaItem } from "@/lib/Interfaces/ImgInterface";
import { useState } from "react";

interface VideosLayoutProps {
  videos: IMediaItem[];
  meta: {
    page: number;
    totalPages: number;
  };
}
const VideosLayout = ({
  videos: initialVideos,
  meta: initialMeta,
}: VideosLayoutProps) => {
  const [videos, setVideos] = useState(initialVideos);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/get-videos?page=${page}&limit=20`);
      const result = await res.json();

      setVideos(result.data);
      setMeta(result.meta);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-20 h-20" />
      </div>
    );
  }
  return (
    <div>
      <Masonry items={videos} />
      <Pagination
        totalPages={meta.totalPages}
        currentPage={meta.page}
        onPageChange={fetchPage}
      />
    </div>
  );
};

export default VideosLayout;
