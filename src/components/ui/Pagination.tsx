"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = (page: number) => console.log("Page:", page),
  maxVisible = 3,
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
// Demo Component
// export  function PaginationDemo() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 20;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-4">
//       <div className="max-w-4xl w-full">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
//             Smooth Pagination
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Click on any page number to navigate
//           </p>
//         </div>

//         {/* Content Area */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 mb-8">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-blue-500/30">
//               {currentPage}
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//               Page {currentPage} Content
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               This is the content for page {currentPage} of {totalPages}
//             </p>
//           </div>
//         </div>

//         {/* Pagination Component */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//           maxVisible={5}
//         />

//         {/* Quick Jump Controls */}
//         <div className="flex items-center justify-center gap-3 mt-8">
//           <button
//             onClick={() => setCurrentPage(1)}
//             className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 text-sm font-medium"
//           >
//             First Page
//           </button>
//           <button
//             onClick={() => setCurrentPage(Math.ceil(totalPages / 2))}
//             className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-200 text-sm font-medium"
//           >
//             Middle
//           </button>
//           <button
//             onClick={() => setCurrentPage(totalPages)}
//             className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 text-sm font-medium"
//           >
//             Last Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
