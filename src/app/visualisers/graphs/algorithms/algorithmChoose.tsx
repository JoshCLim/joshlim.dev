import { cn } from "~/app/utils";

import ButtonGroup from "~components/buttonGroup";

import { useGraphContext } from "../graphContext";
import { type AlgorithmType, algorithms } from "./algorithmTypes";
import useAlgorithm from "./useAlgorithm";

export default function AlgorithmChooser() {
  return (
    <>
      <h3 className="font-light">Choose an algorithm:</h3>
      <ButtonGroup>
        {algorithms.map((algorithm) => (
          <Button key={algorithm} algorithm={algorithm} />
        ))}
      </ButtonGroup>
    </>
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
