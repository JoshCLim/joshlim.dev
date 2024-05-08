"use client";

import { type Easing, motion } from "framer-motion";

export default function FadeInOut({
  children,
  delay = 0, // ms
  exitDelay,
  exitDuration,
  duration = 1000, // ms
  ease = "easeInOut",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: Easing;
  exitDelay?: number;
  exitDuration?: number;
}) {
  exitDelay ??= delay;
  exitDuration ??= duration;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: delay / 1000, duration: duration / 1000, ease },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: exitDelay / 1000,
          duration: exitDuration / 1000,
          ease,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
