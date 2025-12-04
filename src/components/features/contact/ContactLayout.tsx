import React from "react";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import ContactLocation from "./ContactLocation";

const contactLayout = () => {
  return (
    <div className="max-w-[80%] mx-auto">
      <div className="grid gap-5 grid-cols-1 grid-rows-auto md:grid-rows-2 md:grid-cols-2">
        <ContactForm className="w-full bg-primary"/>
        <ContactDetails className="w-full bg-secondary" />
        <ContactLocation className="col-span-1 md:col-span-2 bg-amber-800" />
      </div>
    </div>
  );
};

export default contactLayout;
