"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number
}

const Animate = ({ children, delay = 0, duration = 0.5, className , amount=0.1}: Props) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: duration, delay: delay }}
      viewport={{ once: true , amount: amount}}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
