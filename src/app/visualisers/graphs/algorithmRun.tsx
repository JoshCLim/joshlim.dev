"use client";

import { useGraphContext } from "./graphContext";

import { ArrowLeftCircle, ArrowRightCircle, Play } from "iconoir-react";

export default function AlgorithmRun() {
  const { algorithm, dfsNext, dfsPrev } = useGraphContext();

  return (
    <div className="py-10">
      <div className="flex flex-row overflow-hidden rounded-full">
        <button
          className="flex flex-row gap-1 border-r border-white bg-lime-500 px-5 py-3 text-lg transition-colors hover:bg-lime-600"
          onClick={() => {
            if (algorithm === "DFS") dfsPrev();
          }}
        >
          <ArrowLeftCircle /> Prev
        </button>
        <button className="flex flex-row gap-1 bg-lime-500 px-5 py-3 text-lg transition-colors hover:bg-lime-600">
          Play <Play />
        </button>
        <button
          className="flex flex-row gap-1 border-l border-white bg-lime-500 px-5 py-3 text-lg transition-colors hover:bg-lime-600"
          onClick={() => {
            if (algorithm === "DFS") dfsNext();
          }}
        >
          Next <ArrowRightCircle />
        </button>
      </div>
    </div>
  );
}
