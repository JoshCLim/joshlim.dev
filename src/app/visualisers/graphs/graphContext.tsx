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

type GraphNodePositionType = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

type GraphNodePositionsType = (GraphNodePositionType | null)[];

export const MAX_VERTICES = 8;

export const graphRepresentations = [
  "Adjacency Matrix",
  "Adjacency List",
] as const;
export type GraphRepresentationType = (typeof graphRepresentations)[number];

export type GraphPresetType = { name: string; graph: Graph };

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

  // user preset graphs
  graphPresets: GraphPresetType[];
  setGraphPresets: React.Dispatch<React.SetStateAction<GraphPresetType[]>>;

  // enable keyboard
  enableKeyboardArrows: boolean;
  setEnableKeyboardArrows: React.Dispatch<React.SetStateAction<boolean>>;

  // selected node
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;

  // graph representation
  graphRep: GraphRepresentationType;
  setGraphRep: React.Dispatch<React.SetStateAction<GraphRepresentationType>>;

  // running
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;

  runError: string | null;
  setRunError: React.Dispatch<React.SetStateAction<string | null>>;
};

// facade pattern
type GraphOperations = {
  // add a vertex
  addVertex: (x: number, y: number) => void;
  // add/remove a vertex
  removeVertex: (v: number) => void;
  // add/remove an edge between two vertices
  addEdge: (u: number, v: number, weight: number) => void;
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

  const [graphPresets, setGraphPresets] = useLocalStorage<GraphPresetType[]>(
    "graph-presets",
    [],
  );

  const [selected, setSelected] = useState<number | null>(null);

  const [enableKeyboardArrows, setEnableKeyboardArrows] =
    useState<boolean>(true);

  const [graphRep, setGraphRep] = useLocalStorage<GraphRepresentationType>(
    "graph-representation",
    "Adjacency Matrix",
  );

  const [running, setRunning] = useLocalStorage<boolean>(
    "graph-running",
    false,
  );

  const [runError, setRunError] = useState<string | null>(null);

  const graphOperations: GraphOperations = {
    addVertex: (x: number, y: number) =>
      setGraph((g) => graphAddVertex(g, x, y)),
    removeVertex: (v: number) => setGraph((g) => graphRemoveVertex(g, v)),
    addEdge: (u: number, v: number, weight: number) =>
      setGraph((g) => graphSetEdge(g, u, v, weight)),
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
        // user presets
        graphPresets,
        setGraphPresets,
        // enable keyboard
        enableKeyboardArrows,
        setEnableKeyboardArrows,
        // selected node
        selected,
        setSelected,
        // graph representation
        graphRep,
        setGraphRep,
        // running
        running,
        setRunning,
        // run error
        runError,
        setRunError,
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
