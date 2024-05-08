"use client";

import { motion } from "framer-motion";

export default function BounceOnTap({
  children,
  scaleFactor = 0.2,
}: {
  scaleFactor?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileTap={{ scale: 1 - scaleFactor }}
      whileHover={{ scale: 1 + scaleFactor / 2 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
}
