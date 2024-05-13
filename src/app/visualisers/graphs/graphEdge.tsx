"use client";

import { useGraphContext } from "./graphContext";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useTransform,
} from "framer-motion";

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
  const { graph } = useGraphContext();

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

  const negAngle = useTransform(() => -angle.get());

  return (
    <motion.div
      key={`${u}-${v}`}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        transition: { damping: 30, duration: 0.4 },
      }}
      exit={{ scale: 0, transition: { damping: 30, duration: 0.4 } }}
      style={{
        x: uX,
        y: uY,
        rotate: angle,
        width: length,
        transformOrigin: "0 0",
      }}
      className="absolute left-0 top-0 -z-20 flex h-[1px] items-center justify-center bg-slate-400 text-blue-600"
    >
      <AnimatePresence>
        {graph.weighted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[50%] top-[50%] -z-10 h-[150%] w-5 translate-x-[-50%] translate-y-[-50%] bg-slate-50"
            ></motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                rotate: negAngle,
              }}
            >
              {weight}
            </motion.span>
          </>
        )}
        {graph.directed && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[75%] top-[100%] h-[1px] w-4 rotate-[150deg] bg-slate-400"
              style={{ transformOrigin: "0 0" }}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[75%] top-[100%] h-[1px] w-4 rotate-[-150deg] bg-slate-400"
              style={{ transformOrigin: "0 0" }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}