"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 10,
    stiffness: 50,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <p ref={ref} className="text-6xl md:text-7xl font-bold text-primary">
      0
    </p>
  );
};

const StudioStats = () => {
  const t = useTranslations("studio.stats");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Parse the numbers from translations
  const hoursNumber = parseInt(t("hoursNumber").replace(/,/g, ""));
  const projectsNumber = parseInt(t("projectsNumber").replace(/,/g, ""));

  return (
    <section
      className="py-16 bg-secondary/70 rounded-3xl"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-16">
        {/* Hours of Recording */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 p-8 bg-background/80 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-primary">{t("hoursTitle")}</h3>
          <div className="space-y-2">
            <p className="text-foreground/70">{t("hoursFirstDescription")}</p>
            <AnimatedCounter value={hoursNumber} />
            <p className="text-foreground/70">{t("hoursSecondDescription")}</p>
          </div>
        </motion.div>

        {/* Completed Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4 p-8 bg-background/80 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-primary">
            {t("projectsTitle")}
          </h3>
          <div className="space-y-2">
            <p className="text-foreground/70">
              {t("projectsFirstDescription")}
            </p>
            <AnimatedCounter value={projectsNumber} />
            <p className="text-foreground/70">
              {t("projectsSecondDescription")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioStats;