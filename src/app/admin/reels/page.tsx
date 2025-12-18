"use client";
import ConfirmationModal from "@/components/shared/ConfirmationModel";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { images } from "@/data/images";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import {
  AddReelsAction,
  clearSelectedReels,
  deleteOneReelAction,
  deleteReelsAction,
  getReelsAction,
  reelsSelector,
  setSelectedReels,
} from "@/redux/slices/ReelsSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { clear } from "console";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useCallback, useEffect, useRef, useState } from "react";
import { GrTrash } from "react-icons/gr";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { reels, isLoading, meta, selectedReels } = useSelector(reelsSelector);
  const uploadedReelsRef = useRef<CloudinaryUploadWidgetInfo[]>([]);
  const [selectedReel, setSelectedReel] = useState<string>("");

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

  const handleDelete = async (id: string) => {
    await dispatch(deleteOneReelAction(id));
    fetchReels(meta.page);
    setOpenDelete(false);
  };

  const handleDeleteAll = async () => {
    await dispatch(deleteReelsAction(selectedReels));
    dispatch(clearSelectedReels());
    fetchReels(meta.page);
    setOpenDeleteAll(false);
  };

  const handleUnselectAll = () => {
    dispatch(clearSelectedReels());
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
                <>
                  <MyBtn
                    outline
                    className="gap-2"
                    onClick={() => setOpenDeleteAll(true)}
                  >
                    <GrTrash />
                    {`Remove ${selectedReels.length}`}
                  </MyBtn>
                  <MyBtn outline className="gap-2" onClick={handleUnselectAll}>
                    <HiOutlineXMark />
                    {`Unselect ${selectedReels.length}`}
                  </MyBtn>
                </>
              )}
            </div>

            {/* Videos Grid */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="space-y-4">
                <MasonryDashboard
                  items={reels}
                  selectedIds={selectedReels}
                  onSelectionChange={handleSelect}
                  onRemove={(id) => {
                    setOpenDelete(true);
                    setSelectedReel(id);
                  }}
                  onUnselectAll={handleUnselectAll}
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
        <ConfirmationModal
          isOpen={openDeleteAll}
          onCancel={() => setOpenDeleteAll(false)}
          variant="danger"
          onConfirm={handleDeleteAll}
          title={`Remove ${selectedReels.length} Reels`}
          message="Are you sure you want to remove these reels?"
          confirmText="Remove"
          cancelText="Cancel"
        />
        <ConfirmationModal
          isOpen={openDelete}
          onCancel={() => setOpenDelete(false)}
          variant="danger"
          onConfirm={() => handleDelete(selectedReel)}
          title={`Remove Reel`}
          message="Are you sure you want to remove this reel?"
          confirmText="Remove"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default Page;
