"use client";

import { cn } from "~/app/utils";

import { useGraphContext } from "../graphContext";
import { isStartingVertexAlgorithm } from "./algorithmTypes";
import useAlgorithm from "./useAlgorithm";

import { motion } from "framer-motion";

export default function AlgorithmSetStartVertex() {
  const { running, setRunError, setEnableKeyboardArrows } = useGraphContext();
  const alg = useAlgorithm();

  if (running || !alg.algorithm || !isStartingVertexAlgorithm(alg))
    return <></>;

  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center gap-10 py-5 text-black"
    >
      <form className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-light">Choose a starting vertex:</h3>
        <input
          type="number"
          disabled={running}
          className={cn(
            "min-w-0 rounded-full border border-black bg-transparent bg-white px-4 py-2 text-center outline-transparent transition-all focus:outline-slate-950",
            running && "bg-slate-500 text-white",
          )}
          value={!isNaN(alg.startingVertex) ? alg.startingVertex : ""}
          onChange={(e) => {
            alg.setStartingVertex(parseInt(e.target.value));
            setRunError(null);
          }}
          onFocus={() => setEnableKeyboardArrows(false)}
          onBlur={() => setEnableKeyboardArrows(true)}
        />
      </form>
    </motion.div>
  );
}
