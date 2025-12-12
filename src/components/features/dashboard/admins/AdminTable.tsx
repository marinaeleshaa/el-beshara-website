"use client";

import { useCallback, useEffect, useState } from "react";
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
import Pagination from "@/components/ui/Pagination";

export default function AdminTable() {
  const { admins, isLoading, meta } = useSelector(adminsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // fetch data
  const fetchAdmins = useCallback(
    (page: number) => {
      dispatch(getAllAdminsAction({ page, limit: 5 }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAdmins(meta.page);
  }, [fetchAdmins, meta.page]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await dispatch(deleteAdminAction(id)).unwrap();
      fetchAdmins(meta.page); // refresh current page
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-20 h-20" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto ">
      <div className="bg-secondary/20 rounded-xl shadow-lg overflow-hidden border border-primary/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary/20">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary/20 divide-y divide-primary/10">
              {admins.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-foreground"
                  >
                    No admins found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-secondary/40 bg-secondary/20 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {admin.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <MyBtn
                        onClick={() => handleDelete(admin._id)}
                        text={deletingId === admin._id ? <Spinner /> : "Delete"}
                        icon={
                          deletingId === admin._id ? null : (
                            <Trash2 className="w-4 h-4" />
                          )
                        }
                        disabled={deletingId === admin._id}
                        className="ml-auto"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {admins.length > 0 && (
          <div className="bg-secondary/10 px-6 py-4 border-t border-primary/10">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={(page) => fetchAdmins(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
