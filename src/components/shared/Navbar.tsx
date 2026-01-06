// components/navbar/Navbar.tsx (SERVER)

import { getAbout } from "@/lib/api/about";
import { getTranslations } from "next-intl/server";
import NavbarClient from "./NavbarClient";
import { IsProfile } from "@/lib/guards/IsProfile";

interface NavbarProps {
  className?: string;
}

const Navbar = async ({ className }: NavbarProps) => {
  const profile = await getAbout();
  const t = await getTranslations("common");

  const menu = t.raw("menu");
  if(!IsProfile(profile)) return null;
  return (
    <NavbarClient
      profile={profile}
      menu={menu}
      studioName={t("studioName")}
      className={className}
    />
  );
};

export default Navbar;
