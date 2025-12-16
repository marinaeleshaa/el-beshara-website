"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { images } from "@/data/images";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import {
  AddReelsAction,
  deleteOneReelAction,
  deleteReelsAction,
  getReelsAction,
  reelsSelector,
  setSelectedReels,
} from "@/redux/slices/ReelsSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useCallback, useEffect, useRef } from "react";
import { GrTrash } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reels, isLoading, meta, selectedReels } = useSelector(reelsSelector);
  const uploadedReelsRef = useRef<CloudinaryUploadWidgetInfo[]>([]);

  const fetchReels = useCallback(
    (page: number) => {
      dispatch(getReelsAction({ page, limit: 20, isReel: true }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchReels(meta.page);
  }, [fetchReels, meta.page]);

  const handleSelect = (ids: string[]) => {
    dispatch(setSelectedReels(ids));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteOneReelAction(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteReelsAction(selectedReels));
    dispatch(setSelectedReels([]));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-20 h-20" />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-10">
        <DashboardHero />

        {/* Empty State */}
        {!isLoading && reels.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <p className="text-2xl font-bold">No Videos Yet</p>
            <CldUploadWidget
              signatureEndpoint="/api/cloudinary/signature"
              onSuccess={(result) => {
                const info = result?.info;

                if (
                  typeof info === "object" &&
                  info &&
                  info.resource_type === "video"
                ) {
                  uploadedReelsRef.current.unshift(info);
                }
              }}
              onClose={() => {
                if (uploadedReelsRef.current.length === 0) return;

                uploadedReelsRef.current.forEach((info) => {
                  const reel: IImage = {
                    url: info.secure_url,
                    public_id: info.public_id,
                    type: "video",
                    isReel: true,
                  };

                  dispatch(AddReelsAction(reel));
                });
                uploadedReelsRef.current = [];
                // Fix: Restore body overflow after Cloudinary widget closes
                document.body.style.overflow = "unset";
              }}
              options={{
                multiple: true,
                resourceType: "video",
                maxFiles: 5,
                showUploadMoreButton: true,
                showCompletedButton: true,
                clientAllowedFormats: [
                  "mp4",
                  "mov",
                  "avi",
                  "mkv",
                  "webm",
                  "ogg",
                ],
              }}
              onError={(err) => console.log("Error:", err)}
            >
              {({ open }) => (
                <MyBtn
                  variant="primary"
                  className="gap-2"
                  onClick={() => open()}
                >
                  <IoMdAddCircleOutline />
                  Upload Your First Reel
                </MyBtn>
              )}
            </CldUploadWidget>
          </div>
        )}
        {/* reels Content */}
        {!isLoading && reels.length > 0 && (
          <>
            {/* Actions */}
            <div className="flex gap-5">
              <CldUploadWidget
                signatureEndpoint="/api/cloudinary/signature"
                onSuccess={(result) => {
                  const info = result?.info;

                  if (
                    typeof info === "object" &&
                    info &&
                    info.resource_type === "video"
                  ) {
                    uploadedReelsRef.current.unshift(info);
                  }
                }}
                onClose={() => {
                  if (uploadedReelsRef.current.length === 0) return;

                  uploadedReelsRef.current.forEach((info) => {
                    const reel: IImage = {
                      url: info.secure_url,
                      public_id: info.public_id,
                      type: "video",
                      isReel: true,
                    };

                    dispatch(AddReelsAction(reel));
                  });

                  uploadedReelsRef.current = [];
                  // Fix: Restore body overflow after Cloudinary widget closes
                  document.body.style.overflow = "unset";
                }}
                options={{
                  multiple: true,
                  resourceType: "video",
                  maxFiles: 5,
                  showUploadMoreButton: true,
                  showCompletedButton: true,
                  clientAllowedFormats: [
                    "mp4",
                    "mov",
                    "avi",
                    "mkv",
                    "webm",
                    "ogg",
                  ],
                }}
                onError={(err) => console.log("Error:", err)}
              >
                {({ open }) => (
                  <MyBtn
                    variant="primary"
                    className="gap-2"
                    onClick={() => open()}
                  >
                    <IoMdAddCircleOutline />
                    Upload Reel
                  </MyBtn>
                )}
              </CldUploadWidget>
              {selectedReels.length > 0 && (
                <MyBtn outline className="gap-2" onClick={handleDeleteAll}>
                  <GrTrash />
                  {`Remove ${selectedReels.length}`}
                </MyBtn>
              )}
            </div>

            {/* Videos Grid */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="space-y-4">
                <MasonryDashboard
                  items={reels}
                  onSelectionChange={handleSelect}
                  onRemove={handleDelete}
                />
                <Pagination
                  totalPages={meta.totalPages}
                  currentPage={meta.page}
                  onPageChange={fetchReels}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
