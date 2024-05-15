import { type BfsStep } from "../bfs/bfs";
import { type DfsStep } from "../dfs/dfs";
import { type DijkstraStep } from "../dijkstra/dijkstra";
import { type Graph } from "../graph";
import { type EdgesHighlight } from "../graphEdge";
import { type VerticesHighlight } from "../graphNode";
import { type KruskalsStep } from "../kruskals/kruskals";
import { type PrimsStep } from "../prims/prims";

// list of algorithms available
export const algorithms = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Kruskal's",
  "Prim's",
] as const;
export type AlgorithmType = (typeof algorithms)[number];

// which algorithms require a starting vertex
export const startingVertexAlgorithms = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Prim's",
] as const;

type UseAlgorithmReturnNull = {
  algorithm: null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmType | null>>;

  title: string;
};

type UseAlgorithmReturnAlg<T extends AlgorithmType, StepType, OtherType> = {
  algorithm: T;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmType | null>>;

  title: string;

  stateComponent: React.ReactNode;

  ready: (graph: Graph) => boolean;
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

// ! add the rest of the algorithms here

// any utility types to store extra information needed for each algorithm
type AlgorithmStartVertex = {
  startingVertex: number;
  setStartingVertex: React.Dispatch<React.SetStateAction<number>>;
};
export type UseAlgorithmStartVertex =
  | UseAlgorithmReturnAlg<"DFS", DfsStep, AlgorithmStartVertex>
  | UseAlgorithmReturnAlg<"BFS", BfsStep, AlgorithmStartVertex>
  | UseAlgorithmReturnAlg<"Dijkstra's", DijkstraStep, AlgorithmStartVertex>
  | UseAlgorithmReturnAlg<"Prim's", PrimsStep, AlgorithmStartVertex>;

type AlgorithmEmpty = Record<never, unknown>;
type UseAlgorithmEmpty = UseAlgorithmReturnAlg<
  "Kruskal's",
  KruskalsStep,
  AlgorithmEmpty
>;

// constants for WIPs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = () => {};
//
export const NOOP_HIGHLIGHT: () => 0 = () => 0;
//
export const NOOP_FALSE: () => false = () => false;

export type UseAlgorithmNotNull = UseAlgorithmStartVertex | UseAlgorithmEmpty;

export type UseAlgorithmReturnType =
  | UseAlgorithmReturnNull
  | UseAlgorithmNotNull;

// ----- UTILS ----- //
export function isStartingVertexAlgorithm(
  alg: UseAlgorithmReturnType,
): alg is UseAlgorithmStartVertex {
  return startingVertexAlgorithms.some((a) => a === alg.algorithm);
}
