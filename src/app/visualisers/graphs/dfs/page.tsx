"use client";

import dynamic from "next/dynamic";

import AlgorithmChooser from "./algorithmChoose";
import { type AlgorithmType, useDfsContext } from "./dfsContext";
import PageNavbar from "./navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// disable ssr for graph workspace since it gets the graph from localStorage
const GraphWorkspace = dynamic(() => import("./graphWorkspace"), {
  ssr: false,
});
const AdjacencyMatrix = dynamic(() => import("./adjacencyMatrix"), {
  ssr: false,
});
const PresetGraphChooser = dynamic(() => import("./presetGraphs"), {
  ssr: false,
});

const algorithmToTitle = (algorithm: AlgorithmType | null) => {
  if (!algorithm) return "select an algorithm...";

  switch (algorithm) {
    case "DFS":
      return "depth-first search";
    case "BFS":
      return "breadth-first search";
    case "Dijkstra's":
      return "Dijkstra's algorithm (shortest path)";
    case "Kruskal's":
      return "Kruskal's algorithm (minimum spanning tree)";
    case "Prim's":
      return "Prim's algorithm (minimum spanning tree)";
  }
};

export default function Page() {
  const { algorithm } = useDfsContext();

  return (
    <>
      <PageNavbar />
      <PresetGraphChooser />
      <PanelGroup direction="horizontal" className="w-screen flex-grow">
        <Panel
          defaultSize={70}
          minSize={40}
          className="flex min-h-screen flex-col bg-slate-50"
        >
          <main className="flex flex-grow flex-col">
            <GraphWorkspace />
          </main>
          <footer className="flex flex-row flex-wrap items-center justify-between gap-x-5 p-5 px-8 text-black">
            <h3 className="text-lg font-light">
              {algorithmToTitle(algorithm)}
            </h3>
            <p className="text-sm text-slate-500">
              Click anywhere on the canvas to add a vertex.
            </p>
          </footer>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={70} minSize={20} className="min-h-screen">
          <PanelGroup direction="vertical">
            <Panel
              defaultSize={10}
              minSize={10}
              className="flex flex-col items-center justify-center gap-3 bg-slate-100 p-5 text-center text-black"
            >
              <AlgorithmChooser />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={70} minSize={40} className="bg-slate-200">
              <h3>depth-first search</h3>
              <AdjacencyMatrix />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </>
  );
}
