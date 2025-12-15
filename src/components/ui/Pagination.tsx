"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = (page: number) => console.log("Page:", page),
  maxVisible = 4,
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setActivePage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      let start = Math.max(2, activePage - 1);
      let end = Math.min(totalPages - 1, activePage + 1);

      // Adjust if we're near the start
      if (activePage <= 3) {
        end = Math.min(maxVisible - 1, totalPages - 1);
      }

      // Adjust if we're near the end
      if (activePage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxVisible + 2);
      }

      // Add ellipsis before middle section
      if (start > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle section
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-8">
      <div className="flex  items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className={`
          group relative flex items-center justify-center w-10 h-10 rounded-xl
          transition-all duration-300 ease-out
          ${
            activePage === 1
              ? "bg-secondary/80 text-secondary-foreground/30 cursor-not-allowed"
              : "bg-secondary cursor-pointer text-secondary-foreground hover:bg-linear-to-br hover:from-primary/80 hover:to-dark/80 hover:text-white  hover:-translate-y-0.5 active:translate-y-0"
          }
          border border-secondary
        `}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {pageNumbers.map((page, index) => {
            if (typeof page === "string" && page.startsWith("ellipsis")) {
              return (
                <div
                  key={page}
                  className="flex items-center justify-center w-10 h-10 text-primary"
                >
                  <MoreHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              );
            }

            const isActive = page === activePage;

            return (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page as number)}
                className={`
                relative flex items-center justify-center w-10 h-10 rounded-xl
                font-semibold text-sm
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "bg-linear-to-br from-primary to-dark text-white  scale-110"
                    : "bg-secondary/50  text-secondary-foreground hover:bg-linear-to-br hover:from-primary/10 hover:to-secondary/10 hover:scale-105 hover:-translate-y-0.5 active:translate-y-0"
                }
                border border-secondary 
                hover:border-primary/30 
              `}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active page glow effect */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-linear-to-br from-primary to-secondary opacity-20 blur-md animate-pulse" />
                )}
                <span className="relative z-10">{page}</span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className={`
          group relative flex items-center justify-center w-10 h-10 rounded-xl
          transition-all duration-300 ease-out
          ${
            activePage === totalPages
              ? "bg-secondary/80 text-secondary-foreground/30 cursor-not-allowed"
              : "bg-secondary cursor-pointer text-secondary-foreground hover:bg-linear-to-br hover:from-primary/80 hover:to-dark/80 hover:text-white  hover:-translate-y-0.5 active:translate-y-0"
          }
          border border-secondary
        `}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Page Info */}
      <div className="ml-4 text-sm text-foreground font-medium">
        <span className="">Page </span>
        <span className="text-primary font-bold">{activePage}</span>
        <span className="mx-1">/</span>
        <span>{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
