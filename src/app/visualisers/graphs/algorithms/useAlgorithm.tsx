import React from "react";

import { bfsEdgeHighlight, bfsVerticesHighlight } from "../bfs/bfs";
import { useBfsContext } from "../bfs/bfsContext";
import BfsState from "../bfs/bfsState";
import { dfsEdgeHighlight, dfsVerticesHighlight } from "../dfs/dfs";
import { useDfsContext } from "../dfs/dfsContext";
import DfsState from "../dfs/dfsState";
import {
  dijkstraEdgeHighlight,
  dijkstraVertexHighlight,
} from "../dijkstra/dijkstra";
import { useDijkstraContext } from "../dijkstra/dijkstraContext";
import DijkstraState from "../dijkstra/dijkstraState";
import KruskalState from "../kruskals/kruskalState";
import {
  kruskalEdgesHighlight,
  kruskalVerticesHighlight,
} from "../kruskals/kruskals";
import { useKruskalContext } from "../kruskals/kruskalsContext";
import { usePrimsContext } from "../prims/primsContext";
import {
  NOOP,
  NOOP_HIGHLIGHT,
  NOOP_NOT_READY,
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
  const kruskalContext = useKruskalContext();
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

        stateComponent: <BfsState />,

        ready: bfsContext.bfsReady,
        init: bfsContext.bfsInit,
        next: bfsContext.bfsNext,
        prev: bfsContext.bfsPrev,
        start: bfsContext.bfsStart,
        end: bfsContext.bfsEnd,

        verticesHighlight: bfsVerticesHighlight,
        edgeHighlight: bfsEdgeHighlight,

        steps: bfsContext.bfsSteps,
        stepIndex: bfsContext.bfsStepIndex,
        setStepIndex: bfsContext.setBfsStepIndex,

        startingVertex: bfsContext.bfsStartingVertex,
        setStartingVertex: bfsContext.setBfsStartingVertex,
      };
    case "Dijkstra's":
      return {
        algorithm,
        setAlgorithm,

        title: "Dijkstra's algorithm (shortest path)",

        stateComponent: <DijkstraState />,

        ready: dijkstraContext.ready,
        init: dijkstraContext.init,
        next: dijkstraContext.next,
        prev: dijkstraContext.prev,
        start: dijkstraContext.start,
        end: dijkstraContext.end,

        verticesHighlight: dijkstraVertexHighlight,
        edgeHighlight: dijkstraEdgeHighlight,

        steps: dijkstraContext.steps,
        stepIndex: dijkstraContext.stepIndex,
        setStepIndex: dijkstraContext.setStepIndex,

        startingVertex: dijkstraContext.dijkstraStartingVertex,
        setStartingVertex: dijkstraContext.setDijkstraStartingVertex,
      };
    case "Kruskal's":
      return {
        algorithm,
        setAlgorithm,

        title: "Kruskal's algorithm (minimum spanning tree)",

        stateComponent: <KruskalState />,

        ready: kruskalContext.ready,
        init: kruskalContext.init,
        next: kruskalContext.next,
        prev: kruskalContext.prev,
        start: kruskalContext.start,
        end: kruskalContext.end,

        verticesHighlight: kruskalVerticesHighlight,
        edgeHighlight: kruskalEdgesHighlight,

        steps: kruskalContext.steps,
        stepIndex: kruskalContext.stepIndex,
        setStepIndex: kruskalContext.setStepIndex,
      };
    case "Prim's":
      return {
        algorithm,
        setAlgorithm,

        title: "Prim's algorithm (minimum spanning tree)",

        stateComponent: null,

        ready: NOOP_NOT_READY,
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
