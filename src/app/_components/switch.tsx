"use client";

import { cn } from "../utils";

import { motion } from "framer-motion";

export default function Switch({
  value,
  onClick,
}: {
  value: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "relative aspect-video w-10 cursor-pointer rounded-full p-[2px] shadow-[inset_0_-1px_5px_rgba(0,0,0,0.2)] transition-colors",
        value ? "bg-green-300" : "bg-gray-300",
      )}
      onClick={onClick}
    >
      <motion.div
        style={{
          translateX: value ? 16 : 0,
        }}
        className="absolute left-[2px] top-[2px] aspect-square h-5 rounded-full bg-white shadow-sm transition-all"
      ></motion.div>
    </button>
  );
}
