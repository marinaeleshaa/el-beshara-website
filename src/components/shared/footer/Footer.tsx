import { MenuItem } from "@/lib/Interfaces/ServiceInterface";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,

  FaWhatsapp,
} from "react-icons/fa";
import FooterContact from "./FooterContact";
import FooterSocial from "./FooterSocial";

const Footer = () => {
   const tCommon = useTranslations("common");
    const menu = tCommon.raw("menu") as MenuItem[];
    const tFooter = useTranslations("footer");
  return (
    <footer className="bg-dark dark:bg-secondary text-dark-foreground">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-5">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1  sm:grid-cols-3 gap-12 ">
          {/* Company Info */}
          <FooterSocial />

          {/* Quick Links */}
          <div className="flex sm:justify-center">

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{tFooter("quickLinks")}</h4>
            <ul className="space-y-3 ">
              {menu.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    className="text-light hover:text-primary hover:pl-2 inline-block transition-all duration-300"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>

          {/* Contact Info (Optional third column) */}
          <div className="flex sm:justify-center">

         <FooterContact />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent "></div>

        {/* Bottom Bar */}
        <div className="flex flex-row justify-center items-center  text-sm text-light">
          <p>© 2024 El-Beshara Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
