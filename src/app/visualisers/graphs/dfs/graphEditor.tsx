"use client";

import dynamic from "next/dynamic";

import { cn } from "~/app/utils";

import {
  type GraphRepresentationType,
  graphRepresentations,
  useDfsContext,
} from "./dfsContext";

const AdjacencyMatrix = dynamic(() => import("./adjacencyMatrix"), {
  ssr: false,
});

export default function GraphEditor() {
  const { graphRep } = useDfsContext();

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10 text-center text-black">
      <div className="flex flex-col items-center gap-3">
        <h3 className="font-light">Choose a graph representation:</h3>
        <div className="flex flex-row items-center justify-center overflow-hidden rounded-2xl text-white shadow-sm">
          {graphRepresentations.map((representation) => (
            <Button key={representation} graphRep={representation} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        {graphRep === "Adjacency Matrix" && <AdjacencyMatrix />}
      </div>
    </div>
  );
}

function Button({ graphRep }: { graphRep: GraphRepresentationType }) {
  const { graphRep: globalGraphRep, setGraphRep } = useDfsContext();

  return (
    <button
      className={cn(
        "bg-violet-300 px-3 py-1 transition-colors hover:bg-violet-400",
        globalGraphRep === graphRep && "bg-indigo-400 hover:bg-indigo-400",
      )}
      onClick={() => setGraphRep(graphRep)}
    >
      {graphRep}
    </button>
  );
}
