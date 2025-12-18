// components/features/dashboard/about/AboutForm.jsx
"use client";

import { JSX, useState } from "react";
import { X, Plus, Trash2, ChevronDown } from "lucide-react";
import { Facebook, Twitter, Instagram, Globe } from "lucide-react";
import MyBtn from "@/components/ui/MyBtn";
import {
  ILogo,
  IProfile,
  ISocialMedia,
  SocialOption,
} from "@/lib/Interfaces/AboutInterface";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React from "react";
import { CiEdit } from "react-icons/ci";

export const socialOptions: SocialOption[] = [
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "globe", label: "Website", icon: Globe },
];

export const getSocialIcon = (iconName: string): JSX.Element => {
  const option = socialOptions.find(
    (opt) => opt.value === iconName.toLowerCase()
  );
  const IconComponent = option ? option.icon : Globe;
  return <IconComponent className="w-5 h-5" />;
};

interface AboutFormProps {
  onClose: () => void;
  initialData: IProfile;
  onSave: (data: IProfile) => void;
}

const AboutForm = ({ onClose, initialData, onSave }: AboutFormProps) => {
  const [formData, setFormData] = useState<IProfile>(initialData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleInputChange = <K extends keyof IProfile>(
    field: K,
    value: IProfile[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = <K extends keyof IProfile["address"]>(
    field: K,
    value: IProfile["address"][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleAddPhone = () => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...formData.phoneNumbers];
    newPhones[index] = value;
    setFormData((prev) => ({ ...prev, phoneNumbers: newPhones }));
  };

  const handleRemovePhone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
    }));
  };

  const handleAddSocial = () => {
    const newSocial: ISocialMedia = {
      icon: "globe",
      url: "/",
      title: "Website",
    };

    setFormData((prev) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, newSocial],
    }));
  };

  const handleSocialChange = <K extends keyof ISocialMedia>(
    index: number,
    field: K,
    value: ISocialMedia[K]
  ) => {
    const newSocial = [...formData.socialMedia];
    newSocial[index] = { ...newSocial[index], [field]: value };

    if (field === "icon") {
      const option = socialOptions.find((opt) => opt.value === value);
      newSocial[index].title = option?.label || String(value);
    }

    setFormData((prev) => ({ ...prev, socialMedia: newSocial }));
  };

  const handleRemoveSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    setOpenDropdown(null);
  };

  const uploadedLogoRef = React.useRef<ILogo[]>([]);

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-secondary  p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-foreground cursor-pointer hover:text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className=" p-1 w-fit mx-auto">
            <CldImage
              src={formData.logo.public_id}
              alt="logo"
              width={200}
              height={200}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
            />
            <div className=" w-fit mx-auto">
              <CldUploadWidget
                signatureEndpoint="/api/cloudinary/signature"
                onSuccess={(result) => {
                  const info = result?.info;

                  if (
                    typeof info === "object" &&
                    info &&
                    info.resource_type === "image"
                  ) {
                    uploadedLogoRef.current.unshift(info);
                  }
                }}
                options={{
                  multiple: true,
                  showUploadMoreButton: true,
                  showCompletedButton: true,
                  resourceType: "image",
                  maxFiles: 10,
                  clientAllowedFormats: [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                    "svg",
                  ],
                }}
                onClose={() => {
                  if (uploadedLogoRef.current.length === 0) return;

                  uploadedLogoRef.current.forEach((info) => {
                    const logo: ILogo = {
                      url: info.secure_url!,
                      public_id: info.public_id,
                    };

                    setFormData((prev) => ({
                      ...prev,
                      logo: logo,
                    }));
                  });
                  uploadedLogoRef.current = [];
                  // Fix: Restore body overflow after Cloudinary widget closes
                  document.body.style.overflow = "unset";
                }}
                onError={(err) => console.log("Error:", err)}
              >
                {({ open }) => (
                  <button
                    className="bg-transparent capitalize  text-primary cursor-pointer hover:scale-105 transition duration-300 flex items-center gap-2"
                    onClick={() => open()}
                  >
                    edit logo
                    <CiEdit />
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground">
                Phone Numbers
              </label>
              <MyBtn
                onClick={handleAddPhone}
                variant="primary"
                outline
                className="flex items-center gap-1 text-sm "
              >
                <Plus className="w-4 h-4" />
                Add Phone
              </MyBtn>
            </div>
            <div className="space-y-2">
              {formData.phoneNumbers.map((phone: string, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Phone number"
                  />
                  {formData.phoneNumbers.length > 1 && (
                    <MyBtn
                      onClick={() => handleRemovePhone(index)}
                      className=""
                    >
                      <Trash2 className="w-5 h-5" />
                    </MyBtn>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Address
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                value={formData.address.building}
                onChange={(e) =>
                  handleAddressChange("building", parseInt(e.target.value) || 0)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Building"
              />
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Street"
              />
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="City"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground">
                Social Media
              </label>
              <MyBtn
                onClick={handleAddSocial}
                outline
                className="flex items-center gap-1 text-sm "
              >
                <Plus className="w-4 h-4" />
                Add Social
              </MyBtn>
            </div>
            <div className="space-y-3">
              {formData.socialMedia.map((social, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative w-40">
                    <MyBtn
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      width="full"
                      outline
                    >
                      <div className="flex items-center gap-2">
                        {getSocialIcon(social.icon)}
                        <span className="text-sm">{social.title}</span>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </MyBtn>
                    {openDropdown === index && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-secondary rounded-lg shadow-lg z-10">
                        {socialOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              onClick={() => {
                                handleSocialChange(index, "icon", option.value);
                                setOpenDropdown(null);
                              }}
                              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-foreground hover:text-background text-left"
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) =>
                      handleSocialChange(index, "url", e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="URL"
                  />
                  {formData.socialMedia.length > 1 && (
                    <MyBtn
                      onClick={() => handleRemoveSocial(index)}
                      className=""
                    >
                      <Trash2 className="w-5 h-5" />
                    </MyBtn>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-secondary  p-6 flex justify-end gap-3">
          <MyBtn
            onClick={onClose}
            variant="secondary"
            className="border border-foreground"
          >
            Cancel
          </MyBtn>
          <MyBtn onClick={handleSubmit} className="">
            Save Changes
          </MyBtn>
        </div>
      </div>
    </div>
  );
};

export default AboutForm;
