// components/navbar/Navbar.tsx (SERVER)

import { getAbout } from "@/lib/api/about";
import { getTranslations } from "next-intl/server";
import NavbarClient from "./NavbarClient";
import { IsProfile } from "@/lib/guards/IsProfile";
import { IProfile } from "@/lib/Interfaces/AboutInterface";

interface NavbarProps {
  className?: string;
}

const Navbar = async ({ className }: NavbarProps) => {
  const profile = await getAbout();
  const t = await getTranslations("common");

  const menu = t.raw("menu");

  // ! just till the api is ready
  const safeProfile = IsProfile(profile)
  ? profile
  : ({
      logo: "/nav-logo.png",
      socialMedia: [],
      email: "",
      phoneNumbers: [],
      address: {
        building: "",
        street: "",
        city: "",
      },
    } as unknown as IProfile);
  // if(!IsProfile(profile)) return null;
  return (
    <NavbarClient
      profile={safeProfile}
      menu={menu}
      studioName={t("studioName")}
      className={className}
    />
  );
};

export default Navbar;
