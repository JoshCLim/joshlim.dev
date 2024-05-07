"use client";

import { type Easing, motion } from "framer-motion";

export default function FadeUp({
  children,
  initialY = 100, // px
  delay = 0, // ms
  duration = 1000, // ms
  ease = "easeOut",
}: {
  children: React.ReactNode;
  initialY?: number;
  delay?: number;
  duration?: number;
  ease?: Easing;
}) {
  // force a positive initialY
  if (initialY < 0) initialY = -initialY;

  return (
    <motion.div
      initial={{ translateY: initialY, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
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
