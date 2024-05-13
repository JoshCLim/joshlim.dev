import { cn } from "~/app/utils";

import { type AlgorithmType, algorithms, useDfsContext } from "./dfsContext";

export default function AlgorithmChooser() {
  return (
    <>
      <h3 className="font-light">Choose an algorithm:</h3>
      <div className="flex flex-row items-center justify-center overflow-hidden rounded-2xl text-white shadow-sm">
        {algorithms.map((algorithm) => (
          <Button key={algorithm} algorithm={algorithm} />
        ))}
      </div>
    </>
  );
}

function Button({ algorithm }: { algorithm: AlgorithmType }) {
  const { algorithm: globalAlgorithm, setAlgorithm } = useDfsContext();

  return (
    <button
      className={cn(
        "bg-purple-300 px-3 py-1 transition-colors hover:bg-purple-400",
        globalAlgorithm === algorithm && "bg-pink-400 hover:bg-pink-400",
      )}
      onClick={() => {
        if (algorithm === globalAlgorithm) setAlgorithm(null);
        else setAlgorithm(algorithm);
      }}
    >
      {algorithm}
    </button>
  );
}
