"use client";

import { useGraphContext } from "./graphContext";

import { AnimatePresence, motion } from "framer-motion";

export default function AdjacencyList() {
  const { graph } = useGraphContext();

  return (
    <AnimatePresence>
      {graph.nV > 1 && (
        <motion.div
          key="adj-list"
          className="relative text-slate-800"
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{ transformOrigin: "top center" }}
        >
          <p className="text-balance px-5">
            Adjacency list not yet implemented! Please wait for a future update.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
