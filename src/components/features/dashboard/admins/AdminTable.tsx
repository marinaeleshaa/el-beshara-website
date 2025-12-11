"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import MyBtn from "@/components/ui/MyBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  adminsSelector,
  deleteAdminAction,
  getAllAdminsAction,
} from "@/redux/slices/AdminsSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { Spinner } from "@/components/ui/spinner";

export default function AdminTable() {
  const { admins, isLoading } = useSelector(adminsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllAdminsAction());
    return () => {};
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await dispatch(deleteAdminAction(id)).unwrap();
    } finally {
      setDeletingId(null); 
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="">
      <div className=" max-w-4xl mx-auto">
        <div className="bg-secondary/20 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-primary">
            <thead className="bg-dark dark:bg-secondary text-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  user Name
                </th>
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
                <tr key={admin._id} className="hover:bg-secondary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {admin.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <MyBtn
                      onClick={() => handleDelete(admin._id)}
                      variant="primary"
                      outline
                      text={deletingId === admin._id ? <Spinner /> : "Delete"}
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
