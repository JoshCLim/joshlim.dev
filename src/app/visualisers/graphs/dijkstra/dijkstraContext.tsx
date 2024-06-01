"use client";

import { createContext, useCallback, useContext } from "react";

import { type AlgorithmReadyReturn } from "../algorithms/algorithmTypes";
import { type Graph } from "../graph/graph";
import { validVertex } from "../utils";
import { type DijkstraStep, dijkstraGenerateSteps } from "./dijkstra";

import { useLocalStorage } from "usehooks-ts";

type DijkstraContextType = {
  dijkstraStartingVertex: number;
  setDijkstraStartingVertex: React.Dispatch<React.SetStateAction<number>>;

  ready: (graph: Graph) => AlgorithmReadyReturn;
  init: (graph: Graph) => void;
  next: () => void;
  prev: () => void;
  start: () => void;
  end: () => void;

  steps: DijkstraStep[] | null;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
};

const DijkstraContext = createContext<DijkstraContextType | null>(null);

export default function DijkstraContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [dijkstraStartingVertex, setDijkstraStartingVertex] =
    useLocalStorage<number>("dijkstra-start-vertex", NaN);

  const [steps, setSteps] = useLocalStorage<DijkstraStep[] | null>(
    "dijkstra-steps",
    null,
  );
  const [stepIndex, setStepIndex] = useLocalStorage<number>(
    "dijkstra-step-index",
    0,
  );

  const ready = useCallback(
    (graph: Graph): AlgorithmReadyReturn => {
      if (!validVertex(dijkstraStartingVertex, graph.nV)) {
        return {
          res: "error",
          reason: "Please select a valid starting vertex",
        };
      }
      return { res: "ready" };
    },
    [dijkstraStartingVertex],
  );

  const init = useCallback(
    (graph: Graph) => {
      setSteps(dijkstraGenerateSteps(graph, dijkstraStartingVertex));
      setStepIndex(0);
    },
    [dijkstraStartingVertex, setStepIndex, setSteps],
  );

  const next = useCallback(() => {
    setStepIndex((prev) => Math.min(prev + 1, steps!.length - 1));
  }, [setStepIndex, steps]);
  const prev = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, [setStepIndex]);
  const start = useCallback(() => {
    setStepIndex(0);
  }, [setStepIndex]);
  const end = useCallback(() => {
    setStepIndex(steps!.length - 1);
  }, [setStepIndex, steps]);

  return (
    <DijkstraContext.Provider
      value={{
        dijkstraStartingVertex,
        setDijkstraStartingVertex,

        ready,
        init,
        next,
        prev,
        start,
        end,

        steps,
        stepIndex,
        setStepIndex,
      }}
    >
      {children}
    </DijkstraContext.Provider>
  );
}

export function useDijkstraContext() {
  const context = useContext(DijkstraContext);

  if (!context) {
    throw new Error(
      "useDijkstraContext must be used within a DijkstraContextProvider",
    );
  }

  return context;
}
