import { type BfsStep } from "../bfs/bfs";
import { type DfsStep } from "../dfs/dfs";
import { type DijkstraStep } from "../dijkstra/dijkstra";
import { type Graph } from "../graph/graph";
import { type EdgesHighlight } from "../graph/graphEdge";
import { type VerticesHighlight } from "../graph/graphNode";
import { type KruskalsStep } from "../kruskals/kruskals";
import { type PrimsStep } from "../prims/prims";

// list of algorithms available
export const algorithms = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Kruskal's",
  "Prim's",
  // ! add the algorithm here
] as const;
export type AlgorithmType = (typeof algorithms)[number];

// null algorithm type
type UseAlgorithmReturnNull = {
  algorithm: null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmType | null>>;

  title: string;
};

// return type for the alg.ready function
export type AlgorithmReadyReturn =
  | { res: "ready" }
  | { res: "error"; reason: string };

// generic algorithm type that must be implemented for each algorithm
type UseAlgorithmReturnAlg<T extends AlgorithmType, StepType, OtherType> = {
  algorithm: T;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmType | null>>;

  title: string;

  stateComponent: React.ReactNode;

  ready: (graph: Graph) => AlgorithmReadyReturn;
  init: (graph: Graph) => void;
  next: () => void;
  prev: () => void;
  start: () => void;
  end: () => void;

  verticesHighlight: (
    graph: Graph,
    step: StepType,
    vertex: number,
  ) => VerticesHighlight;
  edgeHighlight: (
    graph: Graph,
    step: StepType,
    u: number,
    v: number,
  ) => EdgesHighlight;

  steps: StepType[] | null;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
} & OtherType;

/* ----- Algorithm OtherType Groups ----- */
// any utility types to store extra information needed for each algorithm
// ! add the rest of the algorithms here
// 1. the type representing the extra information needed
// 2. a list of algorithms that require that extra information
// 3. the type representing the return type for useAlgorithm with that extra information

// a) algorithms with a starting vertex required
type AlgorithmStartVertex = {
  startingVertex: number;
  setStartingVertex: React.Dispatch<React.SetStateAction<number>>;
};
export const startingVertexAlgorithms = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Prim's",
] as const satisfies ReadonlyArray<AlgorithmType>;
export type UseAlgorithmStartVertex =
  | UseAlgorithmReturnAlg<"DFS", DfsStep, AlgorithmStartVertex>
  | UseAlgorithmReturnAlg<"BFS", BfsStep, AlgorithmStartVertex>
  | UseAlgorithmReturnAlg<"Dijkstra's", DijkstraStep, AlgorithmStartVertex>
  | UseAlgorithmReturnAlg<"Prim's", PrimsStep, AlgorithmStartVertex>;

// b) algorithms with no other information needed
type AlgorithmEmpty = Record<never, unknown>;
export const emptyAlgorithms = [
  "Kruskal's",
] as const satisfies ReadonlyArray<AlgorithmType>;
type UseAlgorithmEmpty = UseAlgorithmReturnAlg<
  "Kruskal's",
  KruskalsStep,
  AlgorithmEmpty
>;

/* ----- Constants for WIPs ----- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = () => {};
// function that just returns 0 (i.e., never highlight)
export const NOOP_HIGHLIGHT: () => 0 = () => 0;
// function that just returns false
export const NOOP_NOT_READY: () => AlgorithmReadyReturn = () => ({
  res: "error",
  reason: "Algorithm not implemented. Please wait for a future update.",
});

// final type to group all non-null algorithm types
export type UseAlgorithmNotNull = UseAlgorithmStartVertex | UseAlgorithmEmpty;

// final return type for useAlgorithm
export type UseAlgorithmReturnType =
  | UseAlgorithmReturnNull
  | UseAlgorithmNotNull;

// ----- UTILS ----- //
export function isStartingVertexAlgorithm(
  alg: UseAlgorithmReturnType,
): alg is UseAlgorithmStartVertex {
  return startingVertexAlgorithms.some((a) => a === alg.algorithm);
}
