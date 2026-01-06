import React from "react";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import ContactLocation from "./ContactLocation";

const contactLayout = () => {
  return (
    <div className="w-myWidth mx-auto">
      <div className="grid gap-15 grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
        <ContactForm className="w-full col-span-1  lg:col-span-2"/>
        <ContactDetails className="w-full " />
        <ContactLocation className="col-span-1 md:col-span-2 lg:col-span-3 h-[40vh]" />
      </div>
    </div>
  );
};

export default contactLayout;
