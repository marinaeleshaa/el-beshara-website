"use client";

import { useEffect, useState } from "react";
import AboutForm from "@/components/features/dashboard/about/AboutForm";
import AboutCard from "@/components/features/dashboard/about/aboutCard";
import { IProfile } from "@/lib/Interfaces/AboutInterface";
import { getAbout, UpdateAbout } from "@/lib/api/about";
import { Spinner } from "@/components/ui/spinner";

const AboutPage = () => {
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await getAbout();
        if (isMounted) setProfileData(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

 const handleSave = (newData: IProfile) => {
  // Helper to remove _id and __v recursively
  const cleanObject = (obj: any) => {
    if (Array.isArray(obj)) {
      return obj.map(cleanObject);
    } else if (typeof obj === "object" && obj !== null) {
      const newObj: any = {};
      for (const key in obj) {
        if (key !== "_id" && key !== "__v") {
          newObj[key] = cleanObject(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };

  const cleanedData = cleanObject(newData);

  setProfileData(newData);
  setIsFormOpen(false);
  UpdateAbout(cleanedData);
};


  if (isLoading || !profileData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-20 h-20" />
      </div>
    );
  }

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

export default AboutPage;
