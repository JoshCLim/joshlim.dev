"use client";

import dynamic from "next/dynamic";

import DfsContextProvider from "./dfsContext";
import { type Graph } from "./graph";
import PageNavbar from "./navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const GraphWorkspace = dynamic(() => import("./graphWorkspace"), {
  ssr: false,
});

export type GraphOperations = {
  addVertex: (x: number, y: number) => void;
  removeVertex: (v: number) => void;
  addEdge: (u: number, v: number) => void;
  removeEdge: (u: number, v: number) => void;
  setVertexPosition: (v: number, x: number, y: number) => void;
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
};

export default function Page() {
  return (
    <DfsContextProvider>
      <PageNavbar />
      <PanelGroup direction="horizontal" className="w-screen flex-grow">
        <Panel
          defaultSize={70}
          minSize={40}
          className="flex min-h-screen flex-col bg-[#eee]"
        >
          <main className="flex flex-grow flex-col">
            <GraphWorkspace />
          </main>
          <footer className="flex flex-row flex-wrap items-center justify-between gap-x-5 p-5 px-8 text-black">
            <h3 className="text-lg font-light">depth-first search</h3>
            <p className="text-sm text-slate-500">
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
    </DfsContextProvider>
  );
}
