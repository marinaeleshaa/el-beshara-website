"use client";
import ConfirmationModal from "@/components/shared/ConfirmationModel";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import { AppDispatch } from "@/redux/slices/Store";
import {
  AddVideoAction,
  clearSelectedVideos,
  deleteOneVideoAction,
  deleteVideosAction,
  getVideosAction,
  setSelectedVideos,
  videoSelector,
} from "@/redux/slices/VideoSlice";
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
  const { videos, meta, selectedVideos, isLoading } =
    useSelector(videoSelector);
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  const fetchVideos = useCallback(
    (page: number) => {
      dispatch(getVideosAction({ page, limit: 20 }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchVideos(meta.page);
  }, [fetchVideos, meta.page]);
  const uploadedVideosRef = useRef<CloudinaryUploadWidgetInfo[]>([]);

  const handleSelect = (ids: string[]) => {
    dispatch(setSelectedVideos(ids));
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteOneVideoAction(id));
    fetchVideos(meta.page);
    setOpenDelete(false);
  };

  const handleDeleteAll = async () => {
    await dispatch(deleteVideosAction(selectedVideos));
    dispatch(clearSelectedVideos());
    fetchVideos(meta.page);
    setOpenDeleteAll(false);
  };

  const handleUnselectAll = () => {
    dispatch(clearSelectedVideos());
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
        {!isLoading && videos.length === 0 && (
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
                  uploadedVideosRef.current.unshift(info);
                }
              }}
              onClose={() => {
                if (uploadedVideosRef.current.length === 0) return;

                uploadedVideosRef.current.forEach((info) => {
                  const video: IImage = {
                    url: info.secure_url,
                    public_id: info.public_id,
                    type: "video",
                  };

                  dispatch(AddVideoAction(video));
                });
                uploadedVideosRef.current = [];
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
                  Upload Your First Video
                </MyBtn>
              )}
            </CldUploadWidget>
          </div>
        )}

        {/* Videos Content */}
        {!isLoading && videos.length > 0 && (
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
                    uploadedVideosRef.current.unshift(info);
                  }
                }}
                onClose={() => {
                  if (uploadedVideosRef.current.length === 0) return;

                  uploadedVideosRef.current.forEach((info) => {
                    const video: IImage = {
                      url: info.secure_url,
                      public_id: info.public_id,
                      type: "video",
                    };

                    dispatch(AddVideoAction(video));
                  });

                  uploadedVideosRef.current = [];
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
                    Upload Video
                  </MyBtn>
                )}
              </CldUploadWidget>
              {selectedVideos.length > 0 && (
                <>
                  <MyBtn
                    outline
                    className="gap-2"
                    onClick={() => setOpenDeleteAll(true)}
                  >
                    <GrTrash />
                    {`Remove ${selectedVideos.length}`}
                  </MyBtn>
                  <MyBtn outline className="gap-2" onClick={handleUnselectAll}>
                    <HiOutlineXMark />
                    {`Unselect ${selectedVideos.length}`}
                  </MyBtn>
                </>
              )}
            </div>

            {/* Videos Grid */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="space-y-4">
                <MasonryDashboard
                  items={videos}
                  selectedIds={selectedVideos}
                  onSelectionChange={handleSelect}
                  onRemove={(id) => {
                    setOpenDelete(true);
                    setSelectedVideo(id);
                  }}
                  onUnselectAll={handleUnselectAll}
                />
                <Pagination
                  totalPages={meta.totalPages}
                  currentPage={meta.page}
                  onPageChange={fetchVideos}
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
          title={`Remove ${selectedVideos.length} Videos`}
          message="Are you sure you want to remove these videos?"
          confirmText="Remove"
          cancelText="Cancel"
        />
        <ConfirmationModal
          isOpen={openDelete}
          onCancel={() => setOpenDelete(false)}
          variant="danger"
          onConfirm={() => handleDelete(selectedVideo)}
          title={`Remove Video`}
          message="Are you sure you want to remove this video?"
          confirmText="Remove"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default Page;
