"use client";

import AlgorithmChooser from "./algorithmChoose";
import AlgorithmStart from "./algorithmStart";
import {
  type AlgorithmType,
  MAX_VERTICES,
  useGraphContext,
} from "./graphContext";
import GraphEditor from "./graphEditor";
import GraphSettings from "./graphSettings";
import GraphWorkspace from "./graphWorkspace";
import PageNavbar from "./navbar";
import PresetGraphChooser from "./presetGraphs";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

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
  const { algorithm, running, graph } = useGraphContext();

  return (
    <>
      <PageNavbar />
      <PresetGraphChooser />
      <PanelGroup direction="horizontal" className="w-screen flex-grow">
        <Panel
          defaultSize={40}
          minSize={20}
          className="flex min-h-screen flex-col border-r border-black bg-slate-50"
        >
          <main className="flex flex-grow flex-col">
            <GraphWorkspace />
          </main>
          <motion.footer
            layout
            className="flex flex-row flex-wrap items-center justify-between gap-x-5 p-5 px-8 text-black"
          >
            <AnimatePresence>
              <motion.h3
                key="algorithm-title"
                layout="position"
                className="text-lg font-light"
              >
                {algorithmToTitle(algorithm)}
              </motion.h3>
              {!running && graph.nV < MAX_VERTICES && (
                <motion.p
                  key="instructions"
                  layout="position"
                  className="text-sm text-slate-500"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ damping: 15 }}
                >
                  Click anywhere on the canvas to add a vertex.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.footer>
        </Panel>
        <PanelResizeHandle />
        <Panel
          defaultSize={60}
          minSize={60}
          className="flex min-h-screen flex-col"
        >
          <LayoutGroup>
            {!running && (
              <motion.div
                layout
                className="flex flex-col items-center justify-center gap-3 border-b border-black bg-slate-100 p-5 text-center text-black"
              >
                <AlgorithmChooser />
              </motion.div>
            )}
            <motion.div
              layout
              initial={{ height: "70%" }}
              className="flex flex-1 flex-row justify-around border-b border-black bg-slate-200"
            >
              <GraphEditor />
              <motion.div
                layout
                className="flex flex-1 flex-col items-center justify-around"
              >
                <GraphSettings />
                <AlgorithmStart />
              </motion.div>
            </motion.div>
            <motion.div
              layout
              className="flex flex-row items-center justify-center gap-5 bg-slate-100 p-5 text-center text-black"
            >
              <p className="font-light">
                Select an algorithm and press{" "}
                <span className="rounded-2xl bg-green-400 px-4 py-2 text-white">
                  Run
                </span>{" "}
                to get started.
              </p>
            </motion.div>
          </LayoutGroup>
        </Panel>
      </PanelGroup>
    </>
  );
}
