"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "iconoir-react";

export default function PageNavbar() {
  return (
    <motion.a
      whileTap={{
        scale: 0.6,
        transition: { type: "spring", stiffness: 50 },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      exit={{ opacity: 0, transition: { delay: 0 } }}
      className="absolute z-30 p-6"
      href="/visualisers"
    >
      <ArrowLeft color="#000" height={24} />
    </motion.a>
  );
}
