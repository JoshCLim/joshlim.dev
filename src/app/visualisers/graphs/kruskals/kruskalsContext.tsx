"use client";

import { createContext, useCallback, useContext } from "react";

import { type AlgorithmReadyReturn } from "../algorithms/algorithmTypes";
import { type Graph } from "../graph";
import { type KruskalsStep, kruskalGenerateSteps } from "./kruskals";

import { useLocalStorage } from "usehooks-ts";

type KruskalContextType = {
  ready: (graph: Graph) => AlgorithmReadyReturn;
  init: (graph: Graph) => void;
  next: () => void;
  prev: () => void;
  start: () => void;
  end: () => void;

  steps: KruskalsStep[] | null;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
};

const KruskalContext = createContext<KruskalContextType | null>(null);

export default function KruskalContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [steps, setSteps] = useLocalStorage<KruskalsStep[] | null>(
    "dijkstra-steps",
    null,
  );
  const [stepIndex, setStepIndex] = useLocalStorage<number>(
    "dijkstra-step-index",
    0,
  );

  const ready = useCallback((graph: Graph): AlgorithmReadyReturn => {
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
    }
    return { res: "ready" };
  }, []);

  const init = useCallback(
    (graph: Graph) => {
      setSteps(kruskalGenerateSteps(graph));
      setStepIndex(0);
    },
    [setStepIndex, setSteps],
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
    <KruskalContext.Provider
      value={{
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
    </KruskalContext.Provider>
  );
}

export function useKruskalContext() {
  const context = useContext(KruskalContext);

  if (!context) {
    throw new Error(
      "useKruskalContext must be used within a KruskalContextProvider",
    );
  }

  return context;
}
