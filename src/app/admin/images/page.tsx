"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
// import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
// import { images } from "@/data/images";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import {
  AddImageAction,
  deleteImgsAction,
  getImagesAction,
  imgSelector,
  setSelectedImages,
} from "@/redux/slices/ImagesSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback, useEffect } from "react";
import { GrTrash } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

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
  }, [fetchImages, meta.page]);

  const handleAddImg = (data) => {
    const { public_id, secure_url } = data;
    const img: IImage = {
      url: secure_url,
      public_id,
      type: "image",
    };
    dispatch(AddImageAction(img));
  };

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

        {/* actions */}

        <div className="flex gap-5">
          <CldUploadWidget
            signatureEndpoint="/api/cloudinary/signature"
            onSuccess={(result) => {
              handleAddImg(result.info);
            }}
            onError={(err) => console.log("Error:", err)}
          >
            {({ open }) => (
              <MyBtn variant="primary" className="gap-2" onClick={() => open()}>
                <IoMdAddCircleOutline />
                Upload Image
              </MyBtn>
            )}
          </CldUploadWidget>
          {selectedImages.length > 0 && (
            <MyBtn outline className="gap-2" onClick={handleDeleteAll}>
              <GrTrash />
              {`remove ${selectedImages.length}`}
            </MyBtn>
          )}
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="">
            <MasonryDashboard
              items={images}
              onSelectionChange={handleSelect}
              onRemove={handleDelete}
            />
            <Pagination
              totalPages={meta.totalPages}
              currentPage={meta.page}
              onPageChange={fetchImages}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
