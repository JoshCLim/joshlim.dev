"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import dfsGenerateSteps, { type DfsStep } from "./dfs";
import {
  type Graph,
  graphAddVertex,
  graphMoveHorizontal,
  graphMoveVertical,
  graphNew,
  graphRemoveVertex,
  graphSetEdge,
  graphSetVertexPosition,
} from "./graph";

import { type MotionValue } from "framer-motion";
import { useLocalStorage } from "usehooks-ts";

type GraphNodePositionType = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

type GraphNodePositionsType = (GraphNodePositionType | null)[];

export const MAX_VERTICES = 8;

export const algorithms = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Kruskal's",
  "Prim's",
] as const;
export type AlgorithmType = (typeof algorithms)[number];

export const graphRepresentations = [
  "Adjacency Matrix",
  "Adjacency List",
] as const;
export type GraphRepresentationType = (typeof graphRepresentations)[number];

type GraphContextType = {
  // immutable graph state
  graph: Graph;
  // graph operations
  graphOperations: GraphOperations;

  // canvas reference
  canvasRef: React.RefObject<HTMLDivElement>;

  // adj matrix
  adjMatrix: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  // graph preset show
  graphPreset: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  // motion values: positions
  graphNodePositions: GraphNodePositionsType;
  setGraphNodePositions: React.Dispatch<
    React.SetStateAction<GraphNodePositionsType>
  >;

  // algorithm
  algorithm: AlgorithmType | null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmType | null>>;

  // graph representation
  graphRep: GraphRepresentationType;
  setGraphRep: React.Dispatch<React.SetStateAction<GraphRepresentationType>>;

  // running
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;

  // dfs: starting vertex
  dfsStartingVertex: number;
  setDfsStartingVertex: React.Dispatch<React.SetStateAction<number>>;
  dfsInit: () => void;
  dfsSteps: DfsStep[] | null;
  setDfsSteps: React.Dispatch<React.SetStateAction<DfsStep[] | null>>;
  dfsStepIndex: number;
  setDfsStepIndex: React.Dispatch<React.SetStateAction<number>>;
  dfsNext: () => void;
  dfsPrev: () => void;
  dfsStart: () => void;
  dfsEnd: () => void;
  // bfs: starting vertex
  bfsStartingVertex: number;
  setBfsStartingVertex: React.Dispatch<React.SetStateAction<number>>;
  // dijkstra's: starting vertex
  dijkstraStartingVertex: number;
  setDijkstraStartingVertex: React.Dispatch<React.SetStateAction<number>>;
  // prims's: starting vertex
  primStartingVertex: number;
  setPrimStartingVertex: React.Dispatch<React.SetStateAction<number>>;
};

// facade pattern
type GraphOperations = {
  // add a vertex
  addVertex: (x: number, y: number) => void;
  // add/remove a vertex
  removeVertex: (v: number) => void;
  // add/remove an edge between two vertices
  addEdge: (u: number, v: number) => void;
  removeEdge: (u: number, v: number) => void;
  // modify the x and y position of a vertex
  setVertexPosition: (v: number, x: number, y: number) => void;
  // modify the y position of all vertices
  moveUp: () => void;
  moveDown: () => void;
  // modify the x position of all vertices
  moveLeft: () => void;
  moveRight: () => void;
  // set graph state
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
};

const GraphContext = createContext<GraphContextType | null>(null);

export default function GraphContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [showAdjMatrix, setShowAdjMatrix] = useState<boolean>(false);
  const [showGraphPreset, setShowGraphPreset] = useState<boolean>(false);

  const [graph, setGraph] = useLocalStorage<Graph>(
    "graph",
    graphNew({ directed: false, weighted: false }),
  );
  const canvasRef = useRef<HTMLDivElement>(null);

  const [graphNodePositions, setGraphNodePositions] =
    useState<GraphNodePositionsType>(Array(graph.nV).fill(null));

  const [algorithm, setAlgorithm] = useLocalStorage<AlgorithmType | null>(
    "graph-algorithm-type",
    null,
  );

  const [graphRep, setGraphRep] = useLocalStorage<GraphRepresentationType>(
    "graph-representation",
    "Adjacency Matrix",
  );

  const [running, setRunning] = useLocalStorage<boolean>(
    "graph-running",
    false,
  );

  const [dfsStartingVertex, setDfsStartingVertex] = useLocalStorage<number>(
    "dfs-start-vertex",
    NaN,
  );
  const [bfsStartingVertex, setBfsStartingVertex] = useLocalStorage<number>(
    "bfs-start-vertex",
    NaN,
  );
  const [dijkstraStartingVertex, setDijkstraStartingVertex] =
    useLocalStorage<number>("dijkstra-start-vertex", NaN);
  const [primStartingVertex, setPrimStartingVertex] = useLocalStorage<number>(
    "prim-start-vertex",
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
  const dfsInit = useCallback(() => {
    setDfsSteps(dfsGenerateSteps(graph, dfsStartingVertex));
    setDfsStepIndex(0);
  }, [dfsStartingVertex, graph, setDfsStepIndex, setDfsSteps]);
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

  const graphOperations: GraphOperations = {
    addVertex: (x: number, y: number) =>
      setGraph((g) => graphAddVertex(g, x, y)),
    removeVertex: (v: number) => setGraph((g) => graphRemoveVertex(g, v)),
    addEdge: (u: number, v: number) =>
      setGraph((g) => graphSetEdge(g, u, v, true)),
    removeEdge: (u: number, v: number) =>
      setGraph((g) => graphSetEdge(g, u, v, false)),
    setVertexPosition: (v: number, x: number, y: number) =>
      setGraph((g) => graphSetVertexPosition(g, v, x, y)),
    moveUp: () =>
      setGraph((g) =>
        graphMoveVertical(
          g,
          -5,
          0,
          canvasRef.current?.offsetHeight ?? Infinity,
        ),
      ),
    moveDown: () =>
      setGraph((g) =>
        graphMoveVertical(g, 5, 0, canvasRef.current?.offsetHeight ?? Infinity),
      ),
    moveLeft: () =>
      setGraph((g) =>
        graphMoveHorizontal(
          g,
          -5,
          0,
          canvasRef.current?.offsetWidth ?? Infinity,
        ),
      ),
    moveRight: () =>
      setGraph((g) =>
        graphMoveHorizontal(
          g,
          5,
          0,
          canvasRef.current?.offsetWidth ?? Infinity,
        ),
      ),
    setGraph,
  };

  return (
    <GraphContext.Provider
      value={{
        graph,
        graphOperations,
        canvasRef,
        // adj matrix show/hide
        adjMatrix: {
          show: showAdjMatrix,
          setShow: setShowAdjMatrix,
        },
        // graph preset show/hide
        graphPreset: {
          show: showGraphPreset,
          setShow: setShowGraphPreset,
        },
        // node positions
        graphNodePositions,
        setGraphNodePositions,
        // algorithm
        algorithm,
        setAlgorithm,
        // graph representation
        graphRep,
        setGraphRep,
        // running
        running,
        setRunning,
        // dfs
        dfsStartingVertex,
        setDfsStartingVertex,
        dfsInit,
        dfsSteps,
        setDfsSteps,
        dfsStepIndex,
        dfsNext,
        dfsPrev,
        dfsStart,
        dfsEnd,
        setDfsStepIndex,
        // bfs: starting vertex
        bfsStartingVertex,
        setBfsStartingVertex,
        // dijkstra's: starting vertex
        dijkstraStartingVertex,
        setDijkstraStartingVertex,
        // prim's: starting vertex
        primStartingVertex,
        setPrimStartingVertex,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

export const useGraphContext = () => {
  const context = useContext(GraphContext);

  if (context === null) {
    throw new Error("useGraphContext must be used within a DfsContextProvider");
  }

  return context;
};
