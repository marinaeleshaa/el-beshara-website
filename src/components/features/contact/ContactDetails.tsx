"use client";
import ContactData from "@/data/ContactData";
import { profileSelector } from "@/redux/slices/ProfileSlice";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const ContactDetails = ({ className }: { className: string }) => {
  const { profile } = useSelector(profileSelector);
  return (
    <div className={`${className} rounded-lg bg-secondary/40`}>
      <div className="flex flex-col justify-evenly h-full  md:p-10 p-5 gap-5">
        <div className="w-full flex flex-col justify-center items-center gap-4 bg-background p-5 rounded-lg">
          <p className="text-2xl lg:text-3xl text-primary">
            <FaPhone />
          </p>
          <h3 className="font-bold text-lg md:text-2xl capitalize">
            Phone Number
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
          <h3 className="font-bold text-lg md:text-2xl capitalize">Email</h3>
          <p>{profile?.email}</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 bg-background p-5 rounded-lg">
          <p className="text-2xl lg:text-3xl text-primary">
            <IoLocationOutline />
          </p>
          <h3 className="font-bold text-lg md:text-2xl capitalize">Address</h3>
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
