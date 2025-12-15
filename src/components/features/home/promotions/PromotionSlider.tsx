import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowCircleRight, FaBullhorn, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PromotionCard from "../../dashboard/promotions/PromotionCard";
import { Spinner } from "@/components/ui/spinner";
import {
  getPromotionsAction,
  promotionsSelector,
} from "@/redux/slices/PromotionsSlice";
import { AppDispatch } from "@/redux/slices/Store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const PromotionSlider = () => {
  const { promotions, isLoading, meta } = useSelector(promotionsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("promotion.slider");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const fetchPromotions = useCallback(
    (page: number) => {
      dispatch(getPromotionsAction({ page, limit: 80 }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPromotions(meta.page);
  }, [fetchPromotions, meta.page]);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [checkScrollPosition, promotions]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

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
            <span>{t("stayTuned")}</span>
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col z-10 px-8 pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t("currentOffer")}
            </h2>
            <span className="text-sm text-white/80">
              {meta.total} {meta.total === 1 ? t("offer") : t("offers")}
            </span>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-primary text-xl" />
              </button>
            )}

            {/* Slider Container */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              className="flex overflow-x-scroll gap-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              {promotions.map((promotion) => (
                <div key={promotion._id}>
                  <PromotionCard {...promotion} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-primary text-xl" />
              </button>
            )}

            {/* Gradient Overlays for visual effect */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-10" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/30 to-transparent pointer-events-none z-10" />
            )}
          </div>

          {promotions.length > 4 && (
            <span className="text-light animate-bounce flex items-center justify-center gap-2 mt-10 text-center w-full duration-300">
              {t("scroll")} <FaArrowCircleRight />
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default PromotionSlider;