import React from "react";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import ContactLocation from "./ContactLocation";

const contactLayout = () => {
  return (
    <div className="w-myWidth mx-auto">
      <div className="flex flex-col gap-15  ">
        <div className="flex flex-col md:flex-row gap-15">

        <ContactForm className="w-full md:w-2/3 "/>
        <ContactDetails className="w-full md:w-1/3  " />
        </div>
        <ContactLocation className=" h-[40vh]" />
      </div>
    </div>
  );
};

export default contactLayout;
