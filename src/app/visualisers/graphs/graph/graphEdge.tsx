"use client";

import { cn } from "~/app/utils";

import { useGraphContext } from "./graphContext";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useTransform,
} from "framer-motion";

const edgesHighlights = [0, 1, 2, 3] as const;
export type EdgesHighlight = (typeof edgesHighlights)[number];

export default function GraphEdge({
  u,
  v,
  weight,
  uPos,
  vPos,
  highlight,
  curved = false,
}: {
  u: number;
  v: number;
  weight: number;
  uPos: { x: MotionValue<number>; y: MotionValue<number> };
  vPos: { x: MotionValue<number>; y: MotionValue<number> };
  highlight?: EdgesHighlight;
  curved?: boolean;
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
        transformOrigin: "center left",
      }}
      className={cn(
        "absolute left-0 top-0 -z-20 flex h-[2px] items-center justify-center bg-slate-400 text-blue-600",
        highlight === 1 && "bg-amber-500",
        highlight === 2 && "bg-green-500",
        highlight === 3 && "bg-slate-200",
        curved &&
          "h-[10px] rounded-[10px/50%] border-b-2 border-slate-400 bg-transparent",
      )}
    >
      <AnimatePresence>
        {graph.weighted && (
          <>
            <motion.div
              key={`${u}-${v}-weight-bg`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[50%] top-[50%] -z-10 h-[150%] w-5 translate-x-[-50%] translate-y-[-50%] bg-slate-50"
            ></motion.div>
            <motion.span
              key={`${u}-${v}-weight`}
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
      </AnimatePresence>
      <AnimatePresence>
        {graph.directed && (
          <>
            <motion.div
              key={`${u}-${v}-arrowhead-1`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute left-[75%] top-[100%] h-[2px] w-4 rotate-[150deg] bg-slate-400",
                highlight === 1 && "bg-amber-500",
                highlight === 2 && "bg-green-500",
                highlight === 3 && "bg-slate-200",
              )}
              style={{ transformOrigin: "top left" }}
            ></motion.div>
            <motion.div
              key={`${u}-${v}-arrowhead-2`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute left-[75%] top-[100%] h-[2px] w-4 rotate-[-150deg] bg-slate-400",
                highlight === 1 && "bg-amber-500",
                highlight === 2 && "bg-green-500",
                highlight === 3 && "bg-slate-200",
              )}
              style={{ transformOrigin: "top left" }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
