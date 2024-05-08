"use client";

import { type Easing, motion } from "framer-motion";

export default function RotateScaleInOut({
  children,
  delay = 0, // ms
  exitDelay,
  exitDuration,
  duration = 1000, // ms
  ease = "easeInOut",
  angle = 180,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: Easing;
  exitDelay?: number;
  exitDuration?: number;
  angle?: number;
  className?: string;
}) {
  exitDelay ??= delay;
  exitDuration ??= duration;

  return (
    <motion.div
      className={className}
      initial={{ rotate: 0, scale: 0 }}
      animate={{
        rotate: angle,
        scale: 1,
        transition: { delay: delay / 1000, duration: duration / 1000, ease },
      }}
      exit={{
        rotate: 0,
        scale: 0,
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
