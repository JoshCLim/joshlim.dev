"use client";

import { type Easing, motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0, // ms
  duration = 1000, // ms
  ease = "easeInOut",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: Easing;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: ease,
      }}
    >
      {children}
    </motion.div>
  );
}
