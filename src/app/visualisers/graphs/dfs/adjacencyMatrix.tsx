"use client";

import { cn } from "~/app/utils";

import { useDfsContext } from "./dfsContext";

import { AnimatePresence, motion } from "framer-motion";
import { EditPencil, FastArrowRight } from "iconoir-react";

export default function AdjacencyMatrix() {
  const { graph, adjMatrix } = useDfsContext();

  return (
    <AnimatePresence>
      {graph.nV > 1 && (
        <motion.div
          key="adj-matrix"
          className="fixed right-0 top-16 aspect-square text-slate-800"
          initial={{ x: "130%" }}
          animate={{ x: adjMatrix.show ? "40px" : "100%" }}
          exit={{ x: "130%" }}
          transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
        >
          <button
            className="z-infinity absolute left-0 top-12 translate-x-[-100%] rounded-l-2xl border-b border-l border-t border-black bg-gray-50 px-2 py-5 shadow-2xl transition-colors hover:bg-gray-200"
            onClick={() => adjMatrix.setShow((prev) => !prev)}
            title="Edit Graph Edges"
          >
            {adjMatrix.show ? (
              <FastArrowRight height={24} />
            ) : (
              <EditPencil height={24} />
            )}
          </button>
          <div className="overflow-hidden rounded-l-2xl border-b border-l border-t border-black bg-gray-50 pe-10 shadow-2xl">
            <Row>
              <HeaderCell className="border-b border-r border-black text-center text-xs">
                Adj Matrix
              </HeaderCell>
              {graph.positions.map((_, v) => (
                <HeaderCell
                  className="border-b border-slate-900 font-bold"
                  key={v}
                >
                  {v}
                </HeaderCell>
              ))}
            </Row>
            {graph.edges.map((row, u) => (
              <Row key={u}>
                <HeaderCell className="border-r border-slate-900 font-bold">
                  {u}
                </HeaderCell>
                {row.map((weight, v) => (
                  <UnweightedCell
                    u={u}
                    v={v}
                    key={v}
                    weight={weight}
                    disabled={u === v}
                  />
                ))}
              </Row>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-row">{children}</div>;
}

function HeaderCell({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square h-12 items-center justify-center",
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
}: {
  disabled?: boolean;
  weight: number;
  className?: string;
  u: number;
  v: number;
}) {
  const { graphOperations } = useDfsContext();

  return (
    <input
      type="number"
      disabled={disabled}
      className={cn(
        "flex aspect-square h-12 cursor-pointer items-center justify-center text-center outline-none transition-colors hover:bg-gray-100",
        disabled &&
          "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200",
        className,
      )}
      value={weight}
      readOnly={true}
      onClick={() => {
        if (weight === 0) graphOperations.addEdge(u, v);
        else graphOperations.removeEdge(u, v);
      }}
    />
  );
}
