"use client";

import Masonry from "@/components/Masonry";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { IMediaItem } from "@/lib/Interfaces/ImgInterface";
import { useState } from "react";

interface ReelsLayoutProps {
  reels: IMediaItem[];
  meta: {
    page: number;
    totalPages: number;
  };
}
const ReelsLayout = ({
  reels: initialReels,
  meta: initialMeta,
}: ReelsLayoutProps) => {
  const [reels, setReels] = useState(initialReels);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/get-reels?page=${page}&limit=20&isReel=true`);
      const result = await res.json();

      setReels(result.data);
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
      <Masonry items={reels} />
      <Pagination
        totalPages={meta.totalPages}
        currentPage={meta.page}
        onPageChange={fetchPage}
      />
    </div>
  );
};

export default ReelsLayout;
