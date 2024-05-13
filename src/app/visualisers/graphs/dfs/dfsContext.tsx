"use client";

import { createContext, useContext, useRef, useState } from "react";

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

type GraphNodePositionsType = ({
  x: MotionValue<number>;
  y: MotionValue<number>;
} | null)[];

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

type DfsContextType = {
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

const DfsContext = createContext<DfsContextType | null>(null);

export default function DfsContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [showAdjMatrix, setShowAdjMatrix] = useState<boolean>(false);

  const [showGraphPreset, setShowGraphPreset] = useState<boolean>(false);

  const [graph, setGraph] = useLocalStorage<Graph>(
    "dfs-graph",
    graphNew({ directed: false, weighted: false }),
  );
  const canvasRef = useRef<HTMLDivElement>(null);

  const [graphNodePositions, setGraphNodePositions] =
    useState<GraphNodePositionsType>(Array(graph.nV).fill(null));

  const [algorithm, setAlgorithm] = useState<AlgorithmType | null>(null);

  const [graphRep, setGraphRep] =
    useState<GraphRepresentationType>("Adjacency Matrix");

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
    <DfsContext.Provider
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
      }}
    >
      {children}
    </DfsContext.Provider>
  );
}

export const useDfsContext = () => {
  const context = useContext(DfsContext);

  if (context === null) {
    throw new Error("useDfsContext must be used within a DfsContextProvider");
  }

  return context;
};
