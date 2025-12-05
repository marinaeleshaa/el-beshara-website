import { redirect } from "next/navigation";

export const metadata = {
  title: "Gallery | El-Beshara Studio",
  description: "Creating amazing musical experiences for the world.",
}

const page = () => {
   redirect("/gallery/images");
};

export default page;
