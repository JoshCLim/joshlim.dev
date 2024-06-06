"use client";

import { cn } from "~/app/utils";

import AdjacencyList from "./adjacencyList";
import AdjacencyMatrix from "./adjacencyMatrix";
import {
  type GraphRepresentationType,
  graphRepresentations,
  useGraphContext,
} from "./graphContext";

import { LayoutGroup, motion } from "framer-motion";

export default function GraphEditor() {
  const { graphRep } = useGraphContext();

  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center gap-5 text-center text-black"
    >
      <LayoutGroup>
        <motion.div layout className="flex flex-col items-center gap-3">
          <div className="flex flex-row items-center justify-center overflow-hidden rounded-2xl text-white shadow-sm">
            {graphRepresentations.map((representation) => (
              <Button key={representation} graphRep={representation} />
            ))}
          </div>
        </motion.div>
        {graphRep === "Adjacency Matrix" && <AdjacencyMatrix />}
        {graphRep === "Adjacency List" && <AdjacencyList />}
      </LayoutGroup>
    </motion.div>
  );
}

function Button({ graphRep }: { graphRep: GraphRepresentationType }) {
  const { graphRep: globalGraphRep, setGraphRep } = useGraphContext();

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
