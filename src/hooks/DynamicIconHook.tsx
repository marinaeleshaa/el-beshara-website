"use client";
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";

const DynamicIcon = ({ iconName }: { iconName: string }) => {
  const [Icon, setIcon] = useState<React.ElementType | null>(null);

  useEffect(() => {
    // Try importing from different FontAwesome libraries
    const importIcon = async () => {
      try {
        // Try from react-icons/fa6 first (for FaVolumeUp, FaMicrophoneAlt, etc.)
        const { [iconName as keyof typeof import("react-icons/fa6")]: icon } =
          await import("react-icons/fa6");
        if (icon) {
          setIcon(() => icon);
          return;
        }
      } catch (error) {
        console.log(`Icon ${iconName} not found in fa6`);
      }

      try {
        // Try from react-icons/fa
        const { [iconName as keyof typeof import("react-icons/fa")]: icon } =
          await import("react-icons/fa");
        if (icon) {
          setIcon(() => icon);
          return;
        }
      } catch (error) {
        console.log(`Icon ${iconName} not found in fa`);
      }

      try {
        // Try from react-icons/fa
        const { [iconName as keyof typeof import("react-icons/hi")]: icon } =
          await import("react-icons/hi");
        if (icon) {
          setIcon(() => icon);
          return;
        }
      } catch (error) {
        console.log(`Icon ${iconName} not found in fa`);
      }
      try {
        // Try from react-icons/fa
        const { [iconName as keyof typeof import("react-icons/io5")]: icon } =
          await import("react-icons/io5");
        if (icon) {
          setIcon(() => icon);
          return;
        }
      } catch (error) {
        console.log(`Icon ${iconName} not found in fa`);
      }
      // Fallback to a default icon
      const { FaQuestion } = await import("react-icons/fa6");
      setIcon(() => FaQuestion);
    };

    importIcon();
  }, [iconName]);

  if (!Icon) return <FaQuestion />; // Return placeholder while loading
  return <Icon />;
};

export default DynamicIcon;
