"use client";

import { useDfsContext } from "./dfsContext";

import { motion } from "framer-motion";

export default function GraphEdge({
  u,
  v,
  weight,
}: {
  u: number;
  v: number;
  weight: number;
}) {
  const { graph } = useDfsContext();

  return (
    <motion.div
      key={`${u}-${v}`}
      style={{
        x: graph.positions[u]?.x ?? 0,
        y: graph.positions[u]?.y ?? 0,
        rotate:
          Math.atan2(
            (graph.positions[v]?.y ?? 0) - (graph.positions[u]?.y ?? 0),
            (graph.positions[v]?.x ?? 0) - (graph.positions[u]?.x ?? 0),
          ) *
          (180 / Math.PI),
        width: Math.sqrt(
          Math.pow(
            (graph.positions[u]?.x ?? 0) - (graph.positions[v]?.x ?? 0),
            2,
          ) +
            Math.pow(
              (graph.positions[u]?.y ?? 0) - (graph.positions[v]?.y ?? 0),
              2,
            ),
        ),
        transformOrigin: "0 0",
      }}
      className="absolute left-0 top-0 -z-20 flex h-[1px] items-center justify-center bg-slate-400 text-blue-600"
    >
      {graph.weighted && (
        <>
          <div className="absolute left-[50%] top-[50%] -z-10 h-[150%] w-5 translate-x-[-50%] translate-y-[-50%] bg-[#eee]"></div>
          <motion.span
            style={{
              rotate:
                -Math.atan2(
                  (graph.positions[v]?.y ?? 0) - (graph.positions[u]?.y ?? 0),
                  (graph.positions[v]?.x ?? 0) - (graph.positions[u]?.x ?? 0),
                ) *
                (180 / Math.PI),
            }}
          >
            {weight}
          </motion.span>
        </>
      )}
    </motion.div>
  );
}
