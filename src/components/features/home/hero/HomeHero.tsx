"use client";

import { images } from "@/data/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, m, motion } from "framer-motion";
import MyBtn from "@/components/ui/MyBtn";
import { useTranslations } from "next-intl";
import { langSelector } from "@/redux/slices/LangSlice";
import { useSelector } from "react-redux";

const HomeHero = () => {
  const [index, setIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const { lang } = useSelector(langSelector);
  const [mounted, setMounted] = useState(false);

  const t = useTranslations("home");
  const heroContent = t.raw("homeHero") as {
    title: string;
    description: string;
    btnText?: string;
    href?: string;
  }[];

  const current = heroContent[contentIndex];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setContentIndex((prev) => (prev + 1) % heroContent.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
    dir={mounted && lang === "ar" ? "rtl" : "ltr"}
    className="relative h-[80vh] mb-20 overflow-hidden">
      {/* Overlay */}
      <div  className={`absolute ${mounted && lang === "ar" ? "scale-x-[-1]" : "scale-x-[1]"} inset-0 bg-radial-[at_90%_70%] from-transparent-[0%] via-transparent-[30%] via-dark-[70%] to-dark z-10`}></div>
      {/* Stacked Images */}
      {images.slice(0, index + 1).map((img, i) => (
        <motion.div
          key={i}
          initial={i === 0 ? { x: 0 } : mounted && lang === "ar" ? { x: "-100%" } : { x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src={img.url} alt="" fill className="object-cover" />
        </motion.div>
      ))}
      {/* Smooth Text Animation */}

      <div className="absolute inset-0 z-20 flex justify-center p-10 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={contentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className=" max-w-xl flex flex-col justify-center items-center text-center  px-4 text-light"
          >
            <h1 className="text-3xl leading-snug sm:text-4xl md:text-5xl font-bold mb-4">
              {current.title}
            </h1>
            <p className="text-sm text-light/80 md:text-lg mb-6">
              {current.description}
            </p>

            {current.btnText && current.href && (
              <MyBtn
                text={current.btnText}
                href={current.href}
                variant="primary"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeHero;
