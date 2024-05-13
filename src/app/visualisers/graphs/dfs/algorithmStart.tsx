import { cn } from "~/app/utils";

import { type AlgorithmType, useDfsContext } from "./dfsContext";

import { motion } from "framer-motion";

const startingVertexAlgorithms: AlgorithmType[] = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Prim's",
];

export default function AlgorithmStart() {
  const {
    running,
    setRunning,
    algorithm,
    dfsStartingVertex,
    setDfsStartingVertex,
    bfsStartingVertex,
    setBfsStartingVertex,
    dijkstraStartingVertex,
    setDijkstraStartingVertex,
    primStartingVertex,
    setPrimStartingVertex,
  } = useDfsContext();

  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center gap-10 py-5 text-black"
    >
      {!!algorithm && startingVertexAlgorithms.includes(algorithm) && (
        <form className="flex flex-col items-center justify-center gap-2">
          <h3 className="font-light ">Choose a starting vertex:</h3>
          <input
            type="number"
            size={1}
            disabled={running}
            className={cn(
              "min-w-0 rounded-full border border-black bg-transparent px-4 py-2 text-center outline-transparent transition-all focus:outline-slate-950",
              running && "bg-slate-500 text-white",
            )}
            value={
              (algorithm === "DFS"
                ? dfsStartingVertex
                : algorithm === "BFS"
                  ? bfsStartingVertex
                  : algorithm === "Dijkstra's"
                    ? dijkstraStartingVertex
                    : primStartingVertex) ?? ""
            }
            onChange={(e) => {
              switch (algorithm) {
                case "DFS":
                  setDfsStartingVertex(parseInt(e.target.value));
                  break;
                case "BFS":
                  setBfsStartingVertex(parseInt(e.target.value));
                  break;
                case "Dijkstra's":
                  setDijkstraStartingVertex(parseInt(e.target.value));
                  break;
                case "Prim's":
                  setPrimStartingVertex(parseInt(e.target.value));
                  break;
              }
            }}
          />
        </form>
      )}

      <Button
        className={
          running
            ? "bg-amber-400 hover:bg-amber-500"
            : "bg-green-400 hover:bg-green-500"
        }
        onTap={() => {
          if (!algorithm) return; // TODO: show error message
          setRunning((prev) => !prev);
        }}
      >
        {running ? <span>Running...</span> : <span>Run</span>}
      </Button>
    </motion.div>
  );
}

function Button({
  onTap,
  className,
  children,
}: {
  onTap?: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.button
      layout
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onTap={onTap}
      className={cn(
        "rounded-3xl bg-green-400 px-8 py-3 text-white transition-colors hover:bg-green-500",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
