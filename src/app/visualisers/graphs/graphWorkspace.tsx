"use client";

import { useEffect, useMemo, useState } from "react";

import { cn, pairMatch } from "~/app/utils";

import { MAX_VERTICES, useGraphContext } from "./graphContext";
import GraphEdge from "./graphEdge";
import GraphNode from "./graphNode";
import Toolbar from "./toolbar";

import { AnimatePresence, motion } from "framer-motion";

export default function GraphWorkspace() {
  const {
    graph,
    graphOperations,
    canvasRef,
    graphNodePositions,
    dfsSteps,
    dfsStepIndex,
    algorithm,
  } = useGraphContext();
  const [dragging, setDragging] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if ((e.key === "Backspace" || e.key === "Delete") && selected !== null) {
        graphOperations.removeVertex(selected);
        setSelected(null);
      } else if (e.key === "ArrowUp") {
        graphOperations.moveUp();
      } else if (e.key === "ArrowDown") {
        graphOperations.moveDown();
      } else if (e.key === "ArrowLeft") {
        graphOperations.moveLeft();
      } else if (e.key === "ArrowRight") {
        graphOperations.moveRight();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [graphOperations, selected]);

  const totalWeight = useMemo(
    () =>
      graph.edges.reduce(
        (acc, row) => acc + row.reduce((acc, edge) => acc + edge, 0),
        0,
      ) / (graph.directed ? 1 : 2),
    [graph.directed, graph.edges],
  );
  const nE = useMemo(
    () =>
      graph.edges.reduce(
        (acc, row) =>
          acc + row.reduce((acc, edge) => acc + (edge !== 0 ? 1 : 0), 0),
        0,
      ) / (graph.directed ? 1 : 2),
    [graph.directed, graph.edges],
  );

  return (
    <>
      <Toolbar />
      <div className="flex flex-grow flex-col gap-3 p-5 py-0">
        <div className="flex flex-row gap-3">
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0, type: "spring", ease: "easeInOut" }}
            className="rounded-full bg-slate-500 p-2 px-4"
          >
            nV: {graph.nV}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", ease: "easeInOut" }}
            className="rounded-full bg-slate-500 p-2 px-4"
          >
            nE: {nE}
          </motion.p>
          {graph.weighted && (
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", ease: "easeInOut" }}
              className="rounded-full bg-slate-500 p-2 px-4"
            >
              total edge weight: {totalWeight}
            </motion.p>
          )}
        </div>
        {/* canvas */}
        <div
          className={cn(
            "relative z-0 flex-grow-[2] cursor-pointer",
            graph.nV >= MAX_VERTICES && "cursor-not-allowed",
          )}
          ref={canvasRef}
          onClick={(e) => {
            if (dragging !== null) return;

            if (graph.nV >= MAX_VERTICES) return;

            const rect = canvasRef.current?.getBoundingClientRect() ?? {
              x: 0,
              y: 0,
            };
            const posX = e.clientX - rect.x;
            const posY = e.clientY - rect.y;

            graphOperations.addVertex(posX, posY);
            setSelected(graph.nV);
          }}
        >
          <AnimatePresence>
            {graph.positions.map((_, v) => (
              <GraphNode
                key={v}
                setDragging={setDragging}
                selected={selected}
                setSelected={setSelected}
                highlight={
                  algorithm === "DFS" && dfsSteps
                    ? dfsSteps[dfsStepIndex]!.vertexV === v
                      ? 1
                      : dfsSteps[dfsStepIndex]!.visited[v]
                        ? 2
                        : 0
                    : 0
                }
                v={v}
              />
            ))}
            {/* <p className="text-red-400">{JSON.stringify(graph)}</p> */}
            {graph.edges.map((row, u) =>
              row.map(
                (edge, v) =>
                  (graph.directed || (!graph.directed && u < v)) &&
                  edge !== 0 &&
                  graphNodePositions[u] &&
                  graphNodePositions[v] && (
                    <GraphEdge
                      key={`${u}-${v}`}
                      u={u}
                      v={v}
                      weight={edge}
                      uPos={graphNodePositions[u]!}
                      vPos={graphNodePositions[v]!}
                      highlight={
                        algorithm === "DFS" && dfsSteps
                          ? pairMatch(
                              dfsSteps[dfsStepIndex]!.vertexV,
                              dfsSteps[dfsStepIndex]!.vertexU,
                              v,
                              u,
                            )
                            ? 1
                            : 0
                          : 0
                      }
                    />
                  ),
              ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
