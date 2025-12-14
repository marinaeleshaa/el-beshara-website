"use client";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import MasonryDashboard from "@/components/shared/dashboard/MasonaryDashboard";
import Pagination from "@/components/ui/Pagination";
import { images } from "@/data/images";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";

const page = () => {
  return (
    <div>
      <div className="space-y-10">
        <DashboardHero />

        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/signature"
          onSuccess={(result) => {
            console.log("Full info:", result.info);
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

export default page;
