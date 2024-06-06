"use client";

import { useState } from "react";

import useClickAway from "~/app/_hooks/useClickAway";
import { cn } from "~/app/utils";

import ButtonGroup from "~components/buttonGroup";

import { useGraphContext } from "../graph/graphContext";
import { type AlgorithmType, algorithms } from "./algorithmTypes";
import useAlgorithm from "./useAlgorithm";

import { AnimatePresence, motion } from "framer-motion";
import { NavArrowDown } from "iconoir-react";

export default function AlgorithmChooser() {
  return (
    <div className="flex flex-row items-center gap-3">
      <p className="text-slate-800">Choose an algorithm:</p>
      <ButtonGroup className="hidden lg:flex">
        {algorithms.map((algorithm) => (
          <Button key={algorithm} algorithm={algorithm} />
        ))}
      </ButtonGroup>
      <ButtonDropdown>
        {algorithms.map((algorithm) => (
          <Button key={algorithm} algorithm={algorithm} />
        ))}
      </ButtonDropdown>
    </div>
  );
}

function Button({ algorithm }: { algorithm: AlgorithmType }) {
  const { setRunError } = useGraphContext();
  const { algorithm: globalAlgorithm, setAlgorithm } = useAlgorithm();

  return (
    <button
      className={cn(
        "bg-purple-300 px-3 py-1 transition-colors hover:bg-purple-400",
        globalAlgorithm === algorithm && "bg-pink-400 hover:bg-pink-400",
      )}
      onClick={() => {
        if (algorithm === globalAlgorithm) setAlgorithm(null);
        else setAlgorithm(algorithm);

        setRunError(null);
      }}
    >
      {algorithm}
    </button>
  );
}

function ButtonDropdown({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useClickAway<HTMLDivElement>(() => setOpen(false));
  const { algorithm: globalAlgorithm } = useAlgorithm();

  return (
    <div
      ref={dropdownRef}
      className="relative block lg:hidden"
      onClick={() => setOpen((prev) => !prev)}
    >
      <button className="flex flex-row gap-1 rounded-full bg-slate-500 px-3 py-1 text-white">
        {globalAlgorithm ?? "Select an algorithm"}
        <NavArrowDown
          className={cn("transition-all", open ? "rotate-180" : "rotate-0")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-[120%] z-20 flex min-w-full flex-col overflow-hidden rounded-xl text-white shadow-lg"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
