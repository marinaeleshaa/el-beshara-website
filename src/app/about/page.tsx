import AboutLayout from "@/components/features/about/AboutLayout";
import PageHero from "@/components/shared/PageHero";

export const metadata = {
  title: "About | El-Beshara Studio",
  description: "Creating amazing musical experiences for the world.",
};
const page = () => {
  return (
    <div className="space-y-20">
      <PageHero />
      <AboutLayout />
    </div>
  );
};

export default page;
