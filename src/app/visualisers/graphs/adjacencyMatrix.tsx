"use client";

import { cn } from "~/app/utils";

import { useGraphContext } from "./graphContext";

import { AnimatePresence, motion } from "framer-motion";

export default function AdjacencyMatrix() {
  const { graph } = useGraphContext();

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
                  {row.map((weight, v) =>
                    !graph.weighted ? (
                      <UnweightedCell
                        u={u}
                        v={v}
                        key={v}
                        weight={weight}
                        disabled={u === v}
                      />
                    ) : (
                      <WeightedCell
                        u={u}
                        v={v}
                        key={v}
                        weight={weight}
                        disabled={u === v}
                      />
                    ),
                  )}
                </Row>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const { graphOperations, running, graph } = useGraphContext();

  return (
    <input
      type="number"
      disabled={disabled || running || (!graph.directed && u > v)}
      className={cn(
        "flex aspect-square h-12 cursor-pointer items-center justify-center text-center outline-none transition-colors hover:bg-gray-100",
        disabled &&
          "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200",
        !graph.directed &&
          u > v &&
          "cursor-not-allowed bg-gray-50 text-gray-500 hover:bg-gray-50",
        running && "cursor-not-allowed",
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
}: {
  disabled?: boolean;
  weight: number;
  className?: string;
  u: number;
  v: number;
}) {
  const { graphOperations, running, setEnableKeyboardArrows, graph } =
    useGraphContext();

  return (
    <input
      type="number"
      disabled={disabled || running || (!graph.directed && u > v)}
      className={cn(
        "flex aspect-square h-12 cursor-text items-center justify-center text-center outline-none transition-colors hover:bg-gray-100",
        disabled &&
          "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200",
        !graph.directed &&
          u > v &&
          "cursor-not-allowed bg-gray-50 text-gray-500 hover:bg-gray-50",
        running && "cursor-not-allowed",
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
