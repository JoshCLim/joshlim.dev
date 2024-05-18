"use client";

import { cn } from "~/app/utils";

import useAlgorithm from "./algorithms/useAlgorithm";
import { useGraphContext } from "./graphContext";
import { type EdgesHighlight } from "./graphEdge";
import { type VerticesHighlight } from "./graphNode";
import { tryOrDefaultFunction } from "./utils";

import { AnimatePresence, motion } from "framer-motion";

export default function AdjacencyMatrix() {
  const { graph, running } = useGraphContext();
  const alg = useAlgorithm();

  return (
    <>
      <AnimatePresence>
        {graph.nV > 1 && (
          <motion.div
            key="adj-matrix"
            className="relative aspect-square text-slate-800"
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ transformOrigin: "top center" }}
          >
            <div className="overflow-hidden rounded-2xl border border-black bg-gray-50 ">
              <Row>
                <HeaderCell className="border-b border-r border-black text-center text-xs">
                  Adj Matrix
                </HeaderCell>
                {graph.positions.map((_, v) => (
                  <HeaderCell
                    highlight={
                      alg.algorithm
                        ? tryOrDefaultFunction(
                            () =>
                              alg.verticesHighlight(
                                graph,
                                // @ts-expect-error -- rip react
                                alg.steps[alg.stepIndex]!,
                                v,
                              ),
                            0,
                          )
                        : 0
                    }
                    className="border-b border-slate-900 font-bold"
                    key={v}
                  >
                    {v}
                  </HeaderCell>
                ))}
              </Row>
              {graph.edges.map((row, u) => (
                <Row key={u}>
                  <HeaderCell
                    highlight={
                      alg.algorithm
                        ? tryOrDefaultFunction(
                            () =>
                              alg.verticesHighlight(
                                graph,
                                // @ts-expect-error -- rip react
                                alg.steps[alg.stepIndex]!,
                                u,
                              ),
                            0,
                          )
                        : 0
                    }
                    className="border-r border-slate-900 font-bold"
                  >
                    {u}
                  </HeaderCell>
                  {row.map((weight, v) =>
                    !graph.weighted ? (
                      <UnweightedCell
                        u={u}
                        v={v}
                        key={v}
                        weight={weight}
                        disabled={u === v}
                        highlight={
                          running && alg.algorithm
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
                      />
                    ) : (
                      <WeightedCell
                        u={u}
                        v={v}
                        key={v}
                        weight={weight}
                        disabled={u === v}
                        highlight={
                          running && alg.algorithm
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
                      />
                    ),
                  )}
                </Row>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!running && (
        <>
          {!graph.weighted ? (
            <motion.p
              layout
              key="unweighted-instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-16 text-balance text-slate-500"
            >
              Click on a matrix cell to toggle the edge.
            </motion.p>
          ) : (
            <motion.p
              layout
              key="weighted-instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-16 text-balance text-slate-500"
            >
              Click on a cell and type or use the up/down arrows to adjust the
              weight.
            </motion.p>
          )}
        </>
      )}
    </>
  );
}

function Row({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-row">{children}</div>;
}

function HeaderCell({
  children,
  className,
  highlight = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  highlight?: VerticesHighlight;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square h-10 items-center justify-center 2xl:h-12",
        highlight === 1 && "bg-green-200",
        highlight === 2 && "bg-red-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

function UnweightedCell({
  weight,
  className,
  u,
  v,
  disabled = false,
  highlight = 0,
}: {
  disabled?: boolean;
  weight: number;
  className?: string;
  u: number;
  v: number;
  highlight?: EdgesHighlight;
}) {
  const { graphOperations, running, graph } = useGraphContext();

  return (
    <input
      type="number"
      disabled={disabled || running || (!graph.directed && u > v)}
      className={cn(
        "flex aspect-square h-10 cursor-pointer items-center justify-center text-center outline-none transition-colors hover:bg-gray-100 2xl:h-12",
        disabled &&
          "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200",
        !graph.directed &&
          u > v &&
          "cursor-not-allowed bg-gray-50 text-gray-500 hover:bg-gray-50",
        running && "cursor-not-allowed",
        highlight === 1 && "bg-yellow-200",
        className,
      )}
      value={weight}
      readOnly={true}
      onClick={() => {
        if (disabled || running) return;
        if (weight === 0) graphOperations.addEdge(u, v, 1);
        else graphOperations.removeEdge(u, v);
      }}
    />
  );
}

function WeightedCell({
  weight,
  className,
  u,
  v,
  disabled = false,
  highlight = 0,
}: {
  disabled?: boolean;
  weight: number;
  className?: string;
  u: number;
  v: number;
  highlight?: EdgesHighlight;
}) {
  const { graphOperations, running, setEnableKeyboardArrows, graph } =
    useGraphContext();

  return (
    <input
      type="number"
      disabled={disabled || running || (!graph.directed && u > v)}
      className={cn(
        "flex aspect-square h-10 cursor-text items-center justify-center text-center outline-none transition-colors hover:bg-gray-100 2xl:h-12",
        disabled &&
          "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200",
        !graph.directed &&
          u > v &&
          "cursor-not-allowed bg-gray-50 text-gray-500 hover:bg-gray-50",
        running && "cursor-not-allowed",
        highlight === 1 && "bg-yellow-200",
        className,
      )}
      value={weight}
      onChange={(e) => {
        if (disabled || running) return;
        const newWeight = parseInt(e.target.value);
        if (isNaN(newWeight) || newWeight < 0) return;
        graphOperations.addEdge(u, v, newWeight);
      }}
      onFocus={() => setEnableKeyboardArrows(false)}
      onBlur={() => setEnableKeyboardArrows(true)}
    />
  );
}
