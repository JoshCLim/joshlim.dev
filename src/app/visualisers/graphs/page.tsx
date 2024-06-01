"use client";

import Link from "next/link";

import { useState } from "react";

import { cn } from "~/app/utils";

import AlgorithmChooser from "./algorithms/algorithmChoose";
import AlgorithmRun from "./algorithms/algorithmRun";
import AlgorithmStart from "./algorithms/algorithmStart";
import useAlgorithm from "./algorithms/useAlgorithm";
import { MAX_VERTICES, useGraphContext } from "./graph/graphContext";
import GraphEditor from "./graph/graphEditor";
import GraphSettings from "./graph/graphSettings";
import GraphWorkspace from "./graph/graphWorkspace";
import PresetGraphChooser from "./graph/presetGraphs";
import PageNavbar from "./navbar";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Page() {
  const { running, graph } = useGraphContext();
  const alg = useAlgorithm();

  return (
    <>
      <LazyResponsiveCover />
      <PageNavbar />
      <PresetGraphChooser />
      <PanelGroup direction="horizontal" className="w-screen flex-grow">
        <Panel
          defaultSize={30}
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
                className="text-balance text-2xl font-light"
              >
                {alg.title}
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
          defaultSize={70}
          minSize={60}
          className="flex min-h-screen flex-col"
        >
          <LayoutGroup>
            {!running && (
              <motion.div
                layout
                className="flex items-center justify-center border-b border-black bg-slate-100 p-5 text-center text-black"
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
                className="flex flex-1 flex-col justify-center gap-10 pe-10"
              >
                <GraphSettings />
                <AlgorithmStart />
                {running && <AlgorithmRun />}
              </motion.div>
            </motion.div>
            <motion.div
              layout="position"
              className={cn(
                "flex flex-row items-center justify-center bg-slate-100 p-5 px-7 text-center text-black",
                running && "flex-1",
              )}
            >
              {(!running || !alg.algorithm) && (
                <p className="font-light">
                  Select an algorithm and press{" "}
                  <span className="rounded-2xl bg-green-400 px-4 py-2 text-white">
                    Run
                  </span>{" "}
                  to get started.
                </p>
              )}
              {running && alg.algorithm && alg.stateComponent}
            </motion.div>
          </LayoutGroup>
        </Panel>
      </PanelGroup>
    </>
  );
}

function LazyResponsiveCover() {
  const [forceShow, setForceShow] = useState(false);

  if (forceShow) return <></>;

  return (
    <div
      className={cn(
        "fixed top-0 z-infinity flex h-screen w-screen flex-col items-center justify-center gap-3 bg-white text-black xl:hidden",
      )}
    >
      <p className="w-[50%] min-w-72 text-balance text-center">
        Unfortunately, right now, this visualiser requires your screen/window to
        be at least 1280px wide (otherwise it looks odd). I promise I&apos;m
        working on it...
      </p>
      <Link href="/visualisers" className="underline">
        go back
      </Link>
      <button className="underline" onClick={() => setForceShow(true)}>
        bruh I don&apos;t care, show me anyway
      </button>
    </div>
  );
}
