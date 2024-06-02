"use client";

import { createContext, useCallback, useContext } from "react";

import { type AlgorithmReadyReturn } from "../algorithms/algorithmTypes";
import { type Graph } from "../graph/graph";
import { validVertex } from "../utils";
import { type PrimsStep, primGenerateSteps } from "./prims";

import { useLocalStorage } from "usehooks-ts";

type PrimsContextType = {
  primStartingVertex: number;
  setPrimStartingVertex: React.Dispatch<React.SetStateAction<number>>;

  ready: (graph: Graph) => AlgorithmReadyReturn;
  init: (graph: Graph) => void;
  next: () => void;
  prev: () => void;
  start: () => void;
  end: () => void;

  steps: PrimsStep[] | null;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
};

const PrimsContext = createContext<PrimsContextType | null>(null);

export default function PrimsContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [primStartingVertex, setPrimStartingVertex] = useLocalStorage<number>(
    "prim-start-vertex",
    NaN,
  );

  const [steps, setSteps] = useLocalStorage<PrimsStep[] | null>(
    "prims-steps",
    null,
  );
  const [stepIndex, setStepIndex] = useLocalStorage<number>(
    "prims-step-index",
    0,
  );

  const ready = useCallback(
    (graph: Graph): AlgorithmReadyReturn => {
      if (graph.directed) {
        return {
          res: "error",
          reason: "Graph must be undirected",
        };
      } else if (!graph.weighted) {
        return {
          res: "error",
          reason: "Graph must be weighted",
        };
      } else if (!validVertex(primStartingVertex, graph.nV)) {
        return {
          res: "error",
          reason: "Invalid starting vertex",
        };
      }
      return { res: "ready" };
    },
    [primStartingVertex],
  );

  const init = useCallback(
    (graph: Graph) => {
      setSteps(primGenerateSteps(graph, primStartingVertex));
      setStepIndex(0);
    },
    [primStartingVertex, setStepIndex, setSteps],
  );

  const next = useCallback(() => {
    if (!steps) return;
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [setStepIndex, steps]);
  const prev = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, [setStepIndex]);
  const start = useCallback(() => {
    setStepIndex(0);
  }, [setStepIndex]);
  const end = useCallback(() => {
    if (!steps) return;
    setStepIndex(steps.length - 1);
  }, [setStepIndex, steps]);

  return (
    <PrimsContext.Provider
      value={{
        primStartingVertex,
        setPrimStartingVertex,

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
    </PrimsContext.Provider>
  );
}

export function usePrimsContext() {
  const context = useContext(PrimsContext);

  if (!context) {
    throw new Error(
      "usePrimsContext must be used within a PrimsContextProvider",
    );
  }

  return context;
}
