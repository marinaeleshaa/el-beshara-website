import { NavMenuItems } from "@/data/NavMenuItems";
import { MenuItem } from "@/lib/Interfaces/ServiceInterface";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,

  FaWhatsapp,
} from "react-icons/fa";

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
          <div className="space-y-4 text-left sm:text-center">
            <h3 className="text-2xl font-bold text-white">{tCommon("studioName")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
             {tFooter("studioSlogan")}
            </p>
            <div className="flex sm:justify-center gap-3 pt-2">
              <Link
                href="#"
                className="w-10 h-10 bg-secondary text-secondary-foreground dark:bg-dark hover:text-primary-foreground dark:hover:bg-primary hover:scale-120  rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-secondary text-secondary-foreground dark:bg-dark hover:text-primary-foreground dark:hover:bg-primary hover:scale-120  rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-secondary text-secondary-foreground dark:bg-dark hover:text-primary-foreground dark:hover:bg-primary hover:scale-120  rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </Link>
            </div>
          </div>

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

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{tFooter("contactUs")}</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>123 Music Street</p>
              <p>Cairo, Egypt</p>
              <p>contact@yourbrand.com</p>
              <p>+20 123 456 7890</p>
            </div>
          </div>
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
