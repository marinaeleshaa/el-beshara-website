"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import MyBtn from "@/components/ui/MyBtn";

export default function AdminTable() {
  const [admins, setAdmins] = useState([
    { id: 1, email: "admin@example.com" },
    { id: 2, email: "john.doe@company.com" },
    { id: 3, email: "sarah.smith@business.com" },
    { id: 4, email: "mike.jones@enterprise.com" },
  ]);

  const handleDelete = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <div className="">
      <div className=" max-w-5xl mx-auto">
        <div className="bg-secondary/20 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-primary">
            <thead className="bg-dark dark:bg-secondary text-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary/20 divide-y divide-primary/50">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-secondary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <MyBtn
                      onClick={() => handleDelete(admin.id)}
                      variant="primary"
                      outline
                      text="Delete"
                      className="ml-auto"
                      icon={<Trash2 className="w-4 h-4 mr-1" />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
