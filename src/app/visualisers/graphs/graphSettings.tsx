import { cn } from "~/app/utils";

import ButtonGroup from "~components/buttonGroup";

import { graphSetDirected, graphSetWeighted } from "./graph";
import { useGraphContext } from "./graphContext";

import { motion } from "framer-motion";

export default function GraphSettings() {
  const { graph, graphOperations, running } = useGraphContext();

  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-300 px-10 py-8"
    >
      <h3 className="font-light text-black">Graph Settings</h3>
      <ButtonGroup>
        <button
          disabled={running}
          className={cn(
            "bg-red-300 px-3 py-1 transition-colors hover:bg-red-400",
            running && "hover:bg-red-300",
            graph.directed && "bg-red-400 hover:bg-red-400",
          )}
          onClick={() =>
            graphOperations.setGraph((g) => graphSetDirected(g, true))
          }
        >
          Directed
        </button>
        <button
          disabled={running}
          className={cn(
            "bg-red-300 px-3 py-1 transition-colors hover:bg-red-400",
            running && "hover:bg-red-300",
            !graph.directed && "bg-red-400 hover:bg-red-400",
          )}
          onClick={() =>
            graphOperations.setGraph((g) => graphSetDirected(g, false))
          }
        >
          Undirected
        </button>
      </ButtonGroup>
      <ButtonGroup>
        <button
          disabled={running}
          className={cn(
            "bg-orange-300 px-3 py-1 transition-colors hover:bg-orange-400",
            running && "hover:bg-orange-300",
            graph.weighted && "bg-orange-400 hover:bg-orange-400",
          )}
          onClick={() =>
            graphOperations.setGraph((g) => graphSetWeighted(g, true))
          }
        >
          Weighted
        </button>
        <button
          disabled={running}
          className={cn(
            "bg-orange-300 px-3 py-1 transition-colors hover:bg-orange-400",
            running && "hover:bg-orange-300",
            !graph.weighted && "bg-orange-400 hover:bg-orange-400",
          )}
          onClick={() =>
            graphOperations.setGraph((g) => graphSetWeighted(g, false))
          }
        >
          Unweighted
        </button>
      </ButtonGroup>
    </motion.div>
  );
}
