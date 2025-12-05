import ServicesLayout from "@/components/features/services/ServicesLayout";
import PageHero from "@/components/shared/PageHero";

export const metadata = {
  title: "Services | El-Beshara Studio",
  description: "Creating amazing musical experiences for the world.",
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
