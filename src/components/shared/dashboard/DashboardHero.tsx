"use client";

import MyBtn from "@/components/ui/MyBtn";
import { usePathname } from "next/navigation";
import { IoIosAddCircle } from "react-icons/io";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import {  useEffect, useState } from "react";

const DashboardHero = () => {
  const pathname = usePathname();
  const page = pathname.split("/").pop();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getUsername = () => {
      const username = Cookies.get("username");
      if (username) {
        setUsername(username);
      }
    };
    getUsername();
  }, []);

  return (
    <div className="w-full p-5 flex flex-col gap-5  justify-between   rounded-lg">
      <div
        className={`w-full flex flex-col md:flex-row justify-between items-center gap-5`}
      >
        <h1 className="text-primary  capitalize md:text-4xl text-2xl font-bold underline underline-offset-6 ">
          {page}
        </h1>
        {page !== "admins" && (
          <MyBtn
            text={`add ${page}`}
            variant="primary"
            icon={<IoIosAddCircle />}
          />
        )}
        {page === "admins" && (
          <div>
            <p className="text-lg md:text-2xl text-foreground/80 flex items-center gap-2">
              <FaUserCircle />

              {username}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHero;
