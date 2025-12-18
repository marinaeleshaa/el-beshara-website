"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number
}

const Animate = ({ children, delay = 0, duration = 0.5, className , amount=0.3}: Props) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: duration, delay: delay }}
      viewport={{ once: true , amount: amount}}
    >
      {children}
    </motion.div>
  );
};
export default Animate;
