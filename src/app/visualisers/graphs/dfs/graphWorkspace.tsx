"use client";

import { useEffect, useMemo, useState } from "react";

import { useDfsContext } from "./dfsContext";
import GraphEdge from "./graphEdge";
import GraphNode from "./graphNode";
import Toolbar from "./toolbar";

import { AnimatePresence, type MotionValue, motion } from "framer-motion";

export default function GraphWorkspace() {
  const { graph, graphOperations, canvasRef, graphNodePositions } =
    useDfsContext();
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
              transition={{ delay: 0.6, type: "spring", ease: "easeInOut" }}
              className="rounded-full bg-slate-500 p-2 px-4"
            >
              total edge weight: {totalWeight}
            </motion.p>
          )}
        </div>
        <div
          className="relative z-0 flex-grow-[2] cursor-pointer"
          ref={canvasRef}
          onClick={(e) => {
            if (dragging !== null) return;
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
            {graph.positions.map((pos, v) => (
              <GraphNode
                //   key={`${v}-${pos.x}-${pos.y}`}
                key={v}
                setDragging={setDragging}
                selected={selected}
                setSelected={setSelected}
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
                      uPos={
                        graphNodePositions[u] as {
                          x: MotionValue<number>;
                          y: MotionValue<number>;
                        }
                      }
                      vPos={
                        graphNodePositions[v] as {
                          x: MotionValue<number>;
                          y: MotionValue<number>;
                        }
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
