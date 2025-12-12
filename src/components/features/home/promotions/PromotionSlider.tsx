import React, { useCallback, useEffect } from "react";
import { FaArrowCircleRight, FaBullhorn } from "react-icons/fa";
import PromotionCard from "../../dashboard/promotions/PromotionCard";
import { Spinner } from "@/components/ui/spinner";
import {
  getPromotionsAction,
  promotionsSelector,
} from "@/redux/slices/PromotionsSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { useDispatch, useSelector } from "react-redux";

const PromotionSlider = () => {
  const { promotions, isLoading, meta } = useSelector(promotionsSelector);
  const dispatch = useDispatch<AppDispatch>();

  const fetchPromotions = useCallback(
    (page: number) => {
      dispatch(getPromotionsAction({ page, limit: 80 }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPromotions(meta.page);
  }, [fetchPromotions, meta.page]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-20 h-20 text-light" />
      </div>
    );
  }

  return (
    <>
      {promotions.length === 0 ? (
        <div className="flex items-center justify-center min-h-[100px] px-8 pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-16">
          <p className="text-3xl md:text-5xl font-bold text-light flex gap-2 items-center">
            <FaBullhorn />
            <span>Stay Tuned</span>
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col z-10 px-8 pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Current Promotions
            </h2>
            <span className="text-sm text-white/80">
              {meta.total} {meta.total === 1 ? "offer" : "offers"}
            </span>
          </div>

          <div className="flex overflow-x-scroll gap-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {promotions.map((promotion) => (
              <div key={promotion._id}>
                <PromotionCard {...promotion} />
              </div>
            ))}
          </div>

          {promotions.length > 4 && (
            <span className="text-light animate-bounce flex items-center justify-center gap-2 mt-10 text-center w-full duration-300">
              scroll to show more <FaArrowCircleRight />
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default PromotionSlider;
