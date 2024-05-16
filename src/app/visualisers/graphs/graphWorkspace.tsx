"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "~/app/utils";

import useAlgorithm from "./algorithms/useAlgorithm";
import { MAX_VERTICES, useGraphContext } from "./graphContext";
import GraphEdge from "./graphEdge";
import GraphNode from "./graphNode";
import Toolbar from "./toolbar";
import { tryOrDefaultFunction } from "./utils";

import { AnimatePresence, motion } from "framer-motion";

export default function GraphWorkspace() {
  const {
    graph,
    graphOperations,
    canvasRef,
    graphNodePositions,
    running,
    enableKeyboardArrows,
  } = useGraphContext();
  const alg = useAlgorithm();

  // whether a node is being dragged. prevents click-to-create-new-node from firing when dragging
  const [dragging, setDragging] = useState<number | null>(null);
  // currently selected node
  const [selected, setSelected] = useState<number | null>(null);

  // handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !running &&
        (e.key === "Backspace" || e.key === "Delete") &&
        selected !== null
      ) {
        graphOperations.removeVertex(selected);
        setSelected(null);
      } else if (enableKeyboardArrows) {
        if (e.key === "ArrowUp") {
          graphOperations.moveUp();
        } else if (e.key === "ArrowDown") {
          graphOperations.moveDown();
        } else if (e.key === "ArrowLeft") {
          graphOperations.moveLeft();
        } else if (e.key === "ArrowRight") {
          graphOperations.moveRight();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardArrows, graphOperations, running, selected]);

  // calculate total weight of edges
  const totalWeight = useMemo(
    () =>
      graph.edges.reduce(
        (acc, row) => acc + row.reduce((acc, edge) => acc + edge, 0),
        0,
      ) / (graph.directed ? 1 : 2),
    [graph.directed, graph.edges],
  );
  // calculate number of edges
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
        <GraphInfoBar>
          <GraphInfoChip delay={0}>nV: {graph.nV}</GraphInfoChip>
          <GraphInfoChip delay={0.2}>nE: {nE}</GraphInfoChip>
          {graph.weighted && (
            <GraphInfoChip delay={0.4}>
              total edge weight: {totalWeight}
            </GraphInfoChip>
          )}
        </GraphInfoBar>
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
                  alg.algorithm && alg.steps
                    ? tryOrDefaultFunction(
                        () =>
                          alg.verticesHighlight(
                            graph,
                            // @ts-expect-error -- rip react
                            alg.steps[alg.stepIndex],
                            v,
                          ),
                        0,
                      )
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
                        alg.algorithm && alg.steps
                          ? tryOrDefaultFunction(
                              () =>
                                alg.edgeHighlight(
                                  graph,
                                  // @ts-expect-error -- rip react
                                  alg.steps[alg.stepIndex]!,
                                  u,
                                  v,
                                ),
                              0,
                            )
                          : 0
                      }
                      curved={
                        false // TODO: graph.directed && graph.edges[v]![u] !== 0
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

// wrapper div to hold graph info chips
function GraphInfoBar({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-row gap-3">{children}</div>;
}

// individual graph info chip
function GraphInfoChip({
  delay = 0,
  children,
}: {
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ delay, type: "spring", ease: "easeInOut", damping: 15 }}
      className="rounded-full bg-slate-500 p-2 px-4"
    >
      {children}
    </motion.p>
  );
}
