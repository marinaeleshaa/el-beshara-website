import React from "react";
import { Calendar, Clock, Sparkles, TrendingUp } from "lucide-react";
import MyBtn from "@/components/ui/MyBtn";
import { CiDiscount1 } from "react-icons/ci";

const PromotionCard = ({
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
    });
  };

  const isActive = () => {
    const now = new Date();
    const start = new Date(validFrom);
    const end = new Date(validTo);
    return now >= start && now <= end;
  };

  const getDaysRemaining = () => {
    const now = new Date();
    const end = new Date(validTo);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="group relative w-full h-full bg-secondary rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative flex flex-col h-full">
        {/* Header Section */}
        <div className="p-5 pb-4 border-b border-primary/10">
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Icon */}
            <div className="flex-shrink-0 p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
              <CiDiscount1 className="w-5 h-5 text-primary dark:text-light" />
            </div>
            
            {/* Badges Container */}
            <div className="flex flex-wrap items-center gap-2 justify-end">
              {isActive() && (
                <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Active
                </span>
              )}
              
              {isActive() && getDaysRemaining() > 0 && (
                <span className="flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-amber-200">
                  <TrendingUp className="w-3 h-3" />
                  {getDaysRemaining()}d left
                </span>
              )}
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 pt-4 flex flex-col">
          {/* Description */}
          <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4">
            {description}
          </p>

          {/* Date Range */}
          <div className="flex items-center gap-2 text-xs text-foreground/60 mb-4">
            <Calendar className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <span className="truncate">{formatDate(validFrom)}</span>
            <span className="flex-shrink-0">→</span>
            <Clock className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <span className="truncate">{formatDate(validTo)}</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />
        </div>

        {/* Footer Section */}
        <div className="p-5 pt-0">
          <MyBtn text="Apply" href={`/contact`} variant="primary" width="full" />
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;