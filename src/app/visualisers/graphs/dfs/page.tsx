"use client";

import { useMemo, useRef, useState } from "react";

import { cn } from "~/app/utils";

import {
  Graph,
  graphAddVertex,
  graphCopy,
  graphNew,
  graphRemoveVertex,
  graphSetEdge,
  graphSetVertexPosition,
} from "./graph";
import PageNavbar from "./navbar";

import { motion } from "framer-motion";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useLocalStorage } from "usehooks-ts";

type GraphOperations = {
  addVertex: (x: number, y: number) => void;
  removeVertex: (v: number) => void;
  addEdge: (u: number, v: number) => void;
  removeEdge: (u: number, v: number) => void;
  setVertexPosition: (v: number, x: number, y: number) => void;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
};

export default function Page() {
  const [graph, setGraph] = useLocalStorage<Graph>(
    "dfs-graph",
    // new Graph({ directed: false }),
    graphNew({ directed: false }),
  );
  // const [graph, setGraph] = useState<Graph>(new Graph({ directed: false }));

  // const graphOperations: GraphOperations = {
  //   addVertex: (x: number, y: number) =>
  //     setGraph((g) => g.copy().addVertex({ x, y })),
  //   removeVertex: (v: number) => setGraph((g) => g.copy().removeVertex(v)),
  //   addEdge: (u: number, v: number) =>
  //     setGraph((g) => g.copy().setEdge(u, v, true)),
  //   removeEdge: (u: number, v: number) =>
  //     setGraph((g) => g.copy().setEdge(u, v, false)),
  //   setVertexPosition: (v: number, x: number, y: number) =>
  //     setGraph((g) => g.copy().setVertexPosition(v, x, y)),
  //   setGraph,
  // };
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
    setGraph,
  };

  return (
    <>
      <PageNavbar />
      <PanelGroup direction="horizontal" className="w-screen flex-grow">
        <Panel
          defaultSize={70}
          minSize={40}
          className="flex min-h-screen flex-col bg-[#eee]"
        >
          <main className="flex flex-grow flex-col">
            <GraphWorkspace graph={graph} operations={graphOperations} />
          </main>
          <footer className="flex flex-row flex-wrap items-center justify-between gap-x-5 p-5 px-8 text-black">
            <h3 className="text-lg font-light">depth-first search</h3>
            <p className="text-sm italic text-slate-600">
              Click anywhere on the canvas to add a vertex.
            </p>
          </footer>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={70} minSize={20} className="min-h-screen">
          <PanelGroup direction="vertical">
            <Panel defaultSize={70} minSize={40}>
              <h3>depth-first search</h3>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={70} minSize={40}>
              <h3>depth-first search</h3>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </>
  );
}

function GraphWorkspace({
  graph,
  operations: { setGraph, addVertex, setVertexPosition },
}: {
  graph: Graph;
  operations: GraphOperations;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const nodes = useMemo(
    () =>
      graph.positions.map((pos, v) => (
        <motion.div
          drag
          dragConstraints={canvasRef}
          onDragStart={() => {
            setDragging(v);
            setSelected(v);
          }}
          onDragEnd={(_, info) => {
            setDragging(null);
            const rect = canvasRef.current?.getBoundingClientRect() ?? {
              x: 0,
              y: 0,
            };
            const posX = info.point.x - rect.x;
            const posY = info.point.y - rect.y;
            console.log(posX, posY);
            console.log(info);
            setVertexPosition(v, posX, posY);
          }}
          onTap={() => {
            setSelected(v);
          }}
          dragMomentum={false}
          // style={{ top: pos.y, left: pos.x, willChange: "top left" }}
          style={{
            top: 0,
            left: 0,
          }}
          initial={{ translateX: pos.x - 24, translateY: pos.y - 24 }}
          className={cn(
            "absolute flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-lg text-white shadow-lg outline outline-2 outline-offset-1 outline-transparent transition-all hover:outline-gray-950",
            selected === v && "outline-gray-950",
          )}
          key={v}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {v}
        </motion.div>
      )),
    [graph.positions, selected, setVertexPosition],
  );

  return (
    <>
      <div className="flex flex-row items-center justify-end gap-4 px-8 py-4 pe-4">
        <ToolbarButton className="bg-[#c9e0e6]">Rearrange</ToolbarButton>
        <ToolbarButton
          className="bg-[#f8b595]"
          // onClick={() => setGraph(new Graph({ directed: false }))}
          onClick={() => setGraph(graphNew({ directed: false }))}
        >
          Clear Graph
        </ToolbarButton>
      </div>
      <div className="flex flex-grow flex-col gap-3 p-5 pt-0">
        <div className="flex flex-row">
          <p className="rounded-full bg-slate-500 p-2 px-4">nV: {graph.nV}</p>
        </div>
        <div
          className="relative flex-grow cursor-pointer"
          ref={canvasRef}
          onClick={(e) => {
            if (dragging !== null) return;
            const rect = canvasRef.current?.getBoundingClientRect() ?? {
              x: 0,
              y: 0,
            };
            const posX = e.clientX - rect.x;
            const posY = e.clientY - rect.y;
            console.log(posX, posY);

            addVertex(posX, posY);
          }}
        >
          {nodes}
        </div>
      </div>
    </>
  );
}

function ToolbarButton({
  className,
  children,
  onClick,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "rounded-md bg-green-700 p-2 px-4 shadow-sm transition-all hover:scale-105 hover:brightness-95 active:scale-95",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
