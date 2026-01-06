import ContactLayout from "@/components/features/contact/ContactLayout";
import PageHero from "@/components/shared/PageHero";
import React from "react";

export const metadata = {
  title: "Contact Us | El-Beshara Charity",
  description:
    "Get in touch to learn more about our charitable work, volunteer opportunities, or request assistance.",
};
const page = () => {
  return (
    <div className="space-y-10">
      <PageHero />
      <ContactLayout />
    </div>
  );
};

export default page;
