"use client";

import { cn } from "~/app/utils";

import { useGraphContext } from "../graphContext";
import { isStartingVertexAlgorithm } from "./algorithmTypes";
import useAlgorithm from "./useAlgorithm";

export default function AlgorithmSetStartVertex() {
  const { running } = useGraphContext();
  const alg = useAlgorithm();

  if (running || !alg.algorithm || !isStartingVertexAlgorithm(alg))
    return <></>;

  return (
    <form className="flex flex-col items-center justify-center gap-2">
      <h3 className="font-light ">Choose a starting vertex:</h3>
      <input
        type="number"
        size={1}
        disabled={running}
        className={cn(
          "min-w-0 rounded-full border border-black bg-transparent bg-white px-4 py-2 text-center outline-transparent transition-all focus:outline-slate-950",
          running && "bg-slate-500 text-white",
        )}
        value={alg.startingVertex}
        onChange={(e) => {
          alg.setStartingVertex(parseInt(e.target.value));
        }}
      />
    </form>
  );
}
