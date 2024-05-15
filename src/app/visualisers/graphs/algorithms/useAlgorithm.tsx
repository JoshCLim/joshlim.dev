import React from "react";

import { useBfsContext } from "../bfs/bfsContext";
import { dfsEdgeHighlight, dfsVerticesHighlight } from "../dfs/dfs";
import { useDfsContext } from "../dfs/dfsContext";
import DfsState from "../dfs/dfsState";
import { useDijkstraContext } from "../dijkstra/dijkstraContext";
import { usePrimsContext } from "../prims/primsContext";
import {
  NOOP,
  NOOP_FALSE,
  NOOP_HIGHLIGHT,
  type UseAlgorithmReturnType,
} from "./algorithmTypes";
import { type AlgorithmType } from "./algorithmTypes";

import { useLocalStorage } from "usehooks-ts";

export default function useAlgorithm(): UseAlgorithmReturnType {
  const [algorithm, setAlgorithm] = useLocalStorage<AlgorithmType | null>(
    "graphs-algorithm-type",
    null,
  );

  // ! add algorithm context here
  const dfsContext = useDfsContext();
  const bfsContext = useBfsContext();
  const dijkstraContext = useDijkstraContext();
  const primContext = usePrimsContext();

  switch (algorithm) {
    case "DFS":
      return {
        algorithm,
        setAlgorithm,

        title: "depth-first search",

        stateComponent: <DfsState />,

        ready: dfsContext.dfsReady,
        init: dfsContext.dfsInit,
        next: dfsContext.dfsNext,
        prev: dfsContext.dfsPrev,
        start: dfsContext.dfsStart,
        end: dfsContext.dfsEnd,

        verticesHighlight: dfsVerticesHighlight,
        edgeHighlight: dfsEdgeHighlight,

        steps: dfsContext.dfsSteps,
        stepIndex: dfsContext.dfsStepIndex,
        setStepIndex: dfsContext.setDfsStepIndex,

        startingVertex: dfsContext.dfsStartingVertex,
        setStartingVertex: dfsContext.setDfsStartingVertex,
      };
    case "BFS":
      return {
        algorithm,
        setAlgorithm,

        title: "breadth-first search",

        stateComponent: null,

        ready: NOOP_FALSE,
        init: NOOP,
        next: NOOP,
        prev: NOOP,
        start: NOOP,
        end: NOOP,

        verticesHighlight: NOOP_HIGHLIGHT,
        edgeHighlight: NOOP_HIGHLIGHT,

        steps: null,
        stepIndex: 0,
        setStepIndex: NOOP,

        startingVertex: bfsContext.bfsStartingVertex,
        setStartingVertex: bfsContext.setBfsStartingVertex,
      };
    case "Dijkstra's":
      return {
        algorithm,
        setAlgorithm,

        title: "Dijkstra's algorithm (shortest path)",

        stateComponent: null,

        ready: NOOP_FALSE,
        init: NOOP,
        next: NOOP,
        prev: NOOP,
        start: NOOP,
        end: NOOP,

        verticesHighlight: NOOP_HIGHLIGHT,
        edgeHighlight: NOOP_HIGHLIGHT,

        steps: null,
        stepIndex: 0,
        setStepIndex: NOOP,

        startingVertex: dijkstraContext.dijkstraStartingVertex,
        setStartingVertex: dijkstraContext.setDijkstraStartingVertex,
      };
    case "Kruskal's":
      return {
        algorithm,
        setAlgorithm,

        title: "Kruskal's algorithm (minimum spanning tree)",

        stateComponent: null,

        ready: NOOP_FALSE,
        init: NOOP,
        next: NOOP,
        prev: NOOP,
        start: NOOP,
        end: NOOP,

        verticesHighlight: NOOP_HIGHLIGHT,
        edgeHighlight: NOOP_HIGHLIGHT,

        steps: null,
        stepIndex: 0,
        setStepIndex: NOOP,
      };
    case "Prim's":
      return {
        algorithm,
        setAlgorithm,

        title: "Prim's algorithm (minimum spanning tree)",

        stateComponent: null,

        ready: NOOP_FALSE,
        init: NOOP,
        next: NOOP,
        prev: NOOP,
        start: NOOP,
        end: NOOP,

        verticesHighlight: NOOP_HIGHLIGHT,
        edgeHighlight: NOOP_HIGHLIGHT,

        steps: null,
        stepIndex: 0,
        setStepIndex: NOOP,

        startingVertex: primContext.primStartingVertex,
        setStartingVertex: primContext.setPrimStartingVertex,
      };
    // ! add algorithm return here
    default:
      return { algorithm: null, setAlgorithm, title: "select an algorithm..." };
  }
}
