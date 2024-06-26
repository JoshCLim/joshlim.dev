"use client";

import { createContext, useCallback, useContext } from "react";

import { type AlgorithmReadyReturn } from "../algorithms/algorithmTypes";
import { type Graph } from "../graph/graph";
import { validVertex } from "../utils";
import { type DfsStep, dfsGenerateSteps } from "./dfs";

import { useLocalStorage } from "usehooks-ts";

type DfsContextType = {
  // starting vertex
  dfsStartingVertex: number;
  setDfsStartingVertex: React.Dispatch<React.SetStateAction<number>>;

  // function to initialise algorithm
  dfsReady: (graph: Graph) => AlgorithmReadyReturn;
  dfsInit: (graph: Graph) => void;

  // array of steps
  dfsSteps: DfsStep[] | null;

  // current step index we are up to
  dfsStepIndex: number;
  setDfsStepIndex: React.Dispatch<React.SetStateAction<number>>;

  // functions to navigate through the steps
  dfsNext: () => void;
  dfsPrev: () => void;
  dfsStart: () => void;
  dfsEnd: () => void;
};

const DfsContext = createContext<DfsContextType | null>(null);

export default function DfsContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [dfsStartingVertex, setDfsStartingVertex] = useLocalStorage<number>(
    "dfs-start-vertex",
    NaN,
  );

  const [dfsSteps, setDfsSteps] = useLocalStorage<DfsStep[] | null>(
    "dfs-steps",
    null,
  );
  const [dfsStepIndex, setDfsStepIndex] = useLocalStorage<number>(
    "dfs-step-index",
    0,
  );
  const dfsReady = useCallback(
    (graph: Graph): AlgorithmReadyReturn => {
      if (!validVertex(dfsStartingVertex, graph.nV)) {
        return {
          res: "error",
          reason: "Please select a valid starting vertex.",
        };
      }
      return { res: "ready" };
    },
    [dfsStartingVertex],
  );
  const dfsInit = useCallback(
    (graph: Graph) => {
      setDfsSteps(dfsGenerateSteps(graph, dfsStartingVertex));
      setDfsStepIndex(0);
    },
    [dfsStartingVertex, setDfsStepIndex, setDfsSteps],
  );
  const dfsNext = useCallback(() => {
    setDfsStepIndex((i) => Math.min(i + 1, (dfsSteps?.length ?? 0) - 1));
  }, [dfsSteps, setDfsStepIndex]);
  const dfsPrev = useCallback(() => {
    setDfsStepIndex((i) => Math.max(i - 1, 0));
  }, [setDfsStepIndex]);
  const dfsStart = useCallback(() => {
    setDfsStepIndex(0);
  }, [setDfsStepIndex]);
  const dfsEnd = useCallback(() => {
    if (dfsSteps) setDfsStepIndex(dfsSteps.length - 1);
  }, [dfsSteps, setDfsStepIndex]);

  return (
    <DfsContext.Provider
      value={{
        dfsStartingVertex,
        setDfsStartingVertex,
        dfsReady,
        dfsInit,
        dfsSteps,
        dfsStepIndex,
        setDfsStepIndex,
        dfsNext,
        dfsPrev,
        dfsStart,
        dfsEnd,
      }}
    >
      {children}
    </DfsContext.Provider>
  );
}

export function useDfsContext() {
  const context = useContext(DfsContext);

  if (!context) {
    throw new Error("useDfsContext must be used within a DfsContextProvider");
  }

  return context;
}
