"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PageHeroProps {
  imgPath?: string;
}

const PageHero = ({ imgPath = "/home/fixed.jpg" }: PageHeroProps) => {
  const pathname = usePathname();

  // split route → remove empty values
  const segments = pathname.split("/").filter(Boolean);

  // Current page title = last segment
  const title = segments.length > 0 ? segments.at(-1) : "home";

  // Convert dashed-routes → normal words (ex: sound-engineering → Sound Engineering)
  const formatText = (text: string) =>
    text.replaceAll("-", " ").replaceAll(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="w-full h-[50vh] relative flex justify-center items-center">
      {/* Background Image */}
      <Image
        src={imgPath}
        alt={title!}
        width={1600}
        height={900}
        className="object-cover absolute inset-0 w-full h-full"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-[4px] z-10"></div>

      {/* Main content */}
      <div className="relative z-20 text-primary-foreground flex flex-col items-center gap-4 px-6">
        {/* Title */}
        <h1 className="sm:text-7xl text-5xl font-extrabold capitalize">
          {formatText(title!)}
        </h1>

        {/* Breadcrumbs */}
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-light/80 sm:text-lg text-base">
          <Link href="/" className="hover:text-light">
            Home
          </Link>

          {segments.map((seg, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;

            // if last segment is "gallery", redirect to "/gallery/images"
            const finalHref = seg === "gallery" ? "/gallery/images" : href;

            return (
              <div key={seg} className="flex items-center gap-2">
                <span>/</span>
                {isLast ? (
                  <span className="text-light capitalize">
                    {formatText(seg)}
                  </span>
                ) : (
                  <Link
                    href={finalHref}
                    className="hover:text-light capitalize"
                  >
                    {formatText(seg)}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
