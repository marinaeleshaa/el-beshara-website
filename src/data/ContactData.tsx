import React, { ReactNode } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
interface IContactData {
  icon: ReactNode;
  title: string;
  info: string;
}

const ContactData = (): IContactData[] => {
  return [
    {
      icon: <FaPhoneAlt />,
      title: "Phone Number",
      info: "+1 234 567 890",
    },
    {
      icon: <HiOutlineMail />,
      title: "Email",
      info: "9Dv5e@example.com",
    },
    {
      icon: <IoLocationOutline />,
      title: "Address",
      info: "123 Main Street, City, Country",
    },
  ];
};

export default ContactData;
