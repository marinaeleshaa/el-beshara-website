"use client";

import { useState } from "react";
import Masonry from "@/components/Masonry";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { IMediaItem } from "@/lib/Interfaces/ImgInterface";
import EmptyState from "@/components/shared/EmptyState";
import { useTranslations } from "next-intl";
import { ImageIcon } from "lucide-react";

interface ImagesLayoutProps {
  images: IMediaItem[];
  meta: {
    page: number;
    totalPages: number;
  };
}

const ImagesLayout = ({
  images: initialImages,
  meta: initialMeta,
}: ImagesLayoutProps) => {
  const [images, setImages] = useState(initialImages);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);
  const t= useTranslations("emptyState.images");

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      // استدعاء Server Action من Client Component
      const res = await fetch(`/api/get-images?page=${page}&limit=20`);
      const result = await res.json();

      setImages(result.data);
      setMeta(result.meta);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Spinner className="w-20 h-20" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center">
        <EmptyState title={t("title")} description={t("description")} icon={<ImageIcon size={100} />}/>
      </div>
    );
  }

  return (
    <div>
      <Masonry items={images} />
      <Pagination
        totalPages={meta.totalPages}
        currentPage={meta.page}
        onPageChange={fetchPage}
      />
    </div>
  );
};

export default ImagesLayout;
