"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import {
  AddImageAction,
  clearSelectedImages,
  deleteImgsAction,
  getImagesAction,
  imgSelector,
  setSelectedImages,
} from "@/redux/slices/ImagesSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useCallback, useEffect, useState } from "react";
import { GrTrash } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import ConfirmationModal from "@/components/shared/ConfirmationModel";

const Page = () => {
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { images, meta, isLoading, selectedImages } = useSelector(imgSelector);
  const [selectedImage, setSelectedImage] = useState<string>("");

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

  const handleDeleteAll = async () => {
    await dispatch(deleteImgsAction(selectedImages));
    dispatch(clearSelectedImages());
    fetchImages(meta.page);
    setOpenDeleteAll(false);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteImgsAction([id]));
    fetchImages(meta.page);
    setOpenDelete(false);
  };

  const handleUnselectAll = () => {
    dispatch(clearSelectedImages());
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
                <>
                  <MyBtn
                    outline
                    className="gap-2"
                    onClick={() => setOpenDeleteAll(true)}
                  >
                    <GrTrash />
                    {`Remove ${selectedImages.length}`}
                  </MyBtn>
                  <MyBtn outline className="gap-2" onClick={handleUnselectAll}>
                    <HiOutlineXMark />
                    {`Unselect ${selectedImages.length}`}
                  </MyBtn>
                </>
              )}
            </div>

            {/* Images Grid */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="space-y-4">
                <MasonryDashboard
                  items={images}
                  selectedIds={selectedImages}
                  onSelectionChange={handleSelect}
                  onRemove={(id) => {
                    setOpenDelete(true);
                    setSelectedImage(id);
                  }}
                  onUnselectAll={handleUnselectAll}
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
        <ConfirmationModal
          isOpen={openDeleteAll}
          onCancel={() => setOpenDeleteAll(false)}
          variant="danger"
          onConfirm={handleDeleteAll}
          title={`Remove ${selectedImages.length} images`}
          message="Are you sure you want to remove these images?"
          confirmText="Remove"
          cancelText="Cancel"
        />
        <ConfirmationModal
          isOpen={openDelete}
          onCancel={() => setOpenDelete(false)}
          variant="danger"
          onConfirm={() => handleDelete(selectedImage) }
          title={`Remove image`}
          message="Are you sure you want to remove this image?"
          confirmText="Remove"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default Page;
