"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FaHome, FaImages } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import {
  RiAdminLine,
  RiDiscountPercentFill,
  RiFolderVideoFill,
} from "react-icons/ri";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

const DashboardSidebar = () => {
  // Get current pathname using Next.js hook
  const pathname = usePathname();
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const updateIsSuperAdmin = async () => {
      const value = Cookies.get("isSuperAdmin") === "true";
      setIsSuperAdmin(value);
    };

    updateIsSuperAdmin();
  }, []);

  const Items = [
    {
      title: "images",
      url: "/admin/images",
      icon: <FaImages />,
    },
    {
      title: "videos",
      url: "/admin/videos",
      icon: <RiFolderVideoFill />,
    },
    {
      title: "reels",
      url: "/admin/reels",
      icon: <BsFillCameraReelsFill />,
    },
    {
      title: "promotions",
      url: "/admin/promotions",
      icon: <RiDiscountPercentFill />,
    },
  ];

  // Helper function to check if a path is active
  const isPathActive = (url: string) => {
    return pathname === url;
  };

  return (
    <div>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <ModeToggle />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary text-md">
              <IoChevronBackCircleOutline className="mr-2" />
              Back to home
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={"Home"}
                    className="text-lg data-[active=true]:bg-primary data-[active=true]:text-primary-foreground group-data-[collapsible=icon]:justify-center"
                    isActive={isPathActive("/")}
                  >
                    <Link href={"/"} className="capitalize  group-data-[collapsible=icon]:pl-4!">
                      <span className="text-xl">
                        <FaHome />
                      </span>
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-primary text-md">
              <GrResources className="mr-2" />
              Resources
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="text-lg data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                      isActive={isPathActive(item.url)}
                    >
                      <Link href={item.url} className="capitalize  group-data-[collapsible=icon]:pl-1.5!">
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {isSuperAdmin && (
            <SidebarGroup className="space-y-1">
              <SidebarGroupLabel className="text-primary text-md my-3">
                <RiAdminLine className="mr-2" />
                Admins Management
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={"Admins"}
                      className="text-lg data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                      isActive={isPathActive("/admin/admins")}
                    >
                      <Link href={"/admin/admins"} className="group-data-[collapsible=icon]:pl-1!">
                        <span className="text-xl">
                          <MdAdminPanelSettings size={25} />
                        </span>
                        <span>Admins</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={"About"}
                      className="text-lg data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                      isActive={isPathActive("/admin/about")}
                    >
                      <Link href={"/admin/about"} className="group-data-[collapsible=icon]:pl-1!">
                        <span className="text-xl">
                          <HiOutlineInformationCircle size={25} />
                        </span>
                        <span>About</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;