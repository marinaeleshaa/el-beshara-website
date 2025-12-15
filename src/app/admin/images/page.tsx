"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import {
  AddImageAction,
  deleteImgsAction,
  getImagesAction,
  imgSelector,
  setSelectedImages,
} from "@/redux/slices/ImagesSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useCallback, useEffect } from "react";
import { GrTrash } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, meta, isLoading, selectedImages } = useSelector(imgSelector);

  const fetchImages = useCallback(
    (page: number) => {
      dispatch(getImagesAction({ page, limit: 20 }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchImages(meta.page);
  }, [fetchImages, meta.page, dispatch]);
  const uploadedImagesRef = useRef<CloudinaryUploadWidgetInfo[]>([]);

  const handleSelect = (ids: string[]) => {
    dispatch(setSelectedImages(ids));
  };

  const handleDeleteAll = () => {
    dispatch(deleteImgsAction(selectedImages));
    dispatch(setSelectedImages([]));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteImgsAction([id]));
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
        {!isLoading && images.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <p className="text-2xl font-bold">No Images Yet</p>
            <CldUploadWidget
              signatureEndpoint="/api/cloudinary/signature"
              onSuccess={(result) => {
                const info = result?.info;

                if (
                  typeof info === "object" &&
                  info &&
                  info.resource_type === "image"
                ) {
                  uploadedImagesRef.current.unshift(info);
                }
              }}
              options={{
                multiple: true,
                showUploadMoreButton: true,
                showCompletedButton: true,
                resourceType: "image",
                maxFiles: 10,
                clientAllowedFormats: [
                  "jpg",
                  "jpeg",
                  "png",
                  "gif",
                  "webp",
                  "svg",
                ],
              }}
              onClose={() => {
                if (uploadedImagesRef.current.length === 0) return;

                uploadedImagesRef.current.forEach((info) => {
                  const img: IImage = {
                    url: info.secure_url,
                    public_id: info.public_id,
                    type: "image",
                  };

                  dispatch(AddImageAction(img));
                });
                uploadedImagesRef.current = [];
                // Fix: Restore body overflow after Cloudinary widget closes
                document.body.style.overflow = "unset";
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
                  Upload Your First Image
                </MyBtn>
              )}
            </CldUploadWidget>
          </div>
        )}

        {/* Images Content */}
        {!isLoading && images.length > 0 && (
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
                    info.resource_type === "image"
                  ) {
                    uploadedImagesRef.current.unshift(info);
                  }
                }}
                options={{
                  multiple: true,
                  showUploadMoreButton: true,
                  showCompletedButton: true,
                  resourceType: "image",
                  maxFiles: 10,
                  clientAllowedFormats: [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                    "svg",
                  ],
                }}
                onClose={() => {
                  if (uploadedImagesRef.current.length === 0) return;

                  uploadedImagesRef.current.forEach((info) => {
                    const img: IImage = {
                      url: info.secure_url,
                      public_id: info.public_id,
                      type: "image",
                    };

                    dispatch(AddImageAction(img));
                  });
                  uploadedImagesRef.current = [];
                  // Fix: Restore body overflow after Cloudinary widget closes
                  document.body.style.overflow = "unset";
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
                    Upload Image
                  </MyBtn>
                )}
              </CldUploadWidget>
              {selectedImages.length > 0 && (
                <MyBtn outline className="gap-2" onClick={handleDeleteAll}>
                  <GrTrash />
                  {`Remove ${selectedImages.length}`}
                </MyBtn>
              )}
            </div>

            {/* Images Grid */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="space-y-4">
                <MasonryDashboard
                  items={images}
                  onSelectionChange={handleSelect}
                  onRemove={handleDelete}
                />
                <Pagination
                  totalPages={meta.totalPages}
                  currentPage={meta.page}
                  onPageChange={fetchImages}
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
