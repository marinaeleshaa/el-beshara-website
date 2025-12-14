"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import MyBtn from "@/components/ui/MyBtn";
import Pagination from "@/components/ui/Pagination";
import { images } from "@/data/images";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import { AddImageAction } from "@/redux/slices/ImagesSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { url } from "inspector";
import { CldUploadWidget } from "next-cloudinary";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddImg = (data) => {
    console.log(data)
    const { public_id, secure_url } = data;
    const img: IImage = {
      url: secure_url,
      public_id,
      type: "image",
    };
    dispatch(AddImageAction(img));
  };
  return (
    <div>
      <div className="space-y-10">
        <DashboardHero />

        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/signature"
          onSuccess={(result) => {
            console.log("result", result.info);
            handleAddImg(result.info);
          }}
          onError={(err) => console.log("Error:", err)}
        >
          {({ open }) => <button onClick={() => open()}>Upload Image</button>}
        </CldUploadWidget>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="">
            <MasonryDashboard
              items={images}
              onSelectionChange={(ids) => console.log("Selected images:", ids)}
              onRemove={(id) => console.log("Remove img:", id)}
            />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
