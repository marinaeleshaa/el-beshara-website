"use client";
import {
  getPromotionsAction,
  promotionsSelector,
} from "@/redux/slices/PromotionsSlice";
import PromotionDashboardCard from "./PromotionDashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "@/redux/slices/Store";
import { Spinner } from "@/components/ui/spinner";
import Pagination from "@/components/ui/Pagination";
import EditPromotionForm from "./EditPromotionForm";
import { IPromotionInterface } from "@/lib/Interfaces/PromotionInterface";

const PromotionSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<IPromotionInterface >({
    _id: "",
    title: "",
    description: "",
    validFrom: "",
    validTo: "",
  });
  const { promotions, isLoading, meta } = useSelector(promotionsSelector);
  const dispatch = useDispatch<AppDispatch>();

  const fetchPromotions = useCallback(
    (page: number) => {
      dispatch(getPromotionsAction({ page, limit: 6 }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPromotions(meta.page);
  }, [fetchPromotions, meta.page]);

  const handleEdit = (promotion:IPromotionInterface) => {
    setSelectedPromotion(promotion);
    setIsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-20 h-20" />
      </div>
    );
  }

  if (!isLoading && promotions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-2xl font-bold">No Promotions Found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {promotions.map((promotion) => (
          <PromotionDashboardCard onEdit={() => handleEdit(promotion)} {...promotion} key={promotion._id} />
        ))}
      </div>

      {meta.totalPages > 0 && (
        <Pagination
          totalPages={meta.totalPages}
          currentPage={meta.page}
          onPageChange={fetchPromotions}
        />
      )}
      <EditPromotionForm isOpen={isOpen} setIsOpen={setIsOpen} onEdit={() => {}} selectedPromotion={selectedPromotion} />
    </div>
  );
};

export default PromotionSection;
