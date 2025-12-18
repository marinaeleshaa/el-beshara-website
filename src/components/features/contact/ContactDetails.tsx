"use client";
import { profileSelector } from "@/redux/slices/ProfileSlice";
import { useTranslations } from "next-intl";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const ContactDetails = ({ className }: { className: string }) => {
  const { profile } = useSelector(profileSelector);
  const t = useTranslations("contact");
  return (
    <div className={`${className} rounded-lg bg-secondary/40`}>
      <div className="flex flex-col justify-evenly h-full  md:p-10 p-5 gap-5">
        <div className="w-full flex flex-col justify-center items-center gap-4 bg-background p-5 rounded-lg">
          <p className="text-2xl lg:text-3xl text-primary">
            <FaPhone />
          </p>
          <h3 className="font-bold text-lg md:text-2xl capitalize">
            {t("phone")}
          </h3>
          <ul className="text-center">
            {profile?.phoneNumbers.map((phone, index) => (
              <li key={index} className="text-foreground">
                {phone}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 bg-background p-5 rounded-lg">
          <p className="text-2xl lg:text-3xl text-primary">
            <HiOutlineMail />
          </p>
          <h3 className="font-bold text-lg md:text-2xl capitalize">{t("email")}</h3>
          <p>{profile?.email}</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 bg-background p-5 rounded-lg">
          <p className="text-2xl lg:text-3xl text-primary">
            <IoLocationOutline />
          </p>
          <h3 className="font-bold text-lg md:text-2xl capitalize">{t("address")}</h3>
          <p>
            {profile?.address.building} {profile?.address.street}{" "}
            {profile?.address.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
