import { IProfile } from "@/lib/Interfaces/AboutInterface";
import { getAbout } from "@/lib/api/about";
import AboutPageClient from "@/components/features/dashboard/about/AboutPageClient";

const AboutPage = async () => {
  const profileData = (await getAbout()) as IProfile;

  return <AboutPageClient initialData={profileData} />;
};

export default AboutPage;
