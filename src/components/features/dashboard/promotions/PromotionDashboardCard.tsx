import { Calendar, Clock, Edit, Trash2 } from "lucide-react";
import MyBtn from "@/components/ui/MyBtn";
import { deletePromotionMethod } from "@/lib/api/promotions";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { is } from "zod/v4/locales";

const PromotionDashboardCard = ({
  _id = "promo-001",
  title = "Summer Sale",
  description = "Get 50% off on all items. Limited time offer!",
  validFrom = "2025-12-11T21:31:11.838Z",
  validTo = "2025-12-31T23:59:59.999Z",
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isActive = () => {
    const now = new Date();
    const start = new Date(validFrom);
    const end = new Date(validTo);
    return now >= start && now <= end;
  };

  const getStatus = () => {
    const now = new Date();
    const start = new Date(validFrom);
    const end = new Date(validTo);

    if (now < start)
      return { label: "Scheduled", color: "bg-blue-100 text-blue-800" };
    if (now > end)
      return { label: "Expired", color: "bg-gray-100 text-gray-800" };
    return { label: "Active", color: "bg-green-100 text-green-800" };
  };

  const status = getStatus();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deletePromotionMethod(_id);
    setIsDeleting(false);
  };

  return (
    <div className="bg-secondary/40 rounded-lg shadow-md border border-background hover:shadow-lg transition-shadow duration-200">
      <div className="p-5 flex flex-col h-full  ">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${status.color}`}
              >
                {status.label}
              </span>
            </div>
            {/* <p className="text-sm text-foreground/80 mb-3">ID: {_id}</p> */}
          </div>
        </div>

        <div className="flex-2">
          <p className=" text-sm mb-4 line-clamp-2 ">{description}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-foreground/70">
            <Calendar className="w-3.5 h-3.5 mr-2 text-blue-500" />
            <span className="font-medium mr-2">From:</span>
            <span>{formatDate(validFrom)}</span>
          </div>

          <div className="flex items-center text-xs text-foreground/70">
            <Clock className="w-3.5 h-3.5 mr-2 text-primary" />
            <span className="font-medium mr-2">To:</span>
            <span>{formatDate(validTo)}</span>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-foreground/10  ">
          <MyBtn
            text="Edit"
            icon={<Edit className="w-4 h-4" />}
            variant="dark"
            className="flex-1 dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-light-foreground"
            outline
          />
          <MyBtn
            text={isDeleting ? <Spinner /> : "Delete"}
            onClick={handleDelete}
            icon={isDeleting ? null : <Trash2 className="w-4 h-4" />}
            variant="primary"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionDashboardCard;
