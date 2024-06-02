"use client";

import { createContext, useCallback, useContext } from "react";

import { type AlgorithmReadyReturn } from "../algorithms/algorithmTypes";
import { type Graph } from "../graph/graph";
import { validVertex } from "../utils";
import { type BfsStep, bfsGenerateSteps } from "./bfs";

import { useLocalStorage } from "usehooks-ts";

type BfsContextType = {
  // starting vertex
  bfsStartingVertex: number;
  setBfsStartingVertex: React.Dispatch<React.SetStateAction<number>>;

  // function to initialise algorithm
  bfsReady: (graph: Graph) => AlgorithmReadyReturn;
  bfsInit: (graph: Graph) => void;

  // array of steps
  bfsSteps: BfsStep[] | null;

  // current step index we are up to
  bfsStepIndex: number;
  setBfsStepIndex: React.Dispatch<React.SetStateAction<number>>;

  // functions to navigate through the steps
  bfsNext: () => void;
  bfsPrev: () => void;
  bfsStart: () => void;
  bfsEnd: () => void;
};

const BfsContext = createContext<BfsContextType | null>(null);

export default function BfsContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [bfsStartingVertex, setBfsStartingVertex] = useLocalStorage<number>(
    "bfs-start-vertex",
    NaN,
  );

  const [bfsSteps, setBfsSteps] = useLocalStorage<BfsStep[] | null>(
    "dfs-steps",
    null,
  );
  const [bfsStepIndex, setBfsStepIndex] = useLocalStorage<number>(
    "dfs-step-index",
    0,
  );
  const bfsReady = useCallback(
    (graph: Graph): AlgorithmReadyReturn => {
      if (!validVertex(bfsStartingVertex, graph.nV)) {
        return {
          res: "error",
          reason: "Please select a valid starting vertex.",
        };
      }
      return { res: "ready" };
    },
    [bfsStartingVertex],
  );
  const bfsInit = useCallback(
    (graph: Graph) => {
      setBfsSteps(bfsGenerateSteps(graph, bfsStartingVertex));
      setBfsStepIndex(0);
    },
    [bfsStartingVertex, setBfsStepIndex, setBfsSteps],
  );
  const bfsNext = useCallback(() => {
    setBfsStepIndex((i) => Math.min(i + 1, (bfsSteps?.length ?? 0) - 1));
  }, [bfsSteps, setBfsStepIndex]);
  const bfsPrev = useCallback(() => {
    setBfsStepIndex((i) => Math.max(i - 1, 0));
  }, [setBfsStepIndex]);
  const bfsStart = useCallback(() => {
    setBfsStepIndex(0);
  }, [setBfsStepIndex]);
  const bfsEnd = useCallback(() => {
    if (bfsSteps) setBfsStepIndex(bfsSteps.length - 1);
  }, [bfsSteps, setBfsStepIndex]);

  return (
    <BfsContext.Provider
      value={{
        bfsStartingVertex,
        setBfsStartingVertex,

        bfsReady,
        bfsInit,
        bfsSteps,

        bfsStepIndex,
        setBfsStepIndex,

        bfsNext,
        bfsPrev,
        bfsStart,
        bfsEnd,
      }}
    >
      {children}
    </BfsContext.Provider>
  );
}

export function useBfsContext() {
  const context = useContext(BfsContext);

  if (!context) {
    throw new Error("useBfsContext must be used within a BfsContextProvider");
  }

  return context;
}
