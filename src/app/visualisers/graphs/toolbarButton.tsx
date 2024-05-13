"use client";

import { useState } from "react";

import { cn } from "~/app/utils";

import { AnimatePresence, motion } from "framer-motion";

export default function ToolbarButton({
  className,
  children,
  onClick,
  confirmation = false,
  disabled = false,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  confirmation?: boolean;
  disabled?: boolean;
}) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  return (
    <div className="relative">
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          ease: "easeInOut",
          stiffness: 70,
        }}
        whileHover={{ scale: 1.05, transition: { delay: 0 } }}
        whileTap={{ scale: 0.95, transition: { delay: 0 } }}
        className={cn(
          "rounded-md bg-green-700 p-2 px-4 shadow-sm transition-[filter] hover:brightness-95",
          className,
          disabled && "cursor-not-allowed bg-gray-400",
        )}
        onClick={
          confirmation ? () => setShowConfirmation((prev) => !prev) : onClick
        }
        disabled={disabled}
      >
        {children}
      </motion.button>
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ transformOrigin: "top right" }}
            transition={{
              type: "spring",
              ease: "easeInOut",
              stiffness: 110,
              damping: 15,
            }}
            className=" absolute right-0 top-[120%] z-infinity space-y-2 rounded-md bg-white p-3 text-sm text-black shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center">Are you sure?</p>
            <div className="flex flex-row justify-around gap-3">
              <button
                className="rounded-xl bg-green-200 px-2 py-1 text-green-900 transition-colors hover:bg-green-300"
                onClick={() => {
                  if (onClick) onClick();
                  setShowConfirmation(false);
                }}
              >
                Yes
              </button>
              <button
                className="rounded-xl bg-red-200 px-2 py-1 text-red-900 transition-colors hover:bg-red-300"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
