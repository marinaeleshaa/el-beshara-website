"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  myDelay?: boolean;
}

const Animate = ({ children, delay = 0 , myDelay=false, duration = 0.5, className , amount=0.3}: Props) => {
  const delayValue = myDelay ? 0.3 : delay;
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: duration, delay: delayValue }}
      viewport={{ once: true , amount: amount}}
    >
      {children}
    </motion.div>
  );
};
export default Animate;
