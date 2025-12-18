"use client";
import { getProfileDataAction, profileSelector } from "@/redux/slices/ProfileSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FooterContact = () => {
  const tFooter = useTranslations("footer");
  const { profile } = useSelector(profileSelector);
    const dispatch = useDispatch<AppDispatch>();
  
   useEffect(() => {
      dispatch(getProfileDataAction());
   
    }, [dispatch]);
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white">
        {tFooter("contactUs")}
      </h4>
      <div className="space-y-3 text-sm text-gray-400">
        <p>
          {profile.address.building} {profile.address.street}
        </p>
        <p>{profile.address.city}, Egypt</p>
        <p>{profile.email}</p>
        <ul>
          {profile.phoneNumbers.map((number: string, index: number) => (
            <li key={index}>{number}</li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
};

export default FooterContact;
