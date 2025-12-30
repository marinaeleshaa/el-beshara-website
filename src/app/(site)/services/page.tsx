import ServicesLayout from "@/components/features/services/ServicesLayout";
import PageHero from "@/components/shared/PageHero";

export const metadata = {
  title: "Our Services | El-Beshara Charity",
  description:
    "Discover our charitable services: family support, education programs, and community outreach initiatives.",
};
const page = () => {
  return (
    <div>
      <PageHero />
      <ServicesLayout />
    </div>
  );
};

export default page;
