"use client";

import { Mail, Phone, MapPin, Edit2 } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import MyBtn from "@/components/ui/MyBtn";
import Link from "next/link";
import { IProfile } from "@/lib/Interfaces/AboutInterface";
import { CldImage } from "next-cloudinary";

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

const AboutCard = ({
  data,
  onEdit,
}: {
  data: IProfile;
  onEdit?: () => void;
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section with Background Pattern */}
      <div className="bg-secondary rounded-t-2xl  relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        {onEdit && (
          <MyBtn
            onClick={onEdit}
            className="absolute top-6 right-6 z-10 flex items-center gap-2 shadow-md"
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-sm font-medium">Edit</span>
          </MyBtn>
        )}

        {/* Profile Header */}
        <div className="relative pt-12 pb-8 px-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              <CldImage
                src={data.logo.public_id}
                alt="logo"
                width={200}
                height={200}
                className="relative w-40 h-40 rounded-full object-cover border-4 border-primary shadow-xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
              El-Beshara Studio
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="bg-secondary rounded-b-2xl shadow-lg p-6 -mt-2">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Email Card */}
          <div className="group bg-background/50 hover:bg-background border border-primary/20 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-primary/40">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                  Email
                </h3>
                <a
                  href={`mailto:${data.email}`}
                  className="text-primary hover:underline font-medium break-all"
                >
                  {data.email}
                </a>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="group bg-background/50 hover:bg-background border border-primary/20 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-primary/40">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                  Phone
                </h3>
                <div className="space-y-1">
                  {data.phoneNumbers.map((phone: string, index: number) => (
                    <Link
                      key={index}
                      href={`tel:${phone}`}
                      className="block text-primary hover:underline font-medium"
                    >
                      {phone}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Address Card - Full Width */}
          <div className="group bg-background/50 hover:bg-background border border-primary/20 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-primary/40 md:col-span-2">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                  Address
                </h3>
                <p className="text-foreground/80 font-medium text-lg">
                  {data.address.building} {data.address.street},{" "}
                  {data.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        {data.socialMedia.length > 0 && (
          <div className="mt-6 pt-6 border-t border-primary/20">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="h-6 w-1 bg-primary rounded-full"></span>
              Connect With Us
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.socialMedia.map((social, index: number) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center space-x-3 px-5 py-3 bg-background/50 hover:bg-primary border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                  title={social.title}
                >
                  <div className="text-primary group-hover:text-primary-foreground transition-colors">
                    {getSocialIcon(social.icon)}
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary-foreground transition-colors">
                    {social.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutCard;
