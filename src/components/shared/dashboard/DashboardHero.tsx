"use client";

import MyBtn from "@/components/ui/MyBtn";
import { usePathname } from "next/navigation";
import { IoIosAddCircle } from "react-icons/io";

const DashboardHero = () => {
  const pathname = usePathname();
  const page = pathname.split("/").pop();

  return (
    <div className="w-full p-5 flex flex-col gap-5 md:flex-row justify-between items-center  rounded-lg">
      <h1 className="text-primary  capitalize md:text-4xl text-2xl font-bold underline underline-offset-6 ">{page}</h1>
      <MyBtn
        text={`add ${page}`}
        variant="primary"
        icon={<IoIosAddCircle />}
      />
    </div>
  );
};

export default DashboardHero;
