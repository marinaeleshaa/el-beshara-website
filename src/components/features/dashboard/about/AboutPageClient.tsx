"use client";

import { useState } from "react";
import { IProfile } from "@/lib/Interfaces/AboutInterface";
import AboutForm from "./AboutForm";
import AboutCard from "./aboutCard";
import { UpdateAbout } from "@/lib/api/about";

interface Props {
  initialData: IProfile;
}

const AboutPageClient = ({ initialData }: Props) => {
  const [profileData, setProfileData] = useState<IProfile>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSave = async (newData: IProfile) => {
    const cleanObject = <T,>(obj: T): T => {
      if (Array.isArray(obj)) {
        return obj.map((item) => cleanObject(item)) as unknown as T;
      } else if (obj && typeof obj === "object") {
        const newObj = {} as T;
        (Object.keys(obj) as (keyof T)[]).forEach((key) => {
          if (key !== "_id" && key !== "__v") {
            newObj[key] = cleanObject(obj[key]);
          }
        });
        return newObj;
      }
      return obj;
    };

    const cleanedData = cleanObject(newData);

    await UpdateAbout(cleanedData);

    // Update client state
    setProfileData(newData);
    setIsFormOpen(false);
  };

  return (
    <div>
      <AboutCard data={profileData} onEdit={() => setIsFormOpen(true)} />
      {isFormOpen && (
        <AboutForm
          onClose={() => setIsFormOpen(false)}
          initialData={profileData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AboutPageClient;
