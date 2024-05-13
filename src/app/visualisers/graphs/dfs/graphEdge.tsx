"use client";

import { useDfsContext } from "./dfsContext";

import { type MotionValue, motion, useTransform } from "framer-motion";

export default function GraphEdge({
  u,
  v,
  weight,
  uPos,
  vPos,
}: {
  u: number;
  v: number;
  weight: number;
  uPos: { x: MotionValue<number>; y: MotionValue<number> };
  vPos: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const { graph } = useDfsContext();

  const { x: uX, y: uY } = uPos;
  const { x: vX, y: vY } = vPos;

  const angle = useTransform(
    () =>
      Math.atan2(vY.get() - uY.get(), vX.get() - uX.get()) * (180 / Math.PI),
  );
  const length = useTransform(() =>
    Math.sqrt(
      Math.pow(vX.get() - uX.get(), 2) + Math.pow(vY.get() - uY.get(), 2),
    ),
  );

  return (
    <motion.div
      key={`${u}-${v}`}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        transition: { delay: 0.3, damping: 30, duration: 0.7 },
      }}
      style={{
        x: uX,
        y: uY,
        rotate: angle,
        width: length,
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
