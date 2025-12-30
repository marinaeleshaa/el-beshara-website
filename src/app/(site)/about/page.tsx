import AboutLayout from "@/components/features/about/AboutLayout";
import PageHero from "@/components/shared/PageHero";

export const metadata = {
  title: "About Us | El-Beshara Charity",
  description:
    "Learn about our mission to serve the community with faith-based charitable programs and support services.",
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
