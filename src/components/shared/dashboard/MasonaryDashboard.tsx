"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    return (
      values[queries.findIndex((q) => window.matchMedia(q).matches)] ??
      defaultValue
    );
  };

  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setValue(get());

    const handler = () => setValue(get());
    queries.forEach((q) =>
      window.matchMedia(q).addEventListener("change", handler)
    );
    return () =>
      queries.forEach((q) =>
        window.matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  type?: "image" | "video";
  poster?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryDashboardProps {
  items: Item[];
  onRemove?: (id: string) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  mediaType?: "image" | "video";
}

const MasonryDashboard: React.FC<MasonryDashboardProps> = ({
  items,
  onRemove,
  onSelectionChange,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  mediaType = "image",
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [popupMedia, setPopupMedia] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"];
      direction = dirs[
        Math.floor(Math.random() * dirs.length)
      ] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    if (mediaType === "image") {
      preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
    } else {
      setImagesReady(true);
    }
  }, [items, mediaType]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    e.stopPropagation();
    const newSelectedIds = new Set(selectedIds);
    if (e.target.checked) {
      newSelectedIds.add(id);
    } else {
      newSelectedIds.delete(id);
    }
    setSelectedIds(newSelectedIds);
    if (onSelectionChange) {
      onSelectionChange(Array.from(newSelectedIds));
    }
  };

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map((item) => item.y + item.h)) + 16;
  }, [grid]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: containerHeight }}
      >
        {grid.map((item) => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content group"
            style={{
              willChange: "transform, width, height, opacity",
              width: item.w,
              height: item.h,
              transform: `translate(${item.x}px, ${item.y}px)`,
            }}
            onClick={() => setPopupMedia(item.img)}
            onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
          >
            {mediaType === "image" ? (
              <div
                className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px] cursor-pointer"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                {colorShiftOnHover && (
                  <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
                )}

                {/* Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemove(e, item.id)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500/80 hover:bg-red-600 rounded-full text-white cursor-pointer text-lg font-bold transition-colors duration-200 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Remove item"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] overflow-hidden cursor-pointer">
                <video
                  src={item.img}
                  poster={item.poster}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
                {colorShiftOnHover && (
                  <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
                )}

                {/* Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemove(e, item.id)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500/80 hover:bg-red-600 rounded-full text-white cursor-pointer text-lg font-bold transition-colors duration-200 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Remove item"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {popupMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => {
            setPopupMedia(null);
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }}
        >
          <button
            onClick={() => {
              setPopupMedia(null);
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full cursor-pointer text-white text-2xl font-light transition-colors duration-200 z-10"
            aria-label="Close popup"
          >
            <RiCloseLargeLine />
          </button>
          {mediaType === "image" ? (
            <img
              src={popupMedia}
              alt="Popup view"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              ref={videoRef}
              src={popupMedia}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MasonryDashboard;
