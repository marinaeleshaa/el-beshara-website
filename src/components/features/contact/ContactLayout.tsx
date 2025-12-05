import React from "react";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import ContactLocation from "./ContactLocation";

const contactLayout = () => {
  return (
    <div className="max-w-[70%] mx-auto">
      <div className="grid gap-15 grid-cols-1  md:grid-cols-2">
        <ContactForm className="w-full "/>
        <ContactDetails className="w-full " />
        <ContactLocation className="col-span-1 md:col-span-2 h-[40vh] bg-amber-800" />
      </div>
    </div>
  );
};

export default contactLayout;
