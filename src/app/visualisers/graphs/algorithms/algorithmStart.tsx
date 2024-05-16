import { cn } from "~/app/utils";

import { useGraphContext } from "../graphContext";
import AlgorithmSetStartVertex from "./algorithmSetStartVertex";
import useAlgorithm from "./useAlgorithm";

import { motion } from "framer-motion";

export default function AlgorithmStart() {
  const { graph, running, setRunning, runError, setRunError } =
    useGraphContext();
  const alg = useAlgorithm();

  return (
    <>
      <motion.div
        layout
        className="flex flex-col items-center justify-center gap-10 py-5 text-black"
      >
        <AlgorithmSetStartVertex />
      </motion.div>
      <div className="flex flex-col items-center gap-3">
        {!!runError && (
          <p className="text-balance px-10 text-center text-red-500">
            {runError}
          </p>
        )}
        <Button
          className={
            running
              ? "bg-amber-400 hover:bg-amber-500"
              : "bg-green-400 hover:bg-green-500"
          }
          onTap={() => {
            if (!alg.algorithm) {
              setRunError("Please choose an algorithm.");
              return;
            }

            const ready = alg.ready(graph);
            if (ready.res === "error") {
              setRunError(ready.reason);
              return;
            }

            alg.init(graph);

            setRunning((prev) => !prev);
            setRunError(null);
          }}
        >
          {running ? <span>Running...</span> : <span>Run</span>}
        </Button>
      </div>
    </>
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
      layout="position"
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
