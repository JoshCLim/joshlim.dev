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
  tooltip,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  confirmation?: boolean;
  disabled?: boolean;
  tooltip: string;
}) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  return (
    <div className="group relative">
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          ease: "easeInOut",
          stiffness: 70,
        }}
        whileHover={{ scale: disabled ? 1 : 1.05, transition: { delay: 0 } }}
        whileTap={{ scale: disabled ? 1 : 0.95, transition: { delay: 0 } }}
        className={cn(
          "rounded-md bg-green-700 p-2 px-4 shadow-sm transition-[filter,background-color] hover:brightness-95",
          className,
          disabled && "cursor-not-allowed bg-gray-400 hover:filter-none",
        )}
        onClick={
          confirmation ? () => setShowConfirmation((prev) => !prev) : onClick
        }
        disabled={disabled}
      >
        {children}
      </motion.button>
      {!showConfirmation && (
        <div className="absolute left-[50%] top-[110%] min-w-full translate-x-[-50%] select-none rounded-xl bg-slate-400 px-2 py-1 text-center text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {tooltip}
        </div>
      )}
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
