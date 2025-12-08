import DashboardSidebar from "@/components/features/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarTrigger />
        <div className="my-10 w-[80%] mx-auto ">{children}</div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
