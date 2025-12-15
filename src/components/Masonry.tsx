"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex((q) => window.matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setValue(get());
    
    const handler = () => setValue(get());
    queries.forEach((q) => window.matchMedia(q).addEventListener("change", handler));
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

interface MediaItem {
  _id: string;
  url: string;
  public_id: string;
  type: "image" | "video" | "audio";
  created_by: string;
}

interface GridItem extends MediaItem {
  x: number;
  y: number;
  w: number;
  h: number;
  height: number;
}

interface MasonryProps {
  items: MediaItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
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
  const [popupMedia, setPopupMedia] = useState<MediaItem | null>(null);

  // Generate random heights for items (stable across re-renders)
  const itemHeights = useMemo(() => {
    const heights = new Map<string, number>();
    const possibleHeights = [200, 250, 300, 350, 400, 450, 500];
    
    items.forEach((item) => {
      // Audio items get a fixed smaller height
      if (item.type === "audio") {
        heights.set(item._id, 150);
        return;
      }
      
      // Use item._id as seed for consistent random heights
      const seed = item._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const randomIndex = seed % possibleHeights.length;
      const height = possibleHeights[randomIndex];
      heights.set(item._id, height);
    });
    return heights;
  }, [items]);

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
    setImagesReady(true);
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = itemHeights.get(child._id) || 300;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height, height };
    });
  }, [columns, items, width, itemHeights]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item._id}"]`;
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

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map((item) => item.y + item.h)) + 16;
  }, [grid]);

  const renderMedia = (item: MediaItem) => {
    switch (item.type) {
      case "image":
        return (
          <CldImage
            src={item.public_id}
            alt="Media"
            fill
            className="object-cover rounded-[10px]"
            sizes="(max-width: 400px) 100vw, (max-width: 600px) 50vw, (max-width: 1000px) 33vw, (max-width: 1500px) 25vw, 20vw"
          />
        );
      case "video":
        return (
          <div className="w-full h-full rounded-[10px] overflow-hidden">
            <CldVideoPlayer
              src={item.public_id}
              width="1920"
              height="1080"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case "audio":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-[10px] p-4">
            <audio
              src={item.url}
              controls
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: containerHeight }}
      >
        {grid.map((item) => (
          <div
            key={item._id}
            data-key={item._id}
            className="absolute box-content"
            style={{
              willChange: "transform, width, height, opacity",
              width: item.w,
              height: item.h,
              transform: `translate(${item.x}px, ${item.y}px)`,
            }}
            onClick={() => setPopupMedia(item)}
            onMouseEnter={(e) => handleMouseEnter(item._id, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(item._id, e.currentTarget)}
          >
            <div className="relative w-full h-full rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden">
              {renderMedia(item)}

              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>

      {popupMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setPopupMedia(null)}
        >
          <button
            onClick={() => setPopupMedia(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-2xl font-light transition-colors duration-200 z-10"
            aria-label="Close popup"
          >
            ×
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            {popupMedia.type === "image" && (
              <div className="relative w-full h-full">
                <CldImage
                  src={popupMedia.public_id}
                  alt="Popup view"
                  width="1920"
                  height="1080"
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
              </div>
            )}
            
            {popupMedia.type === "video" && (
              <div className="rounded-lg shadow-2xl overflow-hidden">
                <CldVideoPlayer
                  src={popupMedia.public_id}
                  width="1920"
                  height="1080"
                />
              </div>
            )}
            
            {popupMedia.type === "audio" && (
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center min-w-[400px]">
                <div className="text-white text-center mb-6">
                  <p className="text-sm uppercase tracking-wider opacity-70 mb-2">Audio File</p>
                </div>
                <audio
                  src={popupMedia.url}
                  controls
                  autoPlay
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Masonry;