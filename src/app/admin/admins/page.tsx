import AddAdminForm from "@/components/features/dashboard/admins/AddAdminForm";
import AdminTable from "@/components/features/dashboard/admins/AdminTable";
import DashboardHero from "@/components/shared/dashboard/DashboardHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoPersonAdd } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

export const metadata = {
  title: "Admins | Admin | El-Beshara Studio",
  description: "Creating amazing musical experiences for the world.",
};

const page = () => {
  return (
    <div>
      <DashboardHero />
      <Tabs defaultValue="admins">
        <TabsList className="mb-10 w-fit mx-auto flex gap-10">
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <RiAdminFill />
            Admins
          </TabsTrigger>
          <TabsTrigger value="form" className="flex items-center gap-2">
            <IoPersonAdd />
            Add Admin
          </TabsTrigger>
        </TabsList>
        <TabsContent value="admins">
          <AdminTable />
        </TabsContent>
        <TabsContent value="form">
          <AddAdminForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
