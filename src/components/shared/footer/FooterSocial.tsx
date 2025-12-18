"use client";
import { getProfileDataAction, profileSelector } from "@/redux/slices/ProfileSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
export const socialOptions = [
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "globe", label: "Website", icon: Globe },
];

export const getSocialIcon = (iconName: string) => {
  const option = socialOptions.find(
    (opt) => opt.value === iconName.toLowerCase()
  );
  const IconComponent = option ? option.icon : Globe;
  return <IconComponent className="w-5 h-5" />;
};
const FooterSocial = () => {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const { profile } = useSelector(profileSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProfileDataAction());
  }, [dispatch]);

  return (
    <div className="space-y-4 text-left sm:text-center">
      <h3 className="text-2xl font-bold text-white">{tCommon("studioName")}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {tFooter("studioSlogan")}
      </p>
      <div className="flex sm:justify-center gap-3 pt-2">
        {/* <Link
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
        </Link> */}

        {profile.socialMedia.map((social) => (
          <Link
            href={social.url}
            key={social.title}
            className="w-10 h-10 bg-secondary text-secondary-foreground dark:bg-dark hover:text-primary-foreground dark:hover:bg-primary hover:scale-120  rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300"
          >
            {getSocialIcon(social.title)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;
